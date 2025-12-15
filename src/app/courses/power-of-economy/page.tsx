
'use client';

import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Lightbulb, BarChart3, ListChecks, CalendarDays, ShoppingCart, Leaf, Trash2, Package, Clock, Scale, DollarSign } from 'lucide-react';

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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto">
            
            <header className="text-center mb-16">
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
                  Economizar é uma estratégia inteligente para tornar a alimentação saudável mais acessível e sustentável. Você cuida do seu bolso e desenvolve uma relação mais consciente com os alimentos.
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

              {/* Substituições Inteligentes */}
              <section>
                 <h2 className="text-3xl font-bold mb-10 text-center">Substituições Inteligentes</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="p-6 bg-secondary/5 border-border/20">
                        <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-white">Equivalentes mais baratos</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-2 text-muted-foreground">
                            <p>Troque ingredientes caros por opções nutricionalmente equivalentes, como quinoa por arroz integral, amêndoas por amendoim e salmão por sardinha.</p>
                        </CardContent>
                    </Card>
                     <Card className="p-6 bg-secondary/5 border-border/20">
                        <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-white">Ingredientes Sazonais</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-2 text-muted-foreground">
                            <p>Use frutas e vegetais da estação. São mais baratos, frescos e saborosos. No verão, mangas e tomates. No inverno, laranjas e brócolis.</p>
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

            </main>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
