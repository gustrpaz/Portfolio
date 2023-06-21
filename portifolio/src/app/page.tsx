'use client'
// import React, { useState, useEffect } from 'react'

import '../../src/app/page.css'
import Image from 'next/image'
import Logo from '../../public/assets/Logo.svg'
import Emoji from '../../public/assets/Emoji.png'
import Avatar from '../../public/assets/Avatar.png'
// import Nlw from '../../public/assets/Nlw.png'
// import Bots4RPA from '../../public/assets/Bots4RPA.png'
import jsonData from '../components/toolslist.json'

export default function Home() {
  // const [itemsApi, setItemsApi] = useState([])

  // useEffect(() => {
  //   const abortController = new AbortController()

  //   function getGitHubAPI() {
  //     fetch('https://api.github.com/users/gustrpaz/pinned')
  //       .then(async (res) => {
  //         if (!res.ok) {
  //           throw new Error('error')
  //         }
  //         const data = await res.json()
  //         setItemsApi(data)
  //       })
  //       .catch((e) => console.log(e))
  //   }
  //   getGitHubAPI()
  //   return () => abortController.abort()
  // }, [])

  return (
    <body>
      <header>
        <div className="wrapper container-header">
          <a href="#introduction">
            <Image className="logo" src={Logo} alt="Logo Rezende"></Image>
          </a>
          <nav>
            <ul className="menu-header">
              <li>
                <a href="#about">Sobre mim</a>
              </li>
              <li>
                <a href="#skills"> Skills</a>
              </li>
              <li>
                <a href="#projects">Projetos</a>
              </li>
              <li>
                <a href="#about">Contato</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <section id="introduction">
          <div className="banner wrapper">
            <div className="left">
              <div className="box-hello">
                <Image className="emoji" src={Emoji} alt="Hand emoji"></Image>
                <span>Hello World!</span>
              </div>
              <h1 className="title p">Sou o Gustavo Rezende</h1>
              <h1 className="title s">Desenvolvedor FullStack</h1>
              <p className="text">
                Apaixonado por tecnologia, tenho me dedicado constantemente aos
                estudos na área da programação. Meu principal objetivo é
                entregar os melhores resultados para o agrado dos clientes e o
                desenvolvimento das empresas.
              </p>
            </div>
            <Image className="avatar" src={Avatar} alt="Avatar Rezende"></Image>
          </div>
        </section>
        <div className="hr"></div>
        <div className="wrapper">
          <section id="skills">
            <div>
              <h1 className="subtitle">Skills</h1>
              <hr className="hrs hr1"></hr>
              <hr className="hrs hr2"></hr>
            </div>
            <div className="box-skills">
              <div className="conteiner-skills tools">
                {jsonData.map((tool, index) => (
                  <div key={index} className="card">
                    <Image
                      src={`http://localhost:3000/assets/${tool.img}.svg`}
                      alt={tool.name}
                      width={38}
                      height={38}
                    ></Image>
                    {tool.name}
                  </div>
                ))}
              </div>
              <div className="conteiner-skills area">
                <div className="box-area">
                  <div className="box-area-text">
                    <div className="area-text">
                      <span>Frontend</span>
                      <p className="text">90%</p>
                    </div>
                    <div className="load">
                      <div className="front"></div>
                    </div>
                  </div>
                  <div className="box-area-text">
                    <div className="area-text">
                      <span>Backend</span>
                      <p className="text">75%</p>
                    </div>
                    <div className="load">
                      <div className="back"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="projects">
            {/* {itemsApi.map((item) => (
              <div key={item.id}>
                <h2>{item.name}</h2>
              </div>
            ))} */}
            {/* <div>
              <h1 className="subtitle">Meus Projetos</h1>
              <hr className="hrs hr3"></hr>
              <hr className="hrs hr4"></hr>
            </div>
            <div className="project-content">
              <Image
                className="img-project"
                src={Nlw}
                alt="Nlw Rocketseat"
              ></Image>
              <div className="text-project">
                <h3 className="contrast">Cápsula do tempo</h3>
                <p className="text">
                  Projeto realizado na Next Level Week #12 da Rocketseat,
                  funciona como uma linha do tempo, ou seja, é possível
                  cadastrar memórias adicionando uma legenda e optando por
                  torná-la público ou privado, o cadastro pode ser feito a
                  partir de uma conta no Git Hub. Existe a versão para web e a
                  versão mobile.
                </p>
                <button className="btn">Ver repositório</button>
              </div>
            </div>
            <div className="project-content">
              <div className="text-project">
                <h3 className="contrast">Bots4RPA</h3>
                <p className="text">
                  Uma aplicação com objetivo em automatizar processos
                  empresariais através de Bots. O usuário pode definir as
                  funcionalidades de seus assistentes através de um fluxo. A
                  plataforma permite a personalização dos robôs e contém outras
                  páginas como: dashboard da saúde dos bots, aba social, guia de
                  navegação, conquistas, acessibilidade etc.
                </p>
                <button className="btn">Ver repositório</button>
              </div>
              <Image
                className="img-project"
                src={Bots4RPA}
                alt="Bots4RPA"
              ></Image>
            </div> */}
          </section>
          <section id="about"></section>
        </div>
      </main>
      <footer></footer>
    </body>
  )
}
