import React, { useRef, useState } from "react";
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* align-items: center; */
`;

const LabelInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  max-width: 300px;
  width: 100%;
`;

const Input = styled.input`
  max-width: 150px;
  width: 100%;
`;

const TextArea = styled.textarea`
  max-width: 150px;
  width: 100%;
`;

const Form: React.FC = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [responseMessage, setResponseMessage] = useState("");
  //   console.log(firstNameRef.current!.value);

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    const enteredFirstName: string = firstNameRef.current!.value;
    const enteredLastName: string = lastNameRef.current!.value;
    const enteredEmail: string = emailRef.current!.value;
    const enteredMessage: string = messageRef.current!.value;
    console.log(
      enteredFirstName,
      enteredLastName,
      enteredEmail,
      enteredMessage
    );

    fetch("/api/submitted-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        enteredFirstName,
        enteredLastName,
        enteredEmail,
        enteredMessage,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setResponseMessage(response.message);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
  return (
    <>
      {responseMessage !== "" ? (
        responseMessage
      ) : (
        <FormContainer onSubmit={submitHandler}>
          <LabelInputContainer>
            <label htmlFor="firstName">First Name</label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              ref={firstNameRef}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <label htmlFor="lastName">Last Name</label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              ref={lastNameRef}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <label htmlFor="email">Email</label>
            <Input type="email" id="email" name="email" ref={emailRef} />
          </LabelInputContainer>
          <LabelInputContainer>
            <label htmlFor="message">Message</label>
            <TextArea name="message" ref={messageRef} />
          </LabelInputContainer>
          <button type="submit">Click Me</button>
        </FormContainer>
      )}
    </>
  );
};

export default Form;
