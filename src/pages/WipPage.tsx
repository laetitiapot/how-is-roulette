import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";

const WipPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Result
        status="warning"
        title="WIP"
        extra={
          <Button
            type="ghost"
            size="large"
            onClick={() => navigate("/", { replace: true })}
          >
            Go back to Roulette status
          </Button>
        }
      />
    </>
  );
};

export default WipPage;
