'use client'
import '../../src/app/page.css'
import Link from 'next/link'
import Image from 'next/image'
import { url } from './url'
import { useEffect, useState } from 'react'
import jsonData from '../components/toolslist.json'
import jsonProject from '../components/projects.json'
import Logo from '../../public/assets/Logo.svg'
import Emoji from '../../public/assets/Emoji.png'
import Avatar from '../../public/assets/Avatar.png'
import GitHub from '../../public/assets/Github.svg'
import Linkedin from '../../public/assets/Linkedin.svg'
import Email from '../../public/assets/envelope.svg'
import { Cursor, Typewriter } from 'react-simple-typewriter'
import { setContext } from '@apollo/client/link/context'
import Aos from 'aos'
import 'aos/dist/aos.css'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from '@apollo/client'

const getImageUrl = (name) => {
  // Mapeie o nome do projeto para sua URL correspondente
  switch (name) {
    case 'ImersaoDev_Alura':
      return 'https://i.ibb.co/Z86sGDX/Imersao-Dev-Alura.png'
    case 'Bots4RPA':
      return 'https://i.ibb.co/VJd0WF0/Bots4RPA.png'
    case 'NLWSpacetime':
      return 'https://i.ibb.co/vdjRXHX/NLWSpacetime.png'
    case 'spmedical':
      return 'https://i.ibb.co/hBzs2rv/spmedical.png'
    default:
      return '' // Retornar uma URL padrão ou vazia se o nome do projeto não for reconhecido
  }
}

export default function Home() {
  // const [AvatarUrl, setAvatarUrl] = useState([])
  const [ListRepos, setListRepos] = useState([])
  const [showAllRepos, setShowAllRepos] = useState(false)
  const displayedRepos = showAllRepos ? ListRepos : ListRepos.slice(0, 2)
  const toggleRepos = () => {
    setShowAllRepos(!showAllRepos)
  }
  useEffect(() => {
    Aos.init({ duration: 1500 })
    GetStaticProps()
  }, [])
  const GetStaticProps = async () => {
    try {
      const httpLink = createHttpLink({
        uri: 'https://api.github.com/graphql',
      })
      const authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`,
          },
        }
      })
      const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      })
      const { data } = await client.query({
        query: gql`
          {
            user(login: "gustrpaz") {
              pinnedItems(first: 4, types: [REPOSITORY]) {
                totalCount
                edges {
                  node {
                    ... on Repository {
                      name
                      id
                      url
                      description
                    }
                  }
                }
              }
              avatarUrl
            }
          }
        `,
      })
      const { user } = data
      const pinnedItems = user.pinnedItems.edges.map((edge) => edge.node)
      setListRepos(pinnedItems)
      // const Avatar = user.avatarUrl
      // setAvatarUrl(Avatar)
    } catch (erro) {
      console.log(erro)
    }
  }
  const [active, setMode] = useState(false)
  const ToggleMode = () => {
    setMode(!active)
  }
  return (
    <>
      <header data-aos="slide-down">
        <div className="wrapper container-header">
          <a href="#introduction">
            <Image className="logo" src={Logo} alt="Logo Rezende"></Image>
          </a>
          <div
            className={active ? 'icon iconActive' : 'icon'}
            onClick={ToggleMode}
          >
            <div className="hamburguer hamburguerIcon"></div>
          </div>
          <div className={active ? 'menu menuOpen' : 'menu menuClose'}>
            <nav id="nav">
              <ul className="listItems">
                <li>
                  <a href="#about" onClick={ToggleMode}>
                    Sobre mim
                  </a>
                </li>
                <li>
                  <a href="#skills" onClick={ToggleMode}>
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#projects" onClick={ToggleMode}>
                    Projetos
                  </a>
                </li>
                <li>
                  <a href="#about" onClick={ToggleMode}>
                    Contato
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main>
        <section id="introduction">
          <div className="banner wrapper">
            <div className="left" data-aos="zoom-in">
              <div className="box-hello">
                <Image className="emoji" src={Emoji} alt="Hand emoji"></Image>
                <span className="text2 hello">Hello World!</span>
              </div>
              <h1 className="title p">Sou o Gustavo Rezende</h1>
              <h1 className="title s">
                <Typewriter
                  words={[
                    'Desenvolvedor FullStack',
                    'Designer',
                    'Sistemas de Informação',
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={100}
                  delaySpeed={1500}
                  cursorColor="white"
                />
              </h1>
              <Cursor />
              <p className="text">
                Apaixonado por tecnologia, tenho me dedicado constantemente aos
                estudos na área da programação. Meu principal objetivo é
                entregar os melhores resultados para o agrado dos clientes e o
                desenvolvimento das empresas.
              </p>
            </div>
            <Image
              className="avatar"
              src={Avatar}
              alt="Avatar Rezende"
              data-aos="zoom-in"
            ></Image>
          </div>
        </section>
        <div className="hr"></div>
        <div className="wrapper">
          <section id="skills">
            <div data-aos="zoom-in">
              <h1 className="subtitle">Skills</h1>
              <hr className="hrs hr1"></hr>
              <hr className="hrs hr2"></hr>
            </div>
            <div className="box-skills">
              <div className="conteiner-skills tools" data-aos="fade-right">
                {jsonData.map((tool, index) => (
                  <div key={index} className="card text2">
                    <Image
                      src={`${url}/assets/${tool.img}.svg`}
                      alt={tool.name}
                      width={38}
                      height={38}
                      className="tool-img"
                    ></Image>
                    <span className="tool-name">{tool.name}</span>
                  </div>
                ))}
              </div>
              <div className="conteiner-skills area" data-aos="fade-left">
                <div className="box-area">
                  <div className="box-area-text">
                    <div className="area-text">
                      <span className="text2">Frontend</span>
                      <p className="text">90%</p>
                    </div>
                    <div className="load">
                      <div className="front"></div>
                    </div>
                  </div>
                  <div className="box-area-text">
                    <div className="area-text">
                      <span className="text2">Backend</span>
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
            <div data-aos="fade-right">
              <h1 className="subtitle">Meus Projetos</h1>
              <hr className="hrs hr3"></hr>
              <hr className="hrs hr4"></hr>
            </div>
            {displayedRepos.map((item) =>
              displayedRepos.indexOf(item) % 2 === 0 ? (
                <div key={item.id} className="project-content">
                  <div className="box-content">
                    <Link className="link-project" href={item.url}>
                      {jsonProject.map((project) => (
                        <img
                          key={project.id}
                          className="img-project"
                          data-aos="fade-right"
                          src={project.url}
                          alt={project.name}
                          width={570}
                          height={320}
                          style={{ borderRadius: '30px' }}
                        />
                      ))}
                    </Link>
                  </div>
                  <div className="text-project" data-aos="fade-left">
                    <h3 className="contrast">{item.name}</h3>
                    <p className="text">{item.description}</p>
                    <Link href={item.url}>
                      <button className="btn bg-slide">Ver repositório</button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div key={item.id} className="project-content">
                  <div className="text-project" data-aos="fade-right">
                    <h3 className="contrast">{item.name}</h3>
                    <p className="text">{item.description}</p>
                    <Link href={item.url}>
                      <button className="btn bg-slide">Ver repositório</button>
                    </Link>
                  </div>
                  <div className="box-content">
                    <Link className="link-project" href={item.url}>
                      <img
                        className="img-project"
                        data-aos="fade-left"
                        src={`${url}/assets/${item.name}.png`}
                        alt={item.name}
                        width={570}
                        height={320}
                        style={{ borderRadius: '30px' }}
                        // onError={(e) =>
                        //   (e.target.src = 'https://i.imgur.com/XEu32Uj.png')
                        // }
                      />
                    </Link>
                  </div>
                </div>
              ),
            )}
            {displayedRepos.map((item) => (
              <div key={item.id} className="project-content2">
                <div className="box-content">
                  <Link className="link-project" href={item.url}>
                    <Image
                      className="img-project"
                      data-aos="fade-right"
                      src={`${url}/assets/${item.name}.png`}
                      alt={item.name}
                      width={570}
                      height={320}
                      style={{ borderRadius: '30px' }}
                    ></Image>
                  </Link>
                </div>
                <div className="text-project" data-aos="fade-left">
                  <h3 className="contrast">{item.name}</h3>
                  <p className="text">{item.description}</p>
                  <Link href={item.url}>
                    <button className="btn bg-slide">Ver repositório</button>
                  </Link>
                </div>
              </div>
            ))}
            <div className="box-see-more" data-aos="zoom-in">
              <button className="see-more text2" onClick={toggleRepos}>
                {showAllRepos ? 'Ver menos' : 'Ver mais'}
              </button>
              <hr className="hrs hr5"></hr>
            </div>
          </section>
          <section id="about">
            <div className="content-end">
              <div data-aos="zoom-in">
                <h2 className="subtitle">Sobre Mim</h2>
                <hr className="hrs hr1"></hr>
                <hr className="hrs hr2"></hr>
              </div>
              <div data-aos="zoom-in">
                <h2 className="subtitle">Contato</h2>
                <hr className="hrs hr1"></hr>
                <hr className="hrs hr2"></hr>
              </div>
            </div>
            <div className="content-end inside">
              <div className="left-end" data-aos="fade-right">
                <div className="outline-photo">
                  <Image
                    // src={AvatarUrl}
                    src="https://avatars.githubusercontent.com/u/82393302?v=4"
                    width={275}
                    height={275}
                    style={{ borderRadius: '10px' }}
                    alt="Gustavo"
                    className="perfil-git"
                  ></Image>
                </div>
                <div className="box-profile">
                  <span className="text2">Gustavo Rezende Paz, 19 anos</span>
                  <ul>
                    <li className="text">
                      Curso técnico de Desenvolvimento de Sistemas
                    </li>
                    <li className="text">Cursando Sistemas de Informação </li>
                    <li className="text">Moro em São Paulo, Brasil </li>
                  </ul>
                  <p className="text">
                    Minhas principais experiências foram obtidas a partir de
                    projetos do curso técnico e outros trabalhos em equipe
                    atuando como FullStack.
                  </p>
                </div>
              </div>
              <div className="right-end" data-aos="fade-left">
                <Link className="link" href="https://github.com/gustrpaz">
                  <button className="btn bg-slide">
                    <Image
                      width={30}
                      height={30}
                      src={GitHub}
                      alt="Git Hub"
                      className="svg"
                    ></Image>
                    <span className="txt-btn">GitHub</span>
                  </button>
                </Link>
                <Link
                  className="link"
                  href="https://www.linkedin.com/in/gustavo-rezende-paz/"
                >
                  <button className="btn bg-slide">
                    <Image
                      width={30}
                      height={30}
                      src={Linkedin}
                      alt="Linkedin"
                    ></Image>
                    <span className="txt-btn">Linkedin</span>
                  </button>
                </Link>
                <Link className="link" href="mailto:grezendepaz@gmail.com">
                  <button className="btn contact bg-slide">
                    <Image
                      width={26}
                      height={26}
                      src={Email}
                      alt="Email"
                    ></Image>
                    <span className="txt-btn">Email</span>
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="text">
        © Todos os Diretos Reservados - Gustavo Rezende
      </footer>
    </>
  )
}
