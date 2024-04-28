import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "reactstrap";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Button
                color="info"
                size="sm"
                className="mt-3"
                onClick={() => {
                    localStorage.removeItem('token');
                }}
            >
                Logout
        </Button>
    </div>
  );
};

export default HomePage;