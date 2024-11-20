function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const loginMessage = document.getElementById("login-message");

  loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Captura valores dos campos
      const enteredUsername = document.getElementById("username").value;
      const enteredPassword = document.getElementById("password").value;

      // Validação (opcional, pode ser mais robusta)
      if (!enteredUsername || !enteredPassword) {
          loginMessage.textContent = "Por favor, preencha todos os campos.";
          loginMessage.style.color = "red";
          return;
      }

      // Verificação de credenciais (substitua por sua lógica de autenticação real)
      // Neste exemplo, usamos um objeto simples para armazenar as credenciais
      const userCredentials = {
          username: enteredUsername,
          password: enteredPassword
      };

      if (enteredUsername === userCredentials.username && enteredPassword === userCredentials.password) {

          loginMessage.textContent = "Login bem-sucedido! Redirecionando...";
          loginMessage.style.color = "green";
          setCookie("USERNAME", enteredUsername);
          window.location.href = "index.html";
          //handleLoginSuccess();
          
      } else {
          loginMessage.textContent = "Usuário ou senha incorretos. Tente novamente.";
          loginMessage.style.color = "red";
      }
  });

  // Botões de login social (exemplo com Firebase)
  const facebookLoginButton = document.querySelector('.facebook-login');
  const googleLoginButton = document.querySelector('.google-login');

  // Configuração do Firebase (substitua pelas suas credenciais)
  const firebaseConfig = {
      // ...
  };
  //firebase.initializeApp(firebaseConfig);

  const provider = new firebase.auth.GoogleAuthProvider();

  facebookLoginButton.addEventListener('click', () => {
      // Lógica de login com Facebook (substitua por sua implementação real)
      //console.log('Clicou em continuar com Facebook');
      // ... (sua lógica de login com Facebook)
      // Após o login bem-sucedido:
      handleLoginSuccess();
  });

  googleLoginButton.addEventListener('click', () => {
      // Lógica de login com Google (exemplo com Firebase)
      firebase.auth().signInWithPopup(provider)
          .then((result) => {
              // Usuário logado com sucesso
              console.log(result.user);
              handleLoginSuccess();
          })
          .catch((error) => {
              // Tratar erros de autenticação
              console.error('Error:', error);
          });
  });

  // Função para lidar com o sucesso do login
  function handleLoginSuccess() {
      loginMessage.textContent = "Login bem-sucedido! Redirecionando...";
      loginMessage.style.color = "green";
      setCookie("USERNAME", enteredUsername);
      window.location.href = "index.html";
  }
});