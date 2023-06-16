import Image from 'next/image'
import Logo from '../assets/Logo.svg'
import '../../src/app/page.css'

export default function Home() {
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
        <div className="wrapper">
          <section id="introduction">introdução</section>
          <section id="skills">skills</section>
          <section id="projects">projetos</section>
          <section id="about">sobre</section>
        </div>
      </main>
      <footer></footer>
    </body>
  )
}
