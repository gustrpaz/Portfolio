'use client'
import '../../src/app/page.css'
import Link from 'next/link'
import Image from 'next/image'
import { url } from './url'
import { useEffect, useState } from 'react'
import { setContext } from '@apollo/client/link/context'
import jsonData from '../components/toolslist.json'
import Logo from '../../public/assets/Logo.svg'
import Emoji from '../../public/assets/Emoji.png'
import Avatar from '../../public/assets/Avatar.png'
import GitHub from '../../public/assets/Github.svg'
import Linkedin from '../../public/assets/Linkedin.svg'
import Email from '../../public/assets/envelope.svg'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from '@apollo/client'

export default function Home() {
  // const [AvatarUrl, setAvatarUrl] = useState([])
  const [ListRepos, setListRepos] = useState([])
  const [showAllRepos, setShowAllRepos] = useState(false)
  const displayedRepos = showAllRepos ? ListRepos : ListRepos.slice(0, 2)
  const toggleRepos = () => {
    setShowAllRepos(!showAllRepos)
  }
  useEffect(() => {
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
  return (
    <>
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
                <span className="text2 hello">Hello World!</span>
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
                  <div key={index} className="card text2">
                    <Image
                      src={`${url}/assets/${tool.img}.svg`}
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
            <div>
              <h1 className="subtitle">Meus Projetos</h1>
              <hr className="hrs hr3"></hr>
              <hr className="hrs hr4"></hr>
            </div>
            {displayedRepos.map((item) =>
              displayedRepos.indexOf(item) % 2 === 0 ? (
                <div key={item.id} className="project-content">
                  <Image
                    className="img-project"
                    src={`${url}/assets/${item.name}.png`}
                    alt={item.name}
                    width={570}
                    height={320}
                    style={{ borderRadius: '30px' }}
                  ></Image>
                  <div className="text-project">
                    <h3 className="contrast">{item.name}</h3>
                    <p className="text">{item.description}</p>
                    <Link href={item.url}>
                      <button className="btn">Ver repositório</button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div key={item.id} className="project-content">
                  <div className="text-project">
                    <h3 className="contrast">{item.name}</h3>
                    <p className="text">{item.description}</p>
                    <Link href={item.url}>
                      <button className="btn">Ver repositório</button>
                    </Link>
                  </div>
                  <Image
                    className="img-project"
                    src={`${url}/assets/${item.name}.png`}
                    alt={item.name}
                    width={570}
                    height={320}
                    style={{ borderRadius: '30px' }}
                  ></Image>
                </div>
              ),
            )}
            <button className="see-more text2" onClick={toggleRepos}>
              {showAllRepos ? 'Ver menos' : 'Ver mais'}
            </button>
            <hr className="hrs hr5"></hr>
          </section>

          <section id="about">
            <div className="content-end">
              <div>
                <h2 className="subtitle">Sobre Mim</h2>
                <hr className="hrs hr1"></hr>
                <hr className="hrs hr2"></hr>
              </div>
              <div>
                <h2 className="subtitle">Contato</h2>
                <hr className="hrs hr1"></hr>
                <hr className="hrs hr2"></hr>
              </div>
            </div>
            <div className="content-end inside">
              <div className="left-end">
                <div className="outline-photo">
                  <Image
                    // src={AvatarUrl}
                    src="https://avatars.githubusercontent.com/u/82393302?v=4"
                    width={275}
                    height={275}
                    style={{ borderRadius: '10px' }}
                    alt="Gustavo"
                  ></Image>
                </div>
                <div className="box-profile">
                  <span className="text2">Gustavo Rezende Paz, 18 anos</span>
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
              <div className="right-end">
                <Link className="link" href="https://github.com/gustrpaz">
                  <button className="btn contact">
                    <Image
                      width={30}
                      height={30}
                      src={GitHub}
                      alt="Git Hub"
                    ></Image>
                    GitHub
                  </button>
                </Link>
                <Link
                  className="link"
                  href="https://www.linkedin.com/in/gustavo-rezende-paz/"
                >
                  <button className="btn contact">
                    <Image
                      width={30}
                      height={30}
                      src={Linkedin}
                      alt="Linkedin"
                    ></Image>
                    Linkedin
                  </button>
                </Link>
                <Link className="link" href="mailto:grezendepaz@gmail.com">
                  <button className="btn contact">
                    <Image
                      width={26}
                      height={26}
                      src={Email}
                      alt="Email"
                    ></Image>
                    Email
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
