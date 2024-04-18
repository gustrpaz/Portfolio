/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'avatars.githubusercontent.com'], // Adicione aqui o domínio da sua imagem
  },
  env: {
    PUBLIC_URL: '/',
  },
}
module.exports = nextConfig
