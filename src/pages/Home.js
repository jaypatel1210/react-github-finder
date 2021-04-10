import React, { useState, useContext } from "react";
import Axios from "axios";

import {
  Row,
  Container,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

import UserCard from "../components/UserCard";
import Repos from "../components/Repos";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

export default function Home() {

    const context = useContext(UserContext);
    const [query, setQuery] = useState('');
    const [user, setUser] = useState(null);

    const fetchDetails = async () => {
        try {
            const { data } = await Axios.get(`https://api.github.com/users/${query}`);
            setUser(data);
        } catch (error) {
            toast('Not able to get data', { type: 'error' });
        }
    };

    if (!context.user?.uid) {
        return <Redirect to="signin" />
    }

    return (
        <Container>
          <Row className=" mt-3">
            <Col md="4" lg="4">
              <InputGroup>
                <Input
                    type="text"
                    value={query}
                    placeholder="Please provide the username"
                    onChange={ e => setQuery(e.target.value) }
                />
                <InputGroupAddon addonType="append">
                  <Button 
                    color="primary"
                    onClick={fetchDetails}
                  >
                        Fetch User
                    </Button>
                </InputGroupAddon>
              </InputGroup>
              {
                user ? <UserCard user={user} /> : null
              }
            </Col>
            <Col md="8" lg="8">
            {
              user ? <Repos repos_url={user.repos_url} /> : null
            }
            </Col>
          </Row>
        </Container>
    );
};
