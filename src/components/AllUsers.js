import React, {useState,useEffect,useCallback } from 'react';
import {useHistory} from 'react-router-dom';
 
const AllUsers = (props) => {
const [users, setUsers] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const history =useHistory();

const fetchUsersHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/v1.0/tweets/users/all');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      setUsers(data);
      console.log('users ' + JSON.stringify(data));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);


  return (
      <React.Fragment>
      <section>
        <div class="div-comp">
        <table border="1">
                    <thead>
                        <tr>
                            
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Contact</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(item=> <tr key={item.id}>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.contactnumber}</td>
                                    <td>{item.email}</td>
                                </tr>)}
                    </tbody>
                </table>
        </div>
        </section>
       </React.Fragment>
  );
};

export default AllUsers;