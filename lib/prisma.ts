import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Cria a pool de conexão usando a sua variável de ambiente
const connectionString = `${process.env.POSTGRES_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Função para garantir que o Prisma não crie múltiplas instâncias no Next.js (HMR)
const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;