import React, { useState, useEffect, useRef } from 'react';
import { Canvas} from '@react-three/fiber'
import { OrbitControls, Html} from '@react-three/drei'
import { Model6 } from "./_3DOffice";
import { Model10 } from "./BossAvatar";
import { ConvaiClient } from 'convai-web-sdk';
import './site.css';

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone } from "react-icons/fa";


// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBXwTgOjVZt8h_WvUxDVGX5VXB-aA2O7Ws",
//   authDomain: "test4-93435.firebaseapp.com",
//   projectId: "test4-93435",
//   storageBucket: "test4-93435.appspot.com",
//   messagingSenderId: "418026667006",
//   appId: "1:418026667006:web:6371df2b22089eda7ddeaf",
//   measurementId: "G-7PKDVD3YM0"
// };

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


// console.log(process.env.REACT_APP_CONVAI_API_KEY);
// console.log(process.env.REACT_APP_CHARACTER_ID);

const convaiClient = new ConvaiClient({
  apiKey: process.env.REACT_APP_CONVAI_API_KEY,
  characterId: process.env.REACT_APP_CHARACTER_ID,
  enableAudio: true,
});

// const convaiClient = new ConvaiClient({
//   apiKey: SETTINGS['CONVAI-API-KEY'],
//   characterId: SETTINGS['CHARACTER-ID'],
//   enableAudio: true, // use false for text only.
// });



export default function App() {
  //const [setUserText] = useState("Press & Hold Alt to Talk!");
  const finalizedUserText = useRef();
  //const [setNpcText] = useState("");
  const npcTextRef = useRef();

  const [isTalking, setIsTalking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  // const [setIsRecordButtonPressed] = useState(false);
  const [userInput, setUserInput] = useState('');
  // const [npcResponses, setNpcResponses] = useState([]);

  // const [chatMessages, setChatMessages] = useState([]);
  // const [keyPressed, setKeyPressed] = useState(false);

  const [isElementsVisible] = useState(false);


  // const [transcript, setTranscript] = useState("");
  const { interimTranscript, finalTranscript } =
    useSpeechRecognition();

  useEffect(() => {
    setUserInput(interimTranscript + finalTranscript);
  }, [interimTranscript, finalTranscript]);

  useEffect(() => {
    if (finalTranscript !== "") {
      // Speech has been detected, do something with the transcript
      console.log("Transcript:", finalTranscript);
      stopRecording();
    }
  }, [finalTranscript]);

  // const startRecording = () => {
  //   setIsRecording(true);
  //   resetTranscript();
  //   SpeechRecognition.startListening({ continuous: true, interimResults: true });
  // };

  const stopRecording = () => {
    setIsRecording(false);
    SpeechRecognition.abortListening();
  };

  // const handleButtonClick = () => {
  //   if (isRecording) {
  //     stopRecording();
  //   } else {
  //     startRecording();
  //   }
  // };
  
  // const toggleElementsVisibility = () => {
    
  //   // setIsElementsVisible((prevVisible) => !prevVisible);
  // };

  function displayMain(){
    var main = document.getElementById('main');

    if (main.getAttribute("class") !== null){
      main.removeAttribute("class");
    }else{
      main.setAttribute("class", "display");
    }
  }

  convaiClient.setResponseCallback((response) => {  

    var responseText= document.getElementById("response");
    
    if (response.hasUserQuery()) {
      var transcript = response.getUserQuery();
      var isFinal = transcript.getIsFinal();
      if (isFinal) {
        finalizedUserText.current += " " + transcript.getTextData();
        transcript = "";
      }
      if (transcript) {
        setUserInput(finalizedUserText.current + transcript.getTextData());
      } else {
        setUserInput('');
      }
    }

    if (response.hasAudioResponse() && responseText !== null) {
      var audioResponse = response?.getAudioResponse();
      responseText.innerHTML += " " + audioResponse.getTextData();
      
      if (audioResponse.getEndOfResponse() !== true) {
        console.log('Audio playing');
        setIsTalking(true);
      }else{
        setTimeout(stopA, 3000);
      }

      
    }
    //setChatMessages((prevMessages) => [...prevMessages, { sender: 'msgCon2', message: responseText }]);
  });

 
  function stopA(){
    console.log('Audio stopped');
    setIsTalking(false);
  }
 
  
  function handleSendButton() {
    if (isRecording){

      handleSpacebarRelease();
    }else{

      if (userInput.trim() !== '') {
              var rsp = document.getElementById('response');
  
        if (rsp !== null){
          rsp.removeAttribute("id");
        }
  
        
        let data_req = document.createElement('div');
        let container1 = document.createElement('div');
        container1.setAttribute("class","msgCon1");
        data_req.innerHTML = userInput;
        data_req.setAttribute("class","right");
        let message = document.getElementById('msg');
        message.appendChild(container1);
        container1.appendChild(data_req);
  
        setUserInput('');
    
        // Process the user's message with the ConvaiClient
        convaiClient.sendTextChunk(userInput);
  
        let data_res = document.createElement('div');       
        let container2 = document.createElement('div');      
        container2.setAttribute("class","msgCon2");     
        data_res.innerHTML = '' ;      
        data_res.setAttribute("class","left");
        data_res.setAttribute("id", "response");
        message.appendChild(container2);      
        container2.appendChild(data_res);
      }
    }

  }

  // function startRecord(recognition){
  //   recognition.start();  
  //   setIsRecordButtonPressed(true);

  // }

  // function stopRecord(recognition){
  //   recognition.stop();    
  //   setIsRecordButtonPressed(false); 
  // }

  // function handleRecordButtonPress() {
  //      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  //     // Create a new SpeechRecognition object
  //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  //     const recognition = new SpeechRecognition();

  //     // Set the recognition language
  //     recognition.lang = 'en-US';

  //     if (isRecordButtonPressed) {
  //            stopRecord(recognition);
  //     }else {        
  //           startRecord(recognition);
  //     }

  //     // Define the start and stop event handlers
  //     recognition.onstart = () => {
  //       console.log('Speech recognition started');
  //     };

  //     recognition.onresult = (event) => {
  //       const transcript = event.results[0][0].transcript;
  //       console.log('Result:', transcript);
  //       document.getElementById('msg_send').value = transcript;
  //       setUserInput(transcript);
  //     };

  //     recognition.onerror = (event) => {
  //       console.error('Speech recognition error:', event.error);
  //     };

  //     recognition.onspeechend = () => {
  //       if (isRecordButtonPressed) {
  //         recognition.stop();    
  //         setIsRecordButtonPressed(false);  
  //       }
  //     };
  //   } else {
  //     console.error('Speech recognition not supported in this browser');
  //   }
  // }

  // function handleRecordButtonRelease() {
  //   if (isRecording) {
  //     setIsRecording(false); // Stop recording when Record button is released
  //     setIsRecordButtonPressed(false);
  //     convaiClient.endAudioChunk();
  //   }
  // }

  function handleSpacebarPress() {

    var rsp = document.getElementById('response');

    if (rsp !== null){
      rsp.removeAttribute("id");
    }
    setIsRecording(true);
    finalizedUserText.current = "";
    npcTextRef.current = "";
    // setUserText("");
    // setNpcText("");
    convaiClient.startAudioChunk();
  }

  function handleSpacebarRelease() {
    let message = document.getElementById('msg');

    if (userInput.trim() !== '') {

      let data_req = document.createElement('div');
      let container1 = document.createElement('div');
      container1.setAttribute("class","msgCon1");
      data_req.innerHTML = userInput;
      data_req.setAttribute("class","right");
      message.appendChild(container1);
      container1.appendChild(data_req);
    }
    
    setUserInput('');
    
    setIsRecording(false);
    convaiClient.endAudioChunk();
    
    let data_res = document.createElement('div');       
    let container2 = document.createElement('div');      
    container2.setAttribute("class","msgCon2");     
    data_res.innerHTML = '' ;      
    data_res.setAttribute("class","left");
    data_res.setAttribute("id", "response");
    message.appendChild(container2);      
    container2.appendChild(data_res);

  }

  function microButtonClick () {
    if (isRecording){
      handleSpacebarRelease();
    } else{
      handleSpacebarPress();
    }
  }

  return (
    
    <Canvas camera={{ position: [0, 0, 0], fov:50 }}>
           
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <Model10 position={[0.5, -10, -25]} scale={7} animationName={isTalking ? "talk" : "idle"} rotation={[0, 0, 0]} />
      
      
      <Model6 position={[8.5, -10, -172]}  scale={7} rotation={[0, Math.PI, 0]} />
      <Html>
        <button
          onClick={displayMain}
          style={{
            paddingLeft:'1.6vw',
            paddingTop:'0.8vw',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '10%',
            cursor: 'pointer',
            outline: 'none',
            boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
            transform: isElementsVisible ? 'rotate(360deg)' : 'none',
            transition: 'transform 0.5s',
          }}
        >
          <img
            src="/chatbot.png" // Replace with the actual path to your PNG icon
            alt="Toggle"
            style={{ width: '65px', height: '65px' }}
          />
          
        </button>

        <div id="main" className="display">
          
          <div id="msg">
          </div>
          <div className="input">
            <input
              type="text"
              id="msg_send"
              placeholder="Type your question here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendButton();
                }
              }}
            />
            <button onClick= {microButtonClick} style={{ color: isRecording ? '#b03459' : 'grey' }} className="mic" id="micro"> <FaMicrophone />  
            </button>
            <button onClick={handleSendButton} className="send" id="reply">
              Send <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
        
        
      </Html>
       
      <OrbitControls enableZoom={true} enableRotate={true} enableDamping={true} enablePan={true}  />
      
    </Canvas>
  );

}
