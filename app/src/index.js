import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import getConfig from "./config.js";
import { viewMethodOnContract } from "./utils";
import { data } from "./hardcoded-data";

async function initCrossword() {
  const nearConfig = getConfig(process.env.NEAR_ENV || 'testnet');
  const solutionHash = await viewMethodOnContract(nearConfig, 'get_solution');
  return { data, solutionHash };
}

initCrossword()
  .then(({ data, solutionHash }) => {
    ReactDOM.render(
      <React.StrictMode>
        <App
          data={data}
          solutionHash={solutionHash}
        />
      </React.StrictMode>,
      document.getElementById('root')
    );
  });
