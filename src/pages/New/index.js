import React, { useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { Row, Affix, Input } from 'antd';
import styles from './index.module.scss';
import { createComment } from "../../actions/comments";
import { useDispatch} from 'redux-react-hook';

const { TextArea } = Input;

const New = ( { match } ) => {
  const dispatch = useDispatch();
  const { params: {id} } = match;
  const [value, setValue] = useState('');
  const handleClick = (e) => {
    e.preventDefault();
    if(id) {
      let param = new URLSearchParams();
      param.append('id', id)
      param.append('comment', value)
      dispatch(createComment( param, true ));
    }
  }
  return (
    <div className={styles.container}>
      <Affix offsetTop={0}>
        <Row className={styles.appbar} justify="space-between" align="middle">

          <Link to="/">
            <LeftOutlined className={styles.icon} />
          </Link>
          <a href='#!' onClick={handleClick} className={styles.send} >
            {id? 'Comment' : 'Send'}
          </a>
        </Row>
      </Affix>
      <div className = {styles.content}>
          <TextArea 
          value = {value}
            className={styles.textare}
            placeholder={id? 'Write a comment...' : 'Share something new...'}
            onChange={(e) => setValue(e.target.value)}
          />
      </div>
    </div>
  );
};

export default New;
