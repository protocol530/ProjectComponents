import { Helmet } from "react-helmet";
import { createGlobalStyle } from "styled-components";
import "./App.css";
import Router from "../router";
import dotenv from "dotenv";
import { Provider } from "react-redux";
import store from "../store";
dotenv.config();

function App() {
  // return (
  //   <ContextProvider>
  //     <Styled.GlobalStyles />
  //     <Helmet>
  //       <title>title</title>
  //     </Helmet>
  //     <div>
  //       <Router />
  //     </div>
  //   </ContextProvider>
  // );
  return (
    <Provider store={store()}>
      <Styled.GlobalStyles />
      <Helmet>
        <title>CocoTruck</title>
      </Helmet>
      <div>
        <Router />
      </div>
    </Provider>
  );
}

const Styled = {
  GlobalStyles: createGlobalStyle`
  @font-face {
    font-family: "Montserrat-Bold";
    src: url("../../src/assets/fonts/Montserrat-Bold.ttf");
  }
  @font-face {
    font-family: "Montserrat-Regular";
    src: url("../../src/assets/fonts/Montserrat-Regular.ttf");
  }
  @font-face {
    font-family: "Montserrat-SemiBold";
    src: url("../../src/assets/fonts/Montserrat-SemiBold.ttf");
  }
  @font-face {
    font-family: "Montserrat-Medium";
    src: url("../../src/assets/fonts/Montserrat-Medium.ttf");
  }
  
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Montserrat-Regular";
    }

    li {
      list-style: none;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    button {
      cursor: pointer;
    }

    img {
      display: block;
    }

  `,
};

export default App;
