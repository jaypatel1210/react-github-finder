import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default function Repos({ repos_url }) {
  const [repos, setRepos] = useState([]);

  const fetchRepos = async () => {
    const { data } = await Axios.get(repos_url);
    setRepos(data);
  };

  useEffect(() => {
    fetchRepos();
  }, [repos_url]);

  return (
    <ListGroup>
      {repos.map(res => (
        <ListGroupItem key={res.id}>
          <div className="text-primary">
            <a href={res.html_url} target="_blank" rel="noreferrer">
              {res.name}
            </a>
          </div>
          <div className="text-success">{res.language}</div>
          <div className="text-info">{res.description}</div>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
