import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function App() {
  const [reqMethod, setReqMethod] = useState("GET");
  const [reqURL, setReqURL] = useState("");
  const [reqBody, setReqBody] = useState("");
  const [resStatus, setResStatus] = useState("");
  const [resBody, setResBody] = useState("");

  const sendRequest = async () => {
    const res = await fetch(reqURL, {
      method: reqMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: reqMethod === "GET" ? null : reqBody,
    });
    const data = await res.json();
    setResStatus(res.status);
    setResBody(JSON.stringify(data, null, 4));
  };

  return (
    <div className="container">
      <InputGroup className="my-2">
        <div>
          <Form.Select
            aria-label="Request method"
            value={reqMethod}
            onChange={(e) => setReqMethod(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </Form.Select>
        </div>

        <Form.Control
          aria-label="Request URL"
          placeholder="Enter URL"
          value={reqURL}
          onChange={(e) => setReqURL(e.target.value)}
        />

        <Button variant="primary" onClick={sendRequest}>
          Send
        </Button>
      </InputGroup>

      <Form.Control
        as="textarea"
        rows={10}
        placeholder="Request body (json)"
        className="mb-3"
        value={reqBody}
        onChange={(e) => setReqBody(e.target.value)}
      />

      <h5>Status: {resStatus}</h5>

      <pre>{resBody}</pre>
    </div>
  );
}

export default App;
