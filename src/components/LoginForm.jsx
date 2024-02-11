const LoginForm = (props) => (
  <form onSubmit={props.handleLogin}>
    <div>
      username
      <input
        type="text"
        value={props.username}
        name="Username"
        id="username"
        onChange={({ target }) => props.setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={props.password}
        name="Password"
        id="password"
        onChange={({ target }) => props.setPassword(target.value)}
      />
    </div>
    <button type="submit" id="login-button">
      Login
    </button>
  </form>
);

export default LoginForm;
