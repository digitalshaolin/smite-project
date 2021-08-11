import Head from 'next/head'
import md5hash from 'md5'
import BuildsSection from '../components/BuildsSection'
import BuildspageHero from '../components/BuildspageHero'
import BuildsPageInstructions from '../components/BuildsPageInstructions'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.scss'
import { getSessionID, getItems, getMatchHistory } from '../lib/api'
import Link from 'next/link'
import { itemsObject } from '../lib/itemsObject'

export async function getStaticProps() {
  const sessionID = await getSessionID();
  const items = itemsObject;
  const playerLasbra = await getMatchHistory("86523", sessionID);
  const playerPBM = await getMatchHistory("4151583", sessionID);
  const playerFineokay = await getMatchHistory("4057379", sessionID);
  const playerSam4Soccer2 = await getMatchHistory("6248360", sessionID);
  const playerCycloneSpin = await getMatchHistory("144582", sessionID);
  const playerNika = await getMatchHistory("1232115", sessionID);
  const playerVote = await getMatchHistory("1787381", sessionID);
  const playerLayers = await getMatchHistory("702236453", sessionID);
  const playerInbowned = await getMatchHistory("700057566", sessionID);
  const playerZapman = await getMatchHistory("367737", sessionID);

  const matches = {
    lasbra: playerLasbra,
    polarbearmike: playerPBM,
    fineokay: playerFineokay,
    sam4soccer2: playerSam4Soccer2,
    cyclonespin: playerCycloneSpin,
    nika: playerNika,
    vote: playerVote,
    layers: playerLayers,
    inbowned: playerInbowned,
    zapman: playerZapman
  };

  return {
    props: { matches, sessionID, items },
    revalidate: 900,
  }
}


export default function Builds(props) {

  useEffect(() => {
    const body = document.querySelector("body");
    body.addEventListener('click', (e) => {
      e.preventDefault();
      const allItems = document.querySelectorAll('.build-item');
      const allActives = document.querySelectorAll('.buildrow-active');
      for (let i = 0; i < allItems.length; i++) {
        allItems[i].classList.remove("activeTooltip");
        if (e.target.parentNode.classList.contains("build-item")) {
          e.target.parentNode.classList.add("activeTooltip");
        }
      }
      for (let i = 0; i < allActives.length; i++) {
        allActives[i].classList.remove("activeTooltip");
        if (e.target.parentNode.classList.contains("buildrow-active")) {
          e.target.parentNode.classList.add("activeTooltip");
        }
      }
    })
  }, [])

  return (
    <div>
      <Head>
        <title>Pro Smite Builds</title>
        <meta name="description" content="Easily find pro Smite builds used by SPL players. Quickly filter by god or player with this easy to use tool." />
        <meta name="description" content="Smite Nexus is here to provide easy to find SPL level Smite builds." />
        <meta property="og:title" content="Smite Nexus - The best source to quickly see what the Smite pros build" />
        <meta property="og:url" content="https://www.smitenexus.com/builds" />
        <meta property="og:description" content="Quickly and easily see what items pro players use in their games!" />
        <meta property="og:image" content="https://www.smitenexus.com/images/assets/ogimage.jpg" />
      </Head>
      <BuildspageHero />
      <BuildsPageInstructions />
      <BuildsSection matches={props.matches} items={props.items} />
    </div>
  )
}