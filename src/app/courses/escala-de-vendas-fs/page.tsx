
'use client';

import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Users, Star, PieChart, Store, Truck, Briefcase, Package, Sparkles, CheckCircle, XCircle, Target, BookOpen, UserCheck, TrendingUp, Lightbulb } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const marketBenefits = [
  { icon: BarChart, title: "Mercado anual", description: "O setor de food service brasileiro movimenta valores expressivos com crescimento contínuo." },
  { icon: Users, title: "Consumidores ativos", description: "Um em cada quatro brasileiros faz pelo menos uma refeição fora de casa diariamente." },
  { icon: Star, title: "Ranking de vendas", description: "Salgados e doces estão entre os produtos mais vendidos com demanda constante." }
];

const sweetProducts = [
  { title: "Brigadeiros Gourmet", description: "Sabores diferenciados para presente. Alto valor agregado, produção em escala, personalização para eventos.", icon: Sparkles },
  { title: "Brownies e Bolos no Pote", description: "Práticos para transportar, longa validade, versatilidade de sabores.", icon: Package },
  { title: "Cookies, Cupcakes e Tortas", description: "Visual chamativo, margem de lucro elevada, ideal para redes sociais.", icon: PieChart }
];

const savoryProducts = [
    { title: "Mini Quiches e Empadas", description: "Versáteis e sofisticadas, múltiplos recheios possíveis, boa conservação e alto valor percebido.", icon: PieChart },
    { title: "Coxinhas e Bolinhos", description: "Clássicos com alta rotatividade, custo de produção baixo e fácil padronização.", icon: Star },
    { title: "Pastéis e Esfihas", description: "Ideais para delivery, custo controlado, grande aceitação e alta margem de lucro.", icon: Sparkles }
];

const businessModels = [
  { icon: Store, title: "Loja Física", description: "Ambiente convidativo, visibilidade constante, relacionamento direto e compras por impulso." },
  { icon: Truck, title: "Delivery", description: "Baixo custo inicial, alcance geográfico ampliado e flexibilidade operacional com apps e redes sociais." },
  { icon: Briefcase, title: "Fornecimento B2B", description: "Produção em escala para buffets e restaurantes, garantindo volume e previsibilidade financeira." }
];

const scaleStrategies = [
    { title: "Embalagens Diferenciadas", description: "Invista em embalagens que valorizam o produto e funcionam como marketing." },
    { title: "Promoções Combinadas", description: "Crie kits doces + salgados para aumentar o ticket médio." },
    { title: "Presença Digital Forte", description: "Use Instagram e WhatsApp para divulgação, atendimento e pedidos." }
];

const commonErrors = [
    {
        icon: XCircle,
        title: "Marketing insuficiente",
        problem: "Não investir em divulgação local e presença digital consistente.",
        solution: "Reserve pelo menos 10% do faturamento para marketing e use redes sociais diariamente."
    },
    {
        icon: XCircle,
        title: "Descontrole financeiro",
        problem: "Falta de controle de custos, desperdício e precificação inadequada.",
        solution: "Use planilhas de controle, calcule o custo real e estabeleça margem de lucro mínima."
    },
    {
        icon: XCircle,
        title: "Qualidade inconsistente",
        problem: "Negligenciar higiene, apresentação e padrão dos produtos, afetando a reputação.",
        solution: "Crie checklists de qualidade, invista em embalagens e mantenha certificações."
    }
];

export default function EscalaVendasFsPage() {
  return (
    <AppLayout>
      <div className="flex-1 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            
            <header className="text-center mb-16 pt-16">
              <p className="text-yellow-400 font-semibold tracking-wider mb-2">FASE 04: CURSO PRÁTICO</p>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Escala de Vendas Físicas</h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Aprenda estratégias comprovadas para transformar sua produção de sobremesas em um negócio escalável e lucrativo.
              </p>
            </header>

            <main className="space-y-20">
              
              <section>
                <h2 className="text-3xl font-bold mb-4 text-center">Por que investir em sobremesas salgadas e doces?</h2>
                 <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                    O mercado de sobremesas oferece oportunidades únicas: baixo investimento inicial, alta rotatividade e a possibilidade de crescer gradualmente.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {marketBenefits.map(card => (
                    <Card key={card.title} className="text-center p-6 bg-secondary/5 border-border/20 hover:border-yellow-400/50 hover:shadow-lg transition-all">
                        <div className="flex justify-center mb-4">
                            <div className="bg-yellow-400/10 p-3 rounded-full">
                                <card.icon className="h-8 w-8 text-yellow-400" />
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
                 <h2 className="text-3xl font-bold mb-4 text-center">Os doces mais vendidos para renda extra e escala</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sweetProducts.map(product => (
                    <Card key={product.title} className="p-6 bg-black/20 border-border/20 text-center">
                        <CardHeader className="p-0 mb-3 flex-col items-center gap-3">
                            <div className="bg-yellow-400/10 p-3 rounded-full">
                                <product.icon className="h-7 w-7 text-yellow-400" />
                            </div>
                            <CardTitle className="text-lg text-white">{product.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 text-muted-foreground text-sm">
                            {product.description}
                        </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

               <section>
                 <h2 className="text-3xl font-bold mb-8 text-center">Sobremesas salgadas que vendem bem e são fáceis de escalar</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {savoryProducts.map(product => (
                        <Card key={product.title} className="p-6 bg-secondary/5 border-border/20 text-center">
                             <CardHeader className="p-0 mb-3 flex-col items-center gap-3">
                                <div className="bg-yellow-400/10 p-3 rounded-full">
                                    <product.icon className="h-7 w-7 text-yellow-400" />
                                </div>
                                <CardTitle className="text-lg text-white">{product.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 text-muted-foreground text-sm">
                                {product.description}
                            </CardContent>
                        </Card>
                    ))}
                 </div>
              </section>

              <section className="bg-secondary/10 p-8 md:p-12 rounded-3xl border border-border/10">
                <h2 className="text-3xl font-bold mb-8 text-center">Modelos de negócio para escalar vendas físicas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {businessModels.map(model => (
                    <div key={model.title} className="flex flex-col items-center text-center">
                        <div className="bg-black/30 p-4 rounded-full mb-4 shadow-sm border border-border/10">
                            <model.icon className="h-8 w-8 text-yellow-400" />
                        </div>
                        <h3 className="font-semibold text-xl text-white">{model.title}</h3>
                        <p className="text-muted-foreground text-sm mt-2">{model.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-8 text-center">Estratégias práticas para aumentar vendas e escala</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {scaleStrategies.map(strategy => (
                         <Card key={strategy.title} className="p-6 bg-secondary/5 border-border/20">
                            <CardTitle className="text-lg text-white mb-2">{strategy.title}</CardTitle>
                            <CardContent className="p-0 text-sm text-muted-foreground">{strategy.description}</CardContent>
                        </Card>
                    ))}
                 </div>
                  <div className="mt-10 bg-yellow-400/10 border-l-4 border-yellow-400 p-5 rounded-r-lg text-center">
                    <p className="font-semibold text-white/90"><Lightbulb className="inline-block h-5 w-5 mr-2 text-yellow-400" />
                       Dicas adicionais: Programas de fidelidade, Parcerias locais, Eventos e degustações, e usar Avaliações de clientes.
                    </p>
                </div>
              </section>
              
              <section className="bg-secondary/10 p-8 md:p-12 rounded-3xl border border-border/10">
                <h2 className="text-3xl font-bold mb-8 text-center">Controle de custos e qualidade para manter lucro na escala</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    <Card className="p-6 bg-black/20 border-border/20">
                      <CardHeader className="p-0 mb-2"><CardTitle className="text-white">Fornecedores Estratégicos</CardTitle></CardHeader>
                      <CardContent className="p-0 text-sm text-muted-foreground"><p>Parcerias para compras em atacado reduzem custos.</p></CardContent>
                    </Card>
                    <Card className="p-6 bg-black/20 border-border/20">
                      <CardHeader className="p-0 mb-2"><CardTitle className="text-white">Padronização de Receitas</CardTitle></CardHeader>
                      <CardContent className="p-0 text-sm text-muted-foreground"><p>Documente medidas exatas para garantir consistência.</p></CardContent>
                    </Card>
                    <Card className="p-6 bg-black/20 border-border/20">
                      <CardHeader className="p-0 mb-2"><CardTitle className="text-white">Treinamento da Equipe</CardTitle></CardHeader>
                      <CardContent className="p-0 text-sm text-muted-foreground"><p>Capacite para produção eficiente e atendimento de qualidade.</p></CardContent>
                    </Card>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6 bg-black/20 border-border/20">
                        <CardTitle className="mb-2 text-white">Controle de Estoque</CardTitle>
                        <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                            <li>Inventário semanal</li>
                            <li>Sistema FIFO (primeiro que entra, primeiro que sai)</li>
                            <li>Compras planejadas</li>
                        </ul>
                    </Card>
                    <Card className="p-6 bg-black/20 border-border/20">
                        <CardTitle className="mb-2 text-white">Indicadores Essenciais</CardTitle>
                        <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                            <li>Custo por unidade produzida</li>
                            <li>Margem de lucro por produto</li>
                            <li>Taxa de desperdício</li>
                        </ul>
                    </Card>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-8 text-center">Exemplos reais de sucesso no mercado</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6 bg-secondary/5 border-border/20 text-center">
                        <Sparkles className="mx-auto h-8 w-8 text-yellow-400 mb-2" />
                        <CardTitle className="text-white">Docerias Gourmet em Alta</CardTitle>
                        <CardContent className="mt-2 text-sm text-muted-foreground p-0">Faturamentos superiores a R$30 mil/mês começando da própria cozinha.</CardContent>
                    </Card>
                    <Card className="p-6 bg-secondary/5 border-border/20 text-center">
                        <TrendingUp className="mx-auto h-8 w-8 text-yellow-400 mb-2" />
                        <CardTitle className="text-white">Salgaderias Expandindo</CardTitle>
                        <CardContent className="mt-2 text-sm text-muted-foreground p-0">Multiplicaram receita em menos de um ano com delivery e eventos.</CardContent>
                    </Card>
                    <Card className="p-6 bg-secondary/5 border-border/20 text-center">
                        <Store className="mx-auto h-8 w-8 text-yellow-400 mb-2" />
                        <CardTitle className="text-white">Da Casa ao Ponto Fixo</CardTitle>
                        <CardContent className="mt-2 text-sm text-muted-foreground p-0">Iniciaram em casa e hoje possuem lojas físicas e franquias.</CardContent>
                    </Card>
                </div>
                <div className="p-6 bg-secondary/5 border-l-4 border-yellow-400 italic text-center rounded-r-xl shadow-sm">
                    <p className="text-lg text-white/90">"Comecei fazendo 50 brigadeiros por fim de semana. Hoje produzo mais de 2.000 unidades por semana e tenho três funcionários. O segredo foi manter a qualidade e investir em marketing digital."</p>
                    <p className="text-sm text-muted-foreground mt-2">— Maria Silva, proprietária de doceria em São Paulo</p>
                </div>
              </section>
              
              <section className="bg-secondary/10 p-8 md:p-12 rounded-3xl border border-border/10">
                <h2 className="text-3xl font-bold mb-8 text-center">Erros comuns e como evitá-los</h2>
                <div className="space-y-6">
                    {commonErrors.map(item => (
                        <Card key={item.title} className="bg-destructive/5 border-destructive/20">
                            <CardHeader className="flex flex-row items-center gap-3">
                                <item.icon className="h-6 w-6 text-destructive" />
                                <CardTitle className="text-lg text-destructive/90">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <p><strong className="text-white">Problema:</strong> <span className="text-muted-foreground">{item.problem}</span></p>
                                <p><strong className="text-green-400">Solução:</strong> <span className="text-white/80">{item.solution}</span></p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
              </section>

              <Separator className="bg-border/20"/>

              <section>
                 <h2 className="text-3xl font-bold mb-4 text-center">Conclusão e próximos passos</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center mt-10">
                    <Card className="p-6 bg-secondary/5 border-border/20"><Target className="h-8 w-8 text-yellow-400 mx-auto mb-3" /><h3 className="font-semibold text-lg text-white">Defina seu portfólio</h3><p className="text-muted-foreground text-sm mt-1">Escolha 3 a 5 receitas de sucesso.</p></Card>
                    <Card className="p-6 bg-secondary/5 border-border/20"><BookOpen className="h-8 w-8 text-yellow-400 mx-auto mb-3" /><h3 className="font-semibold text-lg text-white">Escolha seu modelo</h3><p className="text-muted-foreground text-sm mt-1">Adapte ao seu perfil e mercado.</p></Card>
                    <Card className="p-6 bg-secondary/5 border-border/20"><UserCheck className="h-8 w-8 text-yellow-400 mx-auto mb-3" /><h3 className="font-semibold text-lg text-white">Invista em excelência</h3><p className="text-muted-foreground text-sm mt-1">Priorize qualidade e atendimento.</p></Card>
                    <Card className="p-6 bg-secondary/5 border-border/20"><CheckCircle className="h-8 w-8 text-yellow-400 mx-auto mb-3" /><h3 className="font-semibold text-lg text-white">Cresça com segurança</h3><p className="text-muted-foreground text-sm mt-1">Comece pequeno e aprimore processos.</p></Card>
                 </div>
                 <div className="mt-10 p-6 bg-secondary/5 border-l-4 border-yellow-400 italic text-center rounded-r-xl shadow-sm">
                    <p className="text-lg text-white/90">O sucesso na escala de vendas não acontece da noite para o dia. Seja paciente, mantenha o foco na qualidade e construa seu negócio com bases sólidas.</p>
                </div>
              </section>

            </main>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
