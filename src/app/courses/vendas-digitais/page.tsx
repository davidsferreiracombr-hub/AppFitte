
'use client';

import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Award, DollarSign, ClipboardList, Calculator, ShoppingCart, Megaphone, Truck, XCircle, CheckCircle, Lightbulb } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const whyOnlineBenefits = [
  {
    icon: TrendingUp,
    title: "Mercado em Expansão",
    description: "O mercado brasileiro de doces movimenta bilhões, com crescimento constante no delivery e compras online."
  },
  {
    icon: Award,
    title: "Produtos Campeões",
    description: "Pudim, bolo em porção e brigadeiros lideram as vendas no delivery, oferecendo alta demanda e boa margem de lucro."
  },
  {
    icon: DollarSign,
    title: "Baixo Investimento Inicial",
    description: "Comece produzindo em casa com equipamentos básicos e escale conforme a demanda, reduzindo riscos financeiros."
  }
];

const niches = [
    { title: "Doces Tradicionais", description: "Pudins, bolos de festa, brigadeiros." },
    { title: "Linha Diet & Fit", description: "Opções sem açúcar, low carb, com adoçantes naturais." },
    { title: "Doces Veganos", description: "Alternativas sem leite e ovos para um público crescente." },
    { title: "Gourmet Premium", description: "Ingredientes nobres e apresentação sofisticada." },
    { title: "Sobremesas Funcionais", description: "Com proteína, probióticos ou benefícios à saúde." },
];

const marketingStrategies = [
    { title: "Diferencial Único", description: "Sabores exclusivos, embalagens personalizadas ou a história por trás da receita." },
    { title: "Domínio das Redes Sociais", description: "Use Instagram e TikTok para mostrar os bastidores, depoimentos e criar conexão." },
    { title: "Parcerias Estratégicas", description: "Colabore com microinfluenciadores locais para divulgação e aumento de reconhecimento." },
    { title: "Promoções Inteligentes", description: "Crie combos, descontos e programas de fidelidade para gerar urgência e vendas recorrentes." },
];

const commonErrors = [
    {
        title: "Erro #1: Precificação Irreal",
        problem: "Calcular apenas o custo dos ingredientes, esquecendo embalagem, tempo, energia e taxas. Resultado: prejuízo mesmo vendendo muito.",
        solution: "Use planilhas completas com TODOS os custos. Lembre-se: preço baixo não é vantagem se você não lucra!"
    },
    {
        title: "Erro #2: Negligenciar Embalagem e Entrega",
        problem: "Produto excelente que chega amassado, derretido ou com apresentação ruim. Isso gera avaliações negativas e perda de clientes.",
        solution: "Invista em embalagens adequadas e teste o transporte. Uma entrega perfeita gera marketing gratuito nas redes sociais do cliente."
    },
    {
        title: "Erro #3: Marketing Inexistente",
        problem: "Contar apenas com indicações e não investir em presença digital consistente. Resultado: invisibilidade no mercado.",
        solution: "Dedique tempo diário às redes sociais. Crie um calendário de conteúdo e seja consistente, mesmo quando as vendas estiverem boas."
    }
]

export default function VendasDigitaisPage() {
  return (
    <AppLayout>
      <div className="flex-1 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            
            <header className="text-center mb-16 pt-16">
              <p className="text-primary font-semibold tracking-wider mb-2">FASE 03: CURSO PRÁTICO</p>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Como Vender Sobremesas Online</h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Transforme sua paixão por doces em um negócio lucrativo com estratégias práticas para conquistar clientes no ambiente digital.
              </p>
            </header>

            <main className="space-y-20">
              
              <section>
                <h2 className="text-3xl font-bold mb-4 text-center">Por que vender sobremesas online funciona?</h2>
                <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                  O momento é ideal para empreendedores que querem aproveitar o boom do comércio digital. Com as ferramentas certas, é possível construir um negócio rentável e sustentável.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {whyOnlineBenefits.map(card => (
                    <Card key={card.title} className="text-center p-6 bg-secondary/5 border-border/20 hover:border-primary/50 hover:shadow-lg transition-all">
                        <div className="flex justify-center mb-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <card.icon className="h-8 w-8 text-primary" />
                            </div>
                        </div>
                        <CardTitle className="text-xl mb-2 text-white">{card.title}</CardTitle>
                        <CardContent className="p-0 text-muted-foreground text-sm">
                            {card.description}
                        </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <section className="bg-secondary/10 p-8 md:p-12 rounded-3xl border border-border/10">
                <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3"><ClipboardList className="h-8 w-8" />Passo 1: Escolha seu Nicho e Produto</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {niches.map(niche => (
                        <Card key={niche.title} className="p-4 bg-black/20 border-border/20">
                            <CardTitle className="text-lg font-semibold text-white mb-2">{niche.title}</CardTitle>
                            <CardContent className="p-0 text-sm text-muted-foreground">{niche.description}</CardContent>
                        </Card>
                    ))}
                </div>
                 <div className="bg-primary/10 border-l-4 border-primary p-5 rounded-r-lg text-center">
                    <p className="font-semibold text-primary-foreground/90">
                        <Lightbulb className="inline-block h-5 w-5 mr-2" /> Use o Google Trends para pesquisar a demanda por "pudim delivery" ou "bolo de pote" na sua região e valide seu produto carro-chefe.
                    </p>
                </div>
              </section>
              
              <section>
                <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3"><Calculator className="h-8 w-8" />Passo 2: Planejamento Financeiro e Preços</h2>
                <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">Nunca precifique pensando apenas nos ingredientes! A fórmula básica é Custo Total × 3 = Preço de Venda, mas considere também o valor percebido pelo cliente.</p>
                <Card className="bg-destructive/10 border-destructive/30 p-6">
                    <CardHeader className="p-0 mb-4 flex-row items-center gap-3">
                         <XCircle className="h-6 w-6 text-destructive" />
                         <CardTitle className="text-destructive/90">Erro Fatal na Precificação</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 text-destructive/80 text-sm">
                        Muitos empreendedores falham por esquecer de incluir no custo: **seu tempo de produção, embalagens, gás/energia e taxas de plataformas digitais**. Isso leva a prejuízos mesmo vendendo muito.
                    </CardContent>
                </Card>
              </section>

              <section className="bg-secondary/10 p-8 md:p-12 rounded-3xl border border-border/10">
                <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3"><ShoppingCart className="h-8 w-8" />Passo 3: Sua Loja Virtual</h2>
                <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">As fotos são responsáveis por 80% da decisão de compra online. Use luz natural, fundos neutros e mostre detalhes que despertem desejo.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <Card className="p-6 bg-black/20 border-border/20">
                        <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-white">Plataformas Recomendadas</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 text-muted-foreground text-sm">
                            Nuvemshop e Yampi são ideais para iniciantes. Começar com WhatsApp Business com catálogo digital tem custo zero.
                        </CardContent>
                    </Card>
                     <Card className="p-6 bg-black/20 border-border/20">
                        <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-white">Descrição Apetitosa</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 text-muted-foreground text-sm">
                           Descreva sabores, texturas, peso e diferenciais. Ex: "Pudim cremoso (400g) com calda artesanal. Serve 4 pessoas."
                        </CardContent>
                    </Card>
                </div>
              </section>
              
              <section>
                <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3"><Megaphone className="h-8 w-8" />Passo 4: Marketing Digital e Diferencial</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {marketingStrategies.map(item => (
                        <Card key={item.title} className="p-6 bg-secondary/5 border-border/20">
                            <CardHeader className="p-0 mb-3">
                                <CardTitle className="text-lg text-white">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 text-sm text-muted-foreground">
                                {item.description}
                            </CardContent>
                        </Card>
                    ))}
                </div>
              </section>

              <section className="bg-secondary/10 p-8 md:p-12 rounded-3xl border border-border/10">
                <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3"><Truck className="h-8 w-8" />Passo 5: Logística e Entrega de Qualidade</h2>
                <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">A embalagem é a primeira impressão física do seu produto. Ela deve proteger, preservar e encantar.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center gap-3">
                        <h3 className="font-semibold text-lg text-white">Defina sua Área</h3>
                        <p className="text-muted-foreground text-sm">Comece com um raio de entrega próximo (3-5 km) para garantir agilidade e expanda gradualmente.</p>
                    </div>
                     <div className="flex flex-col items-center text-center gap-3">
                        <h3 className="font-semibold text-lg text-white">Prazos Realistas</h3>
                        <p className="text-muted-foreground text-sm">Seja transparente sobre o tempo de preparo e as janelas de entrega. É melhor surpreender do que atrasar.</p>
                    </div>
                     <div className="flex flex-col items-center text-center gap-3">
                        <h3 className="font-semibold text-lg text-white">Teste Suas Embalagens</h3>
                        <p className="text-muted-foreground text-sm">Simule o transporte antes de vender. Verifique se o produto chega intacto e com boa apresentação.</p>
                    </div>
                </div>
              </section>
              
               <section>
                <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3"><XCircle className="h-8 w-8" />Erros Comuns e Como Evitar</h2>
                 <div className="space-y-6">
                    {commonErrors.map(item => (
                        <Card key={item.title} className="bg-secondary/5 border-border/20">
                            <CardHeader>
                                <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <p><span className="font-semibold text-primary">O Problema:</span> <span className="text-muted-foreground">{item.problem}</span></p>
                                <p><span className="font-semibold text-green-400">A Solução:</span> <span className="text-white/80">{item.solution}</span></p>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
              </section>
              
              <Separator className="bg-border/20"/>

              <section>
                 <h2 className="text-3xl font-bold mb-4 text-center">Conclusão: Comece Hoje!</h2>
                 <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                    Não precisa ter tudo perfeito para começar, mas precisa ter planejamento. O melhor momento para começar é agora.
                </p>
                <Card className="p-8 bg-secondary/5 border-border/20">
                    <CardTitle className="text-xl mb-6 text-center text-white">Seu Plano de Ação Imediato</CardTitle>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <h3 className="font-semibold text-lg text-primary mb-2">Esta Semana</h3>
                            <p className="text-sm text-muted-foreground">Defina seu produto carro-chefe, calcule os custos e crie seu perfil no Instagram e WhatsApp Business.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-primary mb-2">Próximos 7 Dias</h3>
                            <p className="text-sm text-muted-foreground">Tire fotos profissionais dos produtos e comece a divulgar para amigos e familiares para conseguir os primeiros feedbacks.</p>
                        </div>
                         <div>
                            <h3 className="font-semibold text-lg text-primary mb-2">Primeiro Mês</h3>
                            <p className="text-sm text-muted-foreground">Faça as primeiras vendas, peça avaliações, ajuste processos e comece a testar parcerias com microinfluenciadores.</p>
                        </div>
                    </div>
                </Card>
              </section>

            </main>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
