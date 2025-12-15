
'use client';

import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Lightbulb, ListChecks, CalendarDays, ShoppingCart, Leaf, Package, Clock, Scale, DollarSign, ArrowRight, BookOpen, Target, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const benefitCards = [
  {
    icon: Scale,
    title: "Reduzir custos",
    description: "Mantenha a qualidade e o sabor das receitas enquanto economiza significativamente no orçamento mensal de alimentação."
  },
  {
    icon: DollarSign,
    title: "Alimentação acessível",
    description: "Torne a alimentação saudável sustentável financeiramente, permitindo que você mantenha hábitos nutritivos a longo prazo."
  },
  {
    icon: Leaf,
    title: "Evitar desperdícios",
    description: "Aproveite melhor os alimentos, reduza o desperdício e contribua para um consumo mais consciente e responsável."
  }
];

const planningTips = [
    {
        icon: ListChecks,
        title: "Liste com inteligência",
        description: "Use a lista de compras do app Fitte para organizar exatamente o que você precisa, evitando compras em excesso."
    },
    {
        icon: CalendarDays,
        title: "Planeje a semana toda",
        description: "Reserve um momento para planejar as refeições da semana, otimizando suas compras e reduzindo custos."
    },
    {
        icon: ShoppingCart,
        title: "Aproveite promoções",
        description: "Fique atento aos folhetos e compre em maior quantidade ingredientes não perecíveis que você usa constantemente."
    }
]

const conservationStats = [
    {
        value: "30%",
        label: "Desperdício médio",
        description: "Das compras de alimentos em domicílios brasileiros"
    },
    {
        value: "R$1000",
        label: "Economia anual",
        description: "Possível por família com armazenamento adequado"
    },
    {
        value: "+7 dias",
        label: "Dias extras",
        description: "De conservação com técnicas corretas de armazenamento"
    }
]

export default function PowerOfEconomyPage() {
  return (
    <AppLayout>
      <div className="flex-1 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            
            <header className="text-center mb-16 pt-16">
              <p className="text-primary font-semibold tracking-wider mb-2">FASE 01: CURSO PRÁTICO</p>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Como Economizar nos Ingredientes</h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Descubra estratégias comprovadas para reduzir seus gastos com alimentação saudável sem comprometer o sabor ou a qualidade nutricional das suas receitas favoritas do Fitte.
              </p>
            </header>

            <main className="space-y-20">
              {/* Por que economizar? */}
              <section>
                <h2 className="text-3xl font-bold mb-4 text-center">Por que economizar nos ingredientes?</h2>
                <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                  Economizar nos ingredientes não significa abrir mão da qualidade ou do sabor. É uma estratégia inteligente para tornar a alimentação saudável mais acessível, desenvolvendo uma relação mais consciente com os alimentos.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {benefitCards.map(card => (
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

              {/* Planejamento é a chave */}
              <section className="bg-secondary/10 p-8 md:p-12 rounded-3xl border border-border/10">
                <h2 className="text-3xl font-bold mb-8 text-center">Planejamento é a Chave</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {planningTips.map(tip => (
                        <div key={tip.title} className="flex flex-col items-center text-center">
                            <div className="bg-black/30 p-3 rounded-full mb-3 shadow-sm border border-border/10">
                                <tip.icon className="h-7 w-7 text-primary" />
                            </div>
                            <h3 className="font-semibold text-lg text-white">{tip.title}</h3>
                            <p className="text-muted-foreground text-sm">{tip.description}</p>
                        </div>
                    ))}
                </div>
                <div className="bg-primary/10 border-l-4 border-primary p-5 rounded-r-lg text-center">
                    <p className="font-semibold text-primary-foreground/90">
                        <Lightbulb className="inline-block h-5 w-5 mr-2" /> Dica Profissional: Dedique 30 minutos no domingo para planejar suas refeições. Esse pequeno investimento de tempo pode economizar até 30% do seu orçamento mensal!
                    </p>
                </div>
              </section>
              
              {/* Seção de Substituições */}
              <section>
                <h2 className="text-3xl font-bold mb-10 text-center">Substituições Inteligentes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="p-6 bg-secondary/5 border-border/20">
                        <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-white">Equivalentes mais baratos</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-3 text-muted-foreground">
                            <p>Troque ingredientes caros por opções nutricionalmente equivalentes, como quinoa por arroz integral, amêndoas por amendoim e salmão por sardinha.</p>
                            <p className="font-mono text-sm text-white/70">Quinoa → Arroz integral<br/>Amêndoas → Amendoim<br/>Salmão → Sardinha</p>
                        </CardContent>
                    </Card>
                     <Card className="p-6 bg-secondary/5 border-border/20">
                        <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-white">Ingredientes Sazonais</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-2 text-muted-foreground">
                            <p>Use frutas e vegetais da estação. São mais baratos, frescos e saborosos. No verão, mangas e tomates. No inverno, laranjas e brócolis.</p>
                             <p>Aproveite sobras: um frango assado pode virar recheio de tapioca, e arroz vira um belo arroz de forno.</p>
                        </CardContent>
                    </Card>
                </div>
              </section>

              {/* Compras Estratégicas */}
              <section>
                <h2 className="text-3xl font-bold mb-10 text-center">Compras Estratégicas no Mercado</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-xl mb-1 text-white">Feiras e Mercados Locais</h3>
                        <p className="text-muted-foreground">Prefira feiras para comprar frutas e vegetais. São mais baratos, frescos e no final da feira os preços caem ainda mais.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-xl mb-1 text-white">Compras a Granel</h3>
                        <p className="text-muted-foreground">Compre grãos, sementes, temperos e cereais a granel. Os preços por quilo são muito mais baixos.</p>
                    </div>
                     <div>
                        <h3 className="font-semibold text-xl mb-1 text-white">Compare e Escolha Marcas Próprias</h3>
                        <p className="text-muted-foreground">Experimente marcas próprias de supermercados. Em muitos casos, a qualidade é equivalente, mas o preço pode ser até 40% menor.</p>
                    </div>
                </div>
                <div className="mt-10 p-6 bg-secondary/5 border-l-4 border-primary italic text-center rounded-r-xl shadow-sm">
                    <p className="text-lg text-white/90">"Economia inteligente não é comprar o mais barato, mas sim obter o melhor custo-benefício."</p>
                </div>
              </section>

               {/* Conservar e Evitar Desperdício */}
              <section className="bg-secondary/10 p-8 md:p-12 rounded-3xl border border-border/10">
                <h2 className="text-3xl font-bold mb-10 text-center">Dicas para Conservar e Evitar Desperdício</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="flex gap-4 items-start">
                        <Package className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-lg text-white">Armazenamento Correto</h3>
                            <p className="text-muted-foreground text-sm">Aprenda a armazenar cada tipo de alimento da forma adequada para que durem mais tempo.</p>
                        </div>
                    </div>
                     <div className="flex gap-4 items-start">
                        <Clock className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-lg text-white">Congele Porções Extras</h3>
                            <p className="text-muted-foreground text-sm">Cozinhe em maior quantidade e congele o excedente em porções individuais. Isso economiza tempo e dinheiro.</p>
                        </div>
                    </div>
                     <div className="flex gap-4 items-start">
                        <CheckCircle className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-lg text-white">Controle de Validade</h3>
                            <p className="text-muted-foreground text-sm">Organize sua geladeira com o método "Primeiro que Entra, Primeiro que Sai" para consumir os alimentos mais antigos primeiro.</p>
                        </div>
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    {conservationStats.map(stat => (
                        <div key={stat.label} className="bg-black/30 p-6 rounded-2xl shadow-sm border border-border/10">
                            <p className="text-4xl font-extrabold text-primary">{stat.value}</p>
                            <p className="font-semibold mt-1 text-white">{stat.label}</p>
                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                        </div>
                    ))}
                 </div>
              </section>

              {/* Exemplo Prático */}
              <section>
                <h2 className="text-3xl font-bold mb-4 text-center">Exemplo Prático: Receita Econômica no Fitte</h2>
                <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                    Vamos analisar uma receita popular e mostrar como economizar significativamente fazendo escolhas inteligentes.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="bg-secondary/5 border-red-500/20">
                        <CardHeader>
                            <CardTitle className="text-red-400">Receita Original: Bowl de Quinoa com Salmão</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-muted-foreground">
                            <p>• Quinoa importada</p>
                            <p>• Salmão fresco</p>
                            <p>• Abacate</p>
                            <p>• Mix de folhas orgânicas</p>
                            <p>• Azeite extra virgem</p>
                            <p>• Tahine</p>
                            <p className="font-bold text-lg text-white pt-2">Custo por porção: R$ 28,00</p>
                        </CardContent>
                    </Card>
                     <Card className="bg-secondary/5 border-green-500/20">
                        <CardHeader>
                            <CardTitle className="text-green-400">Versão Econômica: Bowl de Arroz com Sardinha</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-muted-foreground">
                            <p>• Arroz integral (granel)</p>
                            <p>• Sardinha em conserva</p>
                            <p>• Abóbora assada (sazonal)</p>
                            <p>• Alface e rúcula (feira)</p>
                            <p>• Óleo de girassol</p>
                            <p>• Pasta de amendoim</p>
                             <p className="font-bold text-lg text-white pt-2">Custo por porção: R$ 9,50</p>
                        </CardContent>
                    </Card>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center mt-8">
                    <div className="bg-primary/10 p-6 rounded-2xl shadow-sm border border-border/10">
                        <p className="text-4xl font-extrabold text-primary">66%</p>
                        <p className="font-semibold mt-1 text-white">Economia total</p>
                        <p className="text-xs text-muted-foreground">Por porção, mantendo qualidade nutricional</p>
                    </div>
                     <div className="bg-primary/10 p-6 rounded-2xl shadow-sm border border-border/10">
                        <p className="text-4xl font-extrabold text-primary">R$74</p>
                        <p className="font-semibold mt-1 text-white">Economia mensal</p>
                        <p className="text-xs text-muted-foreground">Fazendo essa receita 4x por mês</p>
                    </div>
                 </div>
              </section>
              
              {/* Benefícios */}
              <section>
                <h2 className="text-3xl font-bold mb-10 text-center">Benefícios de Economizar nos Ingredientes</h2>
                 <div className="space-y-8">
                    <div className="flex gap-5 items-start">
                        <div className="flex-shrink-0 bg-secondary/10 p-3 rounded-full border border-border/10"><DollarSign className="h-6 w-6 text-primary" /></div>
                        <div>
                            <h3 className="font-semibold text-xl text-white">Mais dinheiro disponível</h3>
                            <p className="text-muted-foreground">Com as estratégias certas, você pode economizar entre R$ 300 e R$ 600 por mês. Esse dinheiro extra pode ser direcionado para outras prioridades importantes.</p>
                        </div>
                    </div>
                     <div className="flex gap-5 items-start">
                        <div className="flex-shrink-0 bg-secondary/10 p-3 rounded-full border border-border/10"><CheckCircle className="h-6 w-6 text-primary" /></div>
                        <div>
                            <h3 className="font-semibold text-xl text-white">Alimentação de qualidade</h3>
                            <p className="text-muted-foreground">Economizar não significa comer pior. Você prova que é possível cuidar da saúde sem comprometer o orçamento.</p>
                        </div>
                    </div>
                     <div className="flex gap-5 items-start">
                        <div className="flex-shrink-0 bg-secondary/10 p-3 rounded-full border border-border/10"><Leaf className="h-6 w-6 text-primary" /></div>
                        <div>
                            <h3 className="font-semibold text-xl text-white">Impacto ambiental positivo</h3>
                            <p className="text-muted-foreground">Menos desperdício significa menos lixo produzido. Ao comprar apenas o necessário e aproveitar sobras, você contribui para um planeta mais sustentável.</p>
                        </div>
                    </div>
                </div>
                 <div className="mt-10 p-6 bg-secondary/5 border-l-4 border-primary italic text-center rounded-r-xl shadow-sm">
                    <p className="text-lg text-white/90">"Economizar nos ingredientes é uma forma de empoderamento financeiro. É ganhar em todas as frentes."</p>
                </div>
              </section>
              
              <Separator className="bg-border/20"/>

              {/* Conclusão */}
              <section>
                 <h2 className="text-3xl font-bold mb-4 text-center">Conclusão e Próximos Passos</h2>
                 <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                    Agora você tem as ferramentas para começar a economizar. O segredo está em aplicar consistentemente as estratégias que aprendeu.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <Card className="p-6 bg-secondary/5 border-border/20">
                        <Target className="h-8 w-8 text-primary mx-auto mb-3" />
                        <h3 className="font-semibold text-lg text-white">Comece hoje mesmo</h3>
                        <p className="text-muted-foreground text-sm mt-1">Abra o app Fitte, escolha uma receita e aplique pelo menos três dicas que aprendeu.</p>
                    </Card>
                     <Card className="p-6 bg-secondary/5 border-border/20">
                        <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
                        <h3 className="font-semibold text-lg text-white">Desenvolva seu estilo</h3>
                        <p className="text-muted-foreground text-sm mt-1">Use o planejamento semanal para criar seu próprio sistema econômico de alimentação.</p>
                    </Card>
                     <Card className="p-6 bg-secondary/5 border-border/20">
                        <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                        <h3 className="font-semibold text-lg text-white">Compartilhe conquistas</h3>
                        <p className="text-muted-foreground text-sm mt-1">Use as ferramentas sociais do app para inspirar outros e se motivar com a comunidade.</p>
                    </Card>
                </div>
              </section>

              {/* Recursos Adicionais */}
               <section className="bg-secondary/10 p-8 md:p-12 rounded-3xl border border-border/10">
                <h2 className="text-3xl font-bold mb-8 text-center">Recursos Adicionais no Fitte</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-2xl mx-auto">
                    <li className="flex items-center gap-3"><ArrowRight className="h-5 w-5 text-primary"/> Guia de substituições de ingredientes</li>
                    <li className="flex items-center gap-3"><ArrowRight className="h-5 w-5 text-primary"/> Calculadora de economia mensal</li>
                    <li className="flex items-center gap-3"><ArrowRight className="h-5 w-5 text-primary"/> Comunidade de usuários econômicos</li>
                    <li className="flex items-center gap-3"><ArrowRight className="h-5 w-5 text-primary"/> Receitas da semana com ingredientes em promoção</li>
                    <li className="flex items-center gap-3"><ArrowRight className="h-5 w-5 text-primary"/> Dicas semanais de economia por email</li>
                </ul>
                <div className="mt-10 text-center">
                    <p className="text-xl font-bold text-white">Sua jornada de economia começa agora!</p>
                    <p className="text-muted-foreground">Pequenas mudanças consistentes geram grandes resultados.</p>
                </div>
               </section>

            </main>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
