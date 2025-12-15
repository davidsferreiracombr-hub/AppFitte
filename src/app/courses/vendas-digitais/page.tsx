
'use client';

import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Award, DollarSign, ClipboardList, Calculator, ShoppingCart, Megaphone, Truck, XCircle, CheckCircle, Lightbulb, UserCheck, Tv, Smartphone, Smile } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const whyOnlineBenefits = [
  {
    icon: TrendingUp,
    title: "Mercado em Expansão",
    description: "O mercado brasileiro de sobremesas movimenta bilhões, com crescimento constante no delivery e compras online."
  },
  {
    icon: Award,
    title: "Produtos Campeões",
    description: "Pudim, bolo em porção и brigadeiros lideram as vendas no delivery, oferecendo alta demanda e boa margem de lucro."
  },
  {
    icon: DollarSign,
    title: "Baixo Investimento Inicial",
    description: "Comece produzindo em casa com equipamentos básicos e escale conforme a demanda, reduzindo riscos financeiros."
  }
];

const niches = [
    { title: "Sobremesas Artesanais Tradicionais", description: "Pudins caseiros, bolos de festa, brigadeiros clássicos." },
    { title: "Sobremesas Diet & Fit", description: "Opções sem açúcar, low carb, com adoçantes naturais." },
    { title: "Sobremesas Veganas", description: "Crescimento exponencial de consumidores buscando alternativas sem leite e ovos." },
    { title: "Linha Gourmet Premium", description: "Ingredientes nobres, apresentação sofisticada, embalagens diferenciadas." },
    { title: "Sobremesas Funcionais", description: "Com proteína, probióticos ou ingredientes que agregam benefícios à saúde." },
];

const marketingStrategies = [
    { title: "Crie um Diferencial Único", description: "Sabores exclusivos (ex: brigadeiro de pistache com flor de sal), embalagens personalizadas e instagramáveis, combos temáticos ou até a história por trás da receita da vovó." },
    { title: "Domine as Redes Sociais", description: "Instagram e TikTok são suas vitrines principais. Mostre o processo de produção (os bastidores vendem!), publique depoimentos de clientes satisfeitos e crie conexão com a audiência." },
    { title: "Parcerias Estratégicas", description: "Identifique microinfluenciadores locais (5-20 mil seguidores) do seu nicho. Ofereça produtos em troca de divulgação. Uma parceria bem feita pode gerar dezenas de pedidos imediatos." },
    { title: "Promoções Inteligentes", description: "Lance combos promocionais, descontos para primeira compra, programa de fidelidade (a cada 5 compras, ganhe 10% off) e ofertas relâmpago nos stories para gerar urgência." },
];

const commonErrors = [
    {
        title: "Erro #1: Precificação Irreal",
        problem: "Calcular apenas o custo dos ingredientes e esquecer embalagem, tempo, energia e taxas. Resultado: vender muito e ter prejuízo.",
        solution: "Use planilhas completas com TODOS os custos. Revise seus preços trimestralmente considerando inflação e feedback do mercado. Lembre-se: preço baixo não é vantagem se você não lucra!"
    },
    {
        title: "Erro #2: Negligenciar Embalagem e Entrega",
        problem: "Produto excelente que chega amassado, derretido ou com apresentação ruim. Isso gera avaliações negativas e perda de clientes.",
        solution: "Invista em embalagens adequadas mesmo que custem um pouco mais. Teste tudo antes! Uma entrega perfeita gera foto no Instagram do cliente = propaganda gratuita."
    },
    {
        title: "Erro #3: Marketing Inexistente ou Inconsistente",
        problem: "Contar apenas com indicações boca a boca e não investir em presença digital. Ficar invisível em um mercado competitivo.",
        solution: "Dedique pelo menos 30 minutos diários às redes sociais. Crie calendário de conteúdo simples. Seja consistente mesmo quando as vendas estão boas - marketing é investimento contínuo, não emergencial."
    }
]

const successCases = [
    {
        icon: Smile,
        title: "Doceria Vegana Explode nas Redes",
        description: "Uma empreendedora focou em brigadeiros veganos exóticos. Com Instagram estratégico e parcerias com influencers, cresceu 300% em 6 meses."
    },
    {
        icon: Smartphone,
        title: "WhatsApp e Pudins: Combinação de Sucesso",
        description: "Um negócio familiar apostou em pudins caseiros vendidos pelo WhatsApp. Com atendimento rápido e embalagens marcantes, expandiram para cidades vizinhas."
    },
    {
        icon: Tv,
        title: "Combos para Festas Triplicam Ticket Médio",
        description: "Uma loja virtual criou kits de festa (bolo + docinhos). Com isso, aumentou o ticket médio de R$ 50 para R$ 180 e conquistou clientes corporativos."
    }
];

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
                Transforme sua paixão por sobremesas em um negócio lucrativo com estratégias práticas para conquistar clientes no ambiente digital.
              </p>
            </header>

            <main className="space-y-20">
              
              <section>
                <h2 className="text-3xl font-bold mb-4 text-center">Por que vender sobremesas online funciona?</h2>
                <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                  O momento é ideal para empreendedores que querem aproveitar o boom do comércio digital. Com as ferramentas certas e estratégia focada, é possível construir um negócio rentável e sustentável vendendo aquilo que você ama fazer.
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
                <p className="text-muted-foreground text-center mb-6 text-lg">Nichos lucrativos para explorar</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                    {niches.map(niche => (
                        <Card key={niche.title} className="p-4 bg-black/20 border-border/20 text-center">
                            <CardTitle className="text-base font-semibold text-white mb-1">{niche.title}</CardTitle>
                            <CardContent className="p-0 text-xs text-muted-foreground">{niche.description}</CardContent>
                        </Card>
                    ))}
                </div>
                <div className='text-center space-y-4 mb-10'>
                    <h3 className='text-xl font-bold text-white'>Defina seu Produto Carro-Chefe</h3>
                    <p className='text-muted-foreground max-w-2xl mx-auto text-sm'>Escolha 1 ou 2 produtos para serem sua especialidade. Isso facilita a produção, reduz custos com ingredientes, cria identidade forte e ajuda na divulgação. Exemplos: "a rainha do pudim de leite condensado" ou "os melhores brownies veganos da cidade".</p>
                </div>
                 <div className="bg-primary/10 border-l-4 border-primary p-5 rounded-r-lg text-center">
                    <p className="font-semibold text-primary-foreground/90">
                        <Lightbulb className="inline-block h-5 w-5 mr-2" /> Use o Google Trends para pesquisar termos como "pudim delivery" ou "bolo de pote" na sua região e valide seu produto carro-chefe.
                    </p>
                </div>
              </section>
              
              <section>
                <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3"><Calculator className="h-8 w-8" />Passo 2: Planejamento Financeiro e Preços</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <Card className="p-6 bg-secondary/5 border-border/20">
                        <CardHeader className="p-0 mb-3"><CardTitle className="text-white text-lg">Calcule Todos os Custos</CardTitle></CardHeader>
                        <CardContent className="p-0 text-muted-foreground text-sm">Liste absolutamente todos os gastos: ingredientes (incluindo perdas e testes), embalagens, etiquetas, gás/energia, taxas de plataformas digitais, custos de entrega e seu próprio tempo de produção.</CardContent>
                    </Card>
                    <Card className="p-6 bg-secondary/5 border-border/20">
                        <CardHeader className="p-0 mb-3"><CardTitle className="text-white text-lg">Precifique com Inteligência</CardTitle></CardHeader>
                        <CardContent className="p-0 text-muted-foreground text-sm">A fórmula básica: Custo Total × 3 = Preço de Venda. Considere também o valor percebido (qualidade, apresentação, exclusividade) e não apenas o preço mais baixo do mercado.</CardContent>
                    </Card>
                </div>
                 <Card className="bg-secondary/10 border-border/20 p-6 mb-8">
                    <CardHeader className="p-0 mb-4"><CardTitle className="text-white text-center text-lg">Exemplo Prático de Precificação</CardTitle></CardHeader>
                    <CardContent className="p-0 text-sm text-muted-foreground grid grid-cols-2 gap-x-4 gap-y-2">
                        <p>Ingredientes de um bolo: <span className='text-white font-semibold'>R$ 15,00</span></p>
                        <p>Embalagem: <span className='text-white font-semibold'>R$ 3,00</span></p>
                        <p>Energia/gás: <span className='text-white font-semibold'>R$ 2,00</span></p>
                        <p>Taxa de plataforma (10%): <span className='text-white font-semibold'>R$ 4,50</span></p>
                        <p>Seu tempo (2 horas): <span className='text-white font-semibold'>R$ 20,00</span></p>
                        <p className='col-span-2 text-center mt-2 border-t border-border/20 pt-2 font-bold'>Custo Total: <span className='text-white text-base'>R$ 44,50</span></p>
                        <p className='col-span-2 text-center mt-1 font-bold'>Preço Sugerido: <span className='text-primary text-base'>R$ 130-150</span></p>
                    </CardContent>
                </Card>
                <Card className="bg-destructive/10 border-destructive/30 p-6">
                    <CardHeader className="p-0 mb-4 flex-row items-center gap-3">
                         <XCircle className="h-6 w-6 text-destructive" />
                         <CardTitle className="text-destructive/90">Erro Fatal na Precificação</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 text-destructive/80 text-sm">
                        Nunca precifique pensando apenas nos ingredientes! Muitos empreendedores falham por esquecer de incluir tempo, embalagem, energia e taxas no cálculo. Isso leva a prejuízos mesmo vendendo muito.
                    </CardContent>
                </Card>
              </section>

              <section className="bg-secondary/10 p-8 md:p-12 rounded-3xl border border-border/10">
                <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3"><ShoppingCart className="h-8 w-8" />Passo 3: Sua Loja Virtual</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                     <Card className="p-6 bg-black/20 border-border/20">
                        <CardHeader className="p-0 mb-4"><CardTitle className="text-white text-lg">Plataformas Recomendadas</CardTitle></CardHeader>
                        <CardContent className="p-0 text-muted-foreground text-sm">Nuvemshop e Yampi são ideais para iniciantes. Começar com WhatsApp Business com catálogo digital tem custo zero.</CardContent>
                    </Card>
                     <Card className="p-6 bg-black/20 border-border/20">
                        <CardHeader className="p-0 mb-4"><CardTitle className="text-white text-lg">Meios de Pagamento</CardTitle></CardHeader>
                        <CardContent className="p-0 text-muted-foreground text-sm">Integre Pix e cartões via Mercado Pago ou PagSeguro. Oferecer parcelamento aumenta o ticket médio.</CardContent>
                    </Card>
                     <Card className="p-6 bg-black/20 border-border/20">
                        <CardHeader className="p-0 mb-4"><CardTitle className="text-white text-lg">Opções de Entrega</CardTitle></CardHeader>
                        <CardContent className="p-0 text-muted-foreground text-sm">Defina claramente: retirada no local, entrega própria ou apps de delivery (iFood, Rappi). Comece com o mais simples.</CardContent>
                    </Card>
                </div>
                <Card className="p-6 bg-black/20 border-border/20 mb-8">
                    <CardHeader className="p-0 mb-4"><CardTitle className="text-white text-lg">A Importância das Fotos Profissionais</CardTitle></CardHeader>
                    <CardContent className="p-0 text-muted-foreground text-sm space-y-2">
                        <p>Invista em fotografias de qualidade! As fotos são responsáveis por 80% da decisão de compra online. Use luz natural, fundos neutros e mostre detalhes que despertem desejo.</p>
                        <p className='text-primary-foreground/80'><Lightbulb className="inline-block h-4 w-4 mr-1" /> Dica: Aprenda fotografia básica no YouTube e use seu smartphone. Os resultados podem ser excelentes!</p>
                    </CardContent>
                </Card>
                 <Card className="p-6 bg-black/20 border-border/20">
                    <CardHeader className="p-0 mb-4"><CardTitle className="text-white text-lg">Descrição Apetitosa dos Produtos</CardTitle></CardHeader>
                    <CardContent className="p-0 text-muted-foreground text-sm">Seja clara e apetitosa! Descreva sabores, textura, peso e diferenciais. Ex: "Pudim cremoso (400g) com calda artesanal. Serve 4 pessoas. Entrega em pote resistente."</CardContent>
                </Card>
              </section>
              
              <section>
                <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3"><Megaphone className="h-8 w-8" />Passo 4: Diferencial e Marketing Digital</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {marketingStrategies.map(item => (
                        <Card key={item.title} className="p-6 bg-secondary/5 border-border/20">
                            <CardHeader className="p-0 mb-3"><CardTitle className="text-lg text-white">{item.title}</CardTitle></CardHeader>
                            <CardContent className="p-0 text-sm text-muted-foreground">{item.description}</CardContent>
                        </Card>
                    ))}
                </div>
              </section>

              <section className="bg-secondary/10 p-8 md:p-12 rounded-3xl border border-border/10">
                <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3"><Truck className="h-8 w-8" />Passo 5: Logística e Entrega de Qualidade</h2>
                <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">A embalagem é a primeira impressão física do seu produto. Ela deve proteger, preservar e encantar.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3"><UserCheck className="h-8 w-8" />Casos de Sucesso Reais</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {successCases.map(item => (
                        <Card key={item.title} className="p-6 bg-secondary/5 border-border/20 text-center">
                            <CardHeader className="p-0 mb-3 flex-col items-center gap-3">
                                <div className="bg-primary/10 p-3 rounded-full"><item.icon className="h-6 w-6 text-primary" /></div>
                                <CardTitle className="text-lg text-white">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 text-sm text-muted-foreground">{item.description}</CardContent>
                        </Card>
                    ))}
                </div>
                <div className="bg-primary/10 border-l-4 border-primary p-5 rounded-r-lg text-center">
                    <p className="font-semibold text-primary-foreground/90">O que todos têm em comum? Foco, excelência na execução, marketing consistente e atendimento impecável. Não é preciso ser grande para ser lucrativo.</p>
                </div>
              </section>
              
               <section>
                <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3"><XCircle className="h-8 w-8" />Erros Comuns e Como Evitar</h2>
                 <div className="space-y-6">
                    {commonErrors.map(item => (
                        <Card key={item.title} className="bg-secondary/5 border-border/20">
                            <CardHeader><CardTitle className="text-xl text-white">{item.title}</CardTitle></CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <p><span className="font-semibold text-primary">O Problema:</span> <span className="text-muted-foreground">{item.problem}</span></p>
                                <p><span className="font-semibold text-green-400">A Solução:</span> <span className="text-white/80">{item.solution}</span></p>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
                 <div className="mt-8">
                    <h3 className="font-semibold text-lg text-white mb-3 text-center">Outros erros a evitar:</h3>
                    <ul className="text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 list-disc list-inside max-w-2xl mx-auto">
                        <li>Aceitar encomendas além da sua capacidade</li>
                        <li>Não ter termos claros de cancelamento</li>
                        <li>Ignorar feedback negativo</li>
                        <li>Não separar finanças pessoais e do negócio</li>
                        <li>Copiar concorrentes sem criar identidade</li>
                    </ul>
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
                <div className="mt-10 p-6 bg-secondary/5 border-l-4 border-primary italic text-center rounded-r-xl shadow-sm">
                    <p className="text-lg text-white/90">"O segredo do sucesso não está em ter a receita perfeita, mas em começar com o que você tem e melhorar continuamente."</p>
                </div>
              </section>

            </main>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
