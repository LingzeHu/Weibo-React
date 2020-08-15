import React, {useEffect, useCallback, useState} from "react";
import moment from "moment";
import { List, Avatar, Card, Button, Input, Row, Col } from "antd";
import { useDispatch, useMappedState } from "redux-react-hook";
import { getComments, createComment } from "actions/comments";
import styles from "./index.module.scss";
import { COMMENT_PAGESIZE } from 'constants/index';


const mapStateComments = (state) => state.comments;

const CommentList = ({ id }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const { comments = [], page = 0, total } = useMappedState(mapStateComments);
  const handleInfiniteOnLoad = useCallback( () => {
    dispatch(getComments({ id, page: page +1, count: COMMENT_PAGESIZE }));
  }, [dispatch, id, page]);

  useEffect(() => {
    handleInfiniteOnLoad();
  }, [])

  const loadMore = page * COMMENT_PAGESIZE < total && (
        <div className={styles.loadMore}  >
          <Button onClick={handleInfiniteOnLoad}>loading more</Button>
        </div>
      ) ;

  const handleSendComment = () => {
    let param = new URLSearchParams();
      param.append('id', id);
      param.append('comment', value);
      dispatch(createComment( param, false ));
      setValue('');
  }

  return (
    <Card className ={styles.commentsList}>
      <Row>
        <Col span={20}>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </Col>
        <Col span={4}>
        <Button onClick={handleSendComment} type="primary">Comment</Button>
        </Col>
      </Row>
        <List
          loadMore={loadMore}
          dataSource={comments}
          renderItem={({ user = {}, id, text, created_at }) => (
            <List.Item 
            key={id}
            actions={[]}
            >
              <List.Item.Meta
                avatar={<Avatar src={user.avatar_hd} />}
                title={
                  <div>
                    <span>{user.name}</span>
                    <span className={styles.extra}>
                      {moment(created_at).fromNow()}
                    </span>
                  </div>
                }
                description={text}
              />
            </List.Item>
          )}
        ></List>
    </Card>
  );
};

export default CommentList;
