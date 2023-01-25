import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import { connectSnap, getSnap, shouldDisplayReconnectButton } from '../utils';
import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  SendHelloButton,
  Card,
} from '../components';
import axios from "axios";
import { ethers } from 'ethers'

import {getAbi} from './function';
import { all } from 'axios';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 7.6rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary.default};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 64.8rem;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
`;

const Notice = styled.div`
  background-color: ${({ theme }) => theme.colors.background.alternative};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  color: ${({ theme }) => theme.colors.text.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;

  & > * {
    margin: 0;
  }
  ${({ theme }) => theme.mediaQueries.small} {
    margin-top: 1.2rem;
    padding: 1.6rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error.muted};
  border: 1px solid ${({ theme }) => theme.colors.error.default};
  color: ${({ theme }) => theme.colors.error.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

enum TransactionConstants {
  // The address of an arbitrary contract that will reject any transactions it receives
  Address = '0x08A8fDBddc160A7d5b957256b903dCAb1aE512C5',
  // Some example encoded contract transaction data
  UpdateWithdrawalAccount = '0x83ade3dc00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000047170ceae335a9db7e96b72de630389669b334710000000000000000000000006b175474e89094c44da98b954eedeac495271d0f',
  UpdateMigrationMode = '0x2e26065e0000000000000000000000000000000000000000000000000000000000000000',
  UpdateCap = '0x85b2c14a00000000000000000000000047170ceae335a9db7e96b72de630389669b334710000000000000000000000000000000000000000000000000de0b6b3a7640000',
}

const Index = () => {
  const [state, dispatch] = useContext(MetaMaskContext);
  const [addr, setAddr] = useState('');
  const [newVar,setNewVar] = useState({});
  const [myInput,setMyInput] = useState("");
  const [GetCreatorOfNft,setGetCreatorOfNft] = useState('');
  const [functionNames, setFunctionNames] = useState({});

  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const  myfunc = async()=>{
    const apiKey = 'sdwDCJvTN9o-Rw5T87Rud5BHpt_F8mzN'
    const url = `https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=${myInput}&tag=latest&apikey=${apiKey}`
    const res = await axios.get(url);
    const abi = JSON.parse(res.data.result)
    const contract = new ethers.Contract(myInput, abi,)
    // const p2 = await  getAbi(myInput);

            //  this is the way to find all the keys in a smart contract
            const iface = new ethers.utils.Interface(abi)
            // console.log("this is the iface11", Object.keys(iface.functions));
            const functions = Object.keys(iface.functions);
    let abc = {}
    console.log("functions", functions)
      for(let i=0; i<functions.length ;i++){
        let function1 = functions[i];
        console.log(function1);
        let function1Name = function1.split('(')[0];
        // setFunctionNames({function1Name:function1});
        console.log(function1Name, function1)
        abc = { ...abc,
          [function1Name]: function1
        }
       
      }
      setFunctionNames(abc);

    setNewVar(contract.functions);
  }


  const  myfunc2 = async(Name1,Input)=>{

            console.log("this si the value of the key and input for the myfunc2 function:- ", Name1, Input);
            const apiKey = 'sdwDCJvTN9o-Rw5T87Rud5BHpt_F8mzN'
             const url = `https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=${myInput}&tag=latest&apikey=${apiKey}`
             const res = await axios.get(url);
             console.log("this is the response to the api:- ", res, res.data.result)
             const abi = JSON.parse(res.data.result)
             const iface1 = new ethers.utils.Interface(abi)
             console.log
             console.log(iface1.functions.Name1.stateMutability)


             const ApiKey='sdwDCJvTN9o-Rw5T87Rud5BHpt_F8mzN'
            //  '1736a41e871645f5a13a2993a0aef694'
            //  `https://polygon-mumbai.infura.io/v3/${apiKey}`
            // https://polygon-mumbai.g.alchemy.com/v2/sdwDCJvTN9o-Rw5T87Rud5BHpt_F8mzN
             const provider = new ethers.providers.AlchemyProvider("maticmum", ApiKey);
            //  console.log("this si the provider",provider)
             const contract = new ethers.Contract(myInput, abi, provider)




            //  this is the way to find all the keys in a smart contract
             const iface = new ethers.utils.Interface(abi)
             console.log("this is the iface", iface);
             
             console.log("contrat abject",contract);
             const ans = await contract[Name1](Input)


             
            //  console.log("tis is the state mutability",contract.functions,"now                                 ", contract.functions.GetCurrentToken.constant);
            //  await ans.wait()
             console.log("this is the ans:-", ans);
             return ans;
  }

  

  const allfun={};

  const addrChangeHandle = async (e: any) => {
    setAddr(e.target.value);
  };

  const onSubmitHandle = async (e: any) => {
    try {
      e.preventDefault();
      // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendHelloClick = async () => {
    try {
      const [from] = (await window.ethereum.request({
        method: 'eth_requestAccounts',
      })) as string[];

      if (!from) {
        throw new Error('Failed to get accounts.');
      }

      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from,
            to: TransactionConstants.Address,
            value: '0x0',
            data: '0x1',
          },
        ],
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };


  const callfunction=(e)=>{

    const {name,value} = e.target;
    allfun[name]=value;
}



  return (
    <Container>
      <Heading>
        Welcome to <Span>template-snap</Span>
      </Heading>
      <Subtitle>
        Get started by editing <code>src/index.ts</code>
      </Subtitle>
      <CardContainer>
        {state.error && (
          <ErrorMessage>
            <b>An error happened:</b> {state.error.message}
          </ErrorMessage>
        )}
        {!state.isFlask && (
          <Card
            content={{
              title: 'Install',
              description:
                'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
              button: <InstallFlaskButton />,
            }}
            fullWidth
          />
        )}
        {!state.installedSnap && (
          <Card
            content={{
              title: 'Connect',
              description:
                'Get started by connecting to and installing the example snap.',
              button: (
                <ConnectButton
                  onClick={handleConnectClick}
                  disabled={!state.isFlask}
                />
              ),
            }}
            disabled={!state.isFlask}
          />
        )}
        {shouldDisplayReconnectButton(state.installedSnap) && (
          <Card
            content={{
              title: 'Reconnect',
              description:
                'While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.',
              button: (
                <ReconnectButton
                  onClick={handleConnectClick}
                  disabled={!state.installedSnap}
                />
              ),
            }}
            disabled={!state.installedSnap}
          />
        )}
        <Card
          content={{
            title: 'Send Hello message',
            description:
              'Display a custom message within a confirmation screen in MetaMask.',
            button: (
              <SendHelloButton
                onClick={handleSendHelloClick}
                disabled={!state.installedSnap}
              />
            ),
          }}
          disabled={!state.installedSnap}
          fullWidth={
            state.isFlask &&
            Boolean(state.installedSnap) &&
            !shouldDisplayReconnectButton(state.installedSnap)
          }
        />
        <Notice>
          <p>
            Please note that the <b>snap.manifest.json</b> and{' '}
            <b>package.json</b> must be located in the server root directory and
            the bundle must be hosted at the location specified by the location
            field.
          </p>
        </Notice>
        <form onSubmit={onSubmitHandle}>
          <input
            id="addr1"
            // value={addr}
            onChange={(e) => {
              if (e.target.value != "") {
                // getAbi(e.target.value)
                setMyInput(e.target.value); 
              }
            }}
            type="text"
          />
          <button type="submit" onClick={myfunc}>Submit</button>
        </form>
        
      </CardContainer>
      <ol>
      {Object.keys(newVar).length!=0 && Object.keys(newVar).map((key)=>(
        <li>
          {key.split('(')[0]}
          <br></br>

          {/* {key.split('(')[1].split(')')[0].split(',').map((key2)=>(
            <div>key2</div>
          ))} */}

          {!key.split('(')[1] && 
            <div>
              <input
              placeholder="No argument"
              ></input>
            </div>
          }

{key.split('(')[1] && key.split('(')[1].split(')')[0].split(',').length!=0 && key.split('(')[1] && key.split('(')[1].split(')')[0].split(',').map((key2)=>(
            <div>
              <input

              placeholder={key2}
              name={key.split('(')[0]}
              value={allfun[key.split('(')[0]]}
              onChange={callfunction}
              ></input>
            </div>
          ))}
          <br/>
          <button onClick={(e)=>{myfunc2(key.split('(')[0],allfun[key.split('(')[0]])
          }} > Query</button>
        </li>
      ))}
      </ol>
      
  
    </Container>
  );
  
};

export default Index;