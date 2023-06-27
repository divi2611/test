/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 Idle_M2.glb
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Idle_M2.glb')
  const { actions } = useAnimations(animations, group)
  const handleAnimation = (animationName) => {
    //var from = animationName === "talk" ? 'Armature.003|mixamo.com|Layer0.001' : 'Armature.001|mixamo.com|Layer0.001';
    //var to = animationName === "talk" ? 'Armature.001|mixamo.com|Layer0.001' : 'Armature.003|mixamo.com|Layer0.001';
    // if (actions[from].isRunning()) {
    //   actions[from].fadeOut(0.3);
    // }

    if (animationName==="talk"){
      actions['Armature.001|mixamo.com|Layer0.003'].stop();//idle animation
      actions['Armature.001|mixamo.com|Layer0.001'].reset().fadeIn(0.3).play();//talking animation
    } else{
      actions['Armature.001|mixamo.com|Layer0.001'].stop();//talking animation
      actions['Armature.001|mixamo.com|Layer0.003'].reset().fadeIn(0.3).play();//idle animation

    }
    
    
  };
  useEffect(() => {
    handleAnimation(props.animationName);
  }, [props.animationName]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Hips} />
          <skinnedMesh name="Wolf3D_Body" geometry={nodes.Wolf3D_Body.geometry} material={materials['Wolf3D_Body.006']} skeleton={nodes.Wolf3D_Body.skeleton} />
          <skinnedMesh name="Wolf3D_Hair" geometry={nodes.Wolf3D_Hair.geometry} material={materials['Wolf3D_Hair.006']} skeleton={nodes.Wolf3D_Hair.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Bottom" geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials['Wolf3D_Outfit_Bottom.006']} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Footwear" geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials['Wolf3D_Outfit_Footwear.006']} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Top" geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials['Wolf3D_Outfit_Top.006']} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
          <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials['Wolf3D_Eye.006']} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
          <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials['Wolf3D_Eye.006']} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials['Wolf3D_Skin.006']} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials['Wolf3D_Teeth.006']} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Idle_M2.glb')