
'use client';

import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Users, BarChart2, Zap, Smile, UserCheck, Search, MessageSquare, Hand, Handshake, ThumbsDown, DollarSign, Gift, Star, Target, CheckCircle, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const whySellBenefits = [
  {
    icon: BarChart2,
    title: "Aumento do Ticket Médio",
    description: "Sobremesas elevam o valor médio das compras e incentivam vendas adicionais, especialmente com técnicas de cross-selling."
  },
  {
    icon: Users,
    title: "Fidelização Natural",
    description: "Doces bem apresentados criam experiências emocionais que transformam compradores ocasionais em clientes fiéis."
  },
  {
    icon: Handshake,
    title: "Conexão Pessoal",
    description: "A venda presencial permite estabelecer vínculos de confiança, entender necessidades e criar relacionamentos duradouros."
  }
];

const mentalTriggers = [
    {
        icon: Zap,
        title: "Escassez",
        description: `"Preparei apenas 5 unidades deste bolo hoje — quando acabar, só na semana que vem!"`
    },
    {
        icon: Star,
        title: "Prova Social",
        description: `"Este pudim é o favorito dos meus clientes há 3 anos, muitos encomendam semanalmente."`
    },
    {
        icon: Gift,
        title: "Exclusividade",
        description: `"Receita secreta de família, transmitida por três gerações."`
    }
];

const objectionsStrategies = [
    {
        title: '"Está muito caro"',
        strategy: "Divida o valor por porção, compare com produtos industrializados e enfatize ingredientes premium. Ofereça degustação para o sabor justificar o preço.",
        example: `"Comparado ao valor de um café por dia, este bolo artesanal serve 10 pessoas com qualidade incomparável. Que tal experimentar um pedacinho?"`
    },
    {
        title: '"Preciso pensar"',
        strategy: "Identifique a real objeção oculta fazendo perguntas. Ofereça informações adicionais e crie senso de urgência sem pressão.",
        example: `"Claro! Há algo específico que gostaria de saber melhor? Só menciono que estas unidades foram feitas hoje e amanhã já terão um dia a menos de frescor."`
    },
    {
        title: '"Não sei se vai agradar"',
        strategy: "Reduza o risco com garantias, degustações ou opções menores para teste. Compartilhe depoimentos de outros clientes satisfeitos.",
        example: `"Ofereço uma pequena porção para você experimentar agora mesmo. Se não gostar, não leva. Mas garanto que este é o pudim mais elogiado!"`
    }
]

export default function OlhoNoOlhoPage() {
  return (
    <AppLayout>
      <div className="flex-1 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            
            <header className="text-center mb-16 pt-16">
              <p className="text-primary font-semibold tracking-wider mb-2">FASE 02: CURSO PRÁTICO</p>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Como Vender Sobremesas Pessoalmente</h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Aprenda as melhores técnicas de venda e comunicação corporal para conquistar clientes e transformar cada interação em uma experiência memorável.
              </p>
            </header>

            <main className="space-y-20">
              
              <section>
                <h2 className="text-3xl font-bold mb-4 text-center">Por que vender pessoalmente é uma oportunidade doce?</h2>
                <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                  Diferentemente de produtos industrializados, sobremesas caseiras despertam emoções, memórias afetivas e conexões profundas com os clientes. Você não está apenas oferecendo um produto — está proporcionando um momento de prazer.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {whySellBenefits.map(card => (
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
                <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3"><Search className="h-8 w-8" />Técnica 1: Conheça seu cliente</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 text-center">
                    <div>
                        <h3 className="font-semibold text-lg text-white mb-2">Rapport Inicial</h3>
                        <p className="text-muted-foreground text-sm">Cumprimente com cordialidade, apresente-se e crie um ambiente acolhedor.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-white mb-2">Perguntas Estratégicas</h3>
                        <p className="text-muted-foreground text-sm">"É para uma celebração especial? Você tem alguma restrição alimentar?"</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-white mb-2">Técnica SPIN</h3>
                        <p className="text-muted-foreground text-sm">Situação, Problema, Implicação e Necessidade para descobrir desejos profundos.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-white mb-2">Recomendação Personalizada</h3>
                        <p className="text-muted-foreground text-sm">Sugira produtos que atendam perfeitamente às necessidades identificadas.</p>
                    </div>
                </div>
                <div className="bg-primary/10 border-l-4 border-primary p-5 rounded-r-lg text-center">
                    <p className="font-semibold text-primary-foreground/90">
                        <Lightbulb className="inline-block h-5 w-5 mr-2" /> A técnica SPIN transforma você de vendedor em consultor confiável, demonstrando interesse genuíno.
                    </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3"><MessageSquare className="h-8 w-8" />Técnica 2: Apresente os benefícios</h2>
                <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                    Clientes não compram produtos — eles compram transformações, experiências e soluções. Um bolo não é apenas farinha e ovos; é a alegria de uma celebração.
                </p>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {mentalTriggers.map(trigger => (
                        <div key={trigger.title} className="flex flex-col items-center text-center">
                            <div className="bg-black/30 p-3 rounded-full mb-3 shadow-sm border border-border/10">
                                <trigger.icon className="h-7 w-7 text-primary" />
                            </div>
                            <h3 className="font-semibold text-lg text-white">{trigger.title}</h3>
                            <p className="text-muted-foreground text-sm italic">{trigger.description}</p>
                        </div>
                    ))}
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="p-6 bg-secondary/5 border-border/20">
                        <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-white">Destaque Diferenciais Únicos</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 text-muted-foreground text-sm">
                            Enfatize sabor caseiro autêntico, ingredientes frescos e selecionados, e técnicas artesanais.
                        </CardContent>
                    </Card>
                     <Card className="p-6 bg-secondary/5 border-border/20">
                        <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-white">Conte a História do Produto</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 text-muted-foreground text-sm">
                           Compartilhe a origem da receita, o cuidado na preparação e os ingredientes especiais.
                        </CardContent>
                    </Card>
                </div>
              </section>

              <section className="bg-secondary/10 p-8 md:p-12 rounded-3xl border border-border/10">
                <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3"><Hand className="h-8 w-8" />Técnica 3: Gestos corporais que vendem</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="flex gap-4 items-start">
                        <Smile className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-lg text-white">Sorriso Genuíno e Contato Visual</h3>
                            <p className="text-muted-foreground text-sm">Um sorriso autêntico ativa confiança. Contato visual demonstra interesse genuíno e cria empatia.</p>
                        </div>
                    </div>
                     <div className="flex gap-4 items-start">
                        <UserCheck className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-lg text-white">Postura Ereta e Aberta</h3>
                            <p className="text-muted-foreground text-sm">Mantenha-se ereto com ombros para trás, evitando braços cruzados. Transmite confiança e profissionalismo.</p>
                        </div>
                    </div>
                     <div className="flex gap-4 items-start">
                        <Hand className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-lg text-white">Gestos Expressivos com as Mãos</h3>
                            <p className="text-muted-foreground text-sm">Use as mãos para mostrar o produto, enfatizando textura, tamanho e qualidade. Reforça sua mensagem verbal.</p>
                        </div>
                    </div>
                     <div className="flex gap-4 items-start">
                        <ArrowRight className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-lg text-white">Inclinação Leve para Frente</h3>
                            <p className="text-muted-foreground text-sm">Ao falar ou ouvir, incline-se levemente. Este gesto demonstra engajamento e cria intimidade positiva.</p>
                        </div>
                    </div>
                </div>
                 <Card className="p-6 bg-destructive/10 border-destructive/30">
                    <CardHeader className="p-0 mb-4 flex-row items-center gap-3">
                         <ThumbsDown className="h-6 w-6 text-destructive" />
                         <CardTitle className="text-destructive/90">Gestos que Devem Ser Evitados</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 text-destructive/80 text-sm grid grid-cols-2 gap-x-4 gap-y-1">
                        <li>Braços cruzados (defensivo)</li>
                        <li>Mãos nos bolsos (desinteresse)</li>
                        <li>Olhar para o celular (desrespeito)</li>
                        <li>Movimentos agitados (nervosismo)</li>
                    </CardContent>
                </Card>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-3"><DollarSign className="h-8 w-8" />Técnica 4: Lidar com objeções e fechar a venda</h2>
                <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                    Objeções são oportunidades disfarçadas! Quando um cliente manifesta dúvidas, ele está demonstrando interesse e buscando razões para justificar a compra.
                </p>
                 <div className="space-y-6">
                    {objectionsStrategies.map(item => (
                        <Card key={item.title} className="bg-secondary/5 border-border/20">
                            <CardHeader>
                                <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <p><span className="font-semibold text-primary">Estratégia:</span> <span className="text-muted-foreground">{item.strategy}</span></p>
                                <p className="italic text-white/70"><span className="font-semibold text-primary">Exemplo:</span> {item.example}</p>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
                 <div className="mt-10 bg-primary/10 border-l-4 border-primary p-5 rounded-r-lg text-center">
                    <p className="font-semibold text-primary-foreground/90">
                        <Lightbulb className="inline-block h-5 w-5 mr-2" /> Dica Profissional: A degustação é sua arma secreta! Um cliente que prova um produto de qualidade tem 5x mais chances de comprar.
                    </p>
                </div>
              </section>

              <Separator className="bg-border/20"/>
              
              <section>
                 <h2 className="text-3xl font-bold mb-4 text-center">Conclusão: Transforme sua venda em uma experiência</h2>
                 <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                    Vender sobremesas é sobre criar momentos especiais e construir relacionamentos. Combine técnica e autenticidade, invista na experiência completa e pratique consistentemente para alcançar a maestria.
                </p>
                <Card className="p-8 bg-secondary/5 border-border/20">
                    <CardTitle className="text-xl mb-6 text-center text-white">Seu Plano de Ação Imediato</CardTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-lg text-primary mb-3">Esta Semana:</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                                <li>Pratique seu sorriso e contato visual no espelho.</li>
                                <li>Prepare 3 perguntas SPIN para seus clientes.</li>
                                <li>Revise suas embalagens e melhore a apresentação.</li>
                                <li>Prepare amostras para degustação.</li>
                                <li>Crie seu primeiro combo promocional.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-primary mb-3">Este Mês:</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                                <li>Aplique todas as técnicas em pelo menos 50 vendas.</li>
                                <li>Colete 10 depoimentos de clientes satisfeitos.</li>
                                <li>Analise quais técnicas geraram mais resultados.</li>
                                <li>Ajuste sua abordagem baseado nos aprendizados.</li>
                                <li>Estabeleça metas de crescimento para o próximo mês.</li>
                            </ul>
                        </div>
                    </div>
                </Card>
                 <div className="mt-10 p-6 bg-secondary/5 border-l-4 border-primary italic text-center rounded-r-xl shadow-sm">
                    <p className="text-lg text-white/90">"O sucesso não é sobre fazer produtos deliciosos — é sobre fazer cada cliente se sentir especial, valorizado e ansioso para voltar."</p>
                </div>
              </section>

            </main>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
