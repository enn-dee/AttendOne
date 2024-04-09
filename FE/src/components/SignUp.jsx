import React, { useState } from "react";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //   const [role, setRole] = useState();
  const [sem, setSem] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, sem);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <div className="w-96 flex items-center flex-col h-80 bg-slate-600 rounded-lg gap-3 p-3">
        <h3 className="text-xl font-semibold">
          Sign-Up <span className="text-cyan-500">AttendOne</span>
        </h3>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 rounded-md w-full"
          />
          <input
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-md w-full"
          />
          <input
            type="number"
            value={sem}
            placeholder="Enter Semester"
            onChange={(e) => setSem(e.target.value)}
            className="p-2 rounded-md w-full"
          />
          <button
            type="submit"
            className="bg-green-400 p-2 rounded-md hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
