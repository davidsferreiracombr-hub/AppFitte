
'use client';

import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Users, Star, PieChart, Store, Truck, Briefcase, Package, Sparkles, CheckCircle, XCircle, Target, BookOpen, UserCheck, TrendingUp, Lightbulb, Wallet, ShoppingCart, Percent, BarChart2, DollarSign, Award, ClipboardList, Calculator, Megaphone, Smartphone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const marketStats = [
  { icon: BarChart, title: "Movimentação Anual", description: "Volume total do setor de salgados e doces no Brasil segundo IBGE." },
  { icon: Users, title: "Consumo Diário", description: "Brasileiros que fazem pelo menos uma refeição fora de casa todo dia." },
];

const businessModels = [
  { icon: Smartphone, title: "Delivery via apps", description: "Alcance imediato com comissões variáveis." },
  { icon: Store, title: "Loja virtual própria", description: "Controle total e relacionamento direto." },
  { icon: Package, title: "Assinaturas mensais", description: "Receita recorrente e previsível." },
  { icon: Briefcase, title: "Fornecimento B2B", description: "Contratos fixos com estabelecimentos." },
];

const productChoices = [
    { title: "Doces Gourmet", description: "Brigadeiros gourmet lideram com margens de 40-60%. Sabores como pistache e limão siciliano são destaque.", icon: Sparkles },
    { title: "Salgados Tradicionais Elevados", description: "Coxinhas gourmet (camarão, costela) podem ter markup de 200%. Pastéis criativos e empadas premium são ideais para eventos.", icon: Star },
    { title: "Nicho Saudável", description: "Produtos veganos, sem glúten ou fitness atendem demanda crescente e permitem precificação premium, com margens de até 70%.", icon: CheckCircle },
];

const marketingStrategies = [
    { title: "Conteúdo Visual Profissional", description: "Invista em fotos e vídeos de alta qualidade. Reels e TikToks mostrando o preparo geram 5-10x mais engajamento.", icon: Megaphone },
    { title: "Redes Sociais como Máquina de Vendas", description: "Use Instagram e TikTok para criar conexão e CTAs claros. Stories diários são essenciais.", icon: ShoppingCart },
    { title: "Anúncios Pagos Segmentados", description: "Comece com R$10-20/dia no Facebook/Instagram Ads para um raio de 5-10km. Anuncie no Google para buscas locais.", icon: Target },
    { title: "Parcerias e Promoções", description: "Use micro-influenciadores locais e crie programas de indicação. O cliente ganha desconto ao indicar um amigo.", icon: Users },
];

const commonErrors = [
    {
        icon: XCircle,
        title: "Cardápio Amplo Demais no Início",
        problem: "Oferecer 20+ produtos para 'agradar todo mundo' gera produção caótica e dificuldade de comunicar valor.",
        solution: "Comece com 3-5 produtos principais, domine-os e expanda gradualmente baseado em dados de demanda."
    },
    {
        icon: XCircle,
        title: "Subestimar Custos Ocultos",
        problem: "Calcular apenas ingredientes e esquecer embalagens, frete, comissões, marketing e perdas.",
        solution: "Use uma planilha detalhada com TODOS os custos e uma margem de segurança de 10-15%. Revise mensalmente."
    },
    {
        icon: XCircle,
        title: "Falta de Planejamento Financeiro",
        problem: "Misturar dinheiro pessoal e do negócio, não ter reserva de emergência e reinvestir 100% do lucro.",
        solution: "Separe contas, mantenha reserva para 3 meses de custos fixos e defina um pró-labore."
    },
    {
        icon: XCircle,
        title: "Negligenciar Pós-Venda e Fidelização",
        problem: "Focar apenas em adquirir novos clientes e ignorar os existentes. Reter custa 5-7x menos que adquirir.",
        solution: "Crie uma lista VIP no WhatsApp, ofereça descontos para recompra e colete feedback ativamente."
    }
];

const successCases = [
    { title: "Doceria Gourmet: +300% em 6 Meses", description: "Focou em marketing digital e parcerias com micro-influenciadoras, saindo de R$4.800 para R$24.000 de faturamento em 6 meses.", icon: TrendingUp},
    { title: "Fornecedor B2B: 15 Lanchonetes em Contrato", description: "Começou com 2 amigos, padronizou receitas e hoje tem R$28.000/mês em receita recorrente com volume e previsibilidade.", icon: Briefcase},
    { title: "Loja Virtual com Assinaturas: Ticket Médio +80%", description: "Lançou um plano de R$89/mês para kits temáticos, alcançando 350 assinantes e R$31.150/mês de receita recorrente em 1 ano.", icon: Store},
]

export default function EscalaVendasDgPage() {
  return (
    <AppLayout>
      <div className="flex-1 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            
            <header className="text-center mb-16 pt-16">
              <p className="text-primary font-semibold tracking-wider mb-2">FASE 05: CURSO PRÁTICO</p>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Como Escalar Vendas Digitais de Sobremesas</h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Um guia completo para transformar sua produção artesanal em um negócio digital escalável e lucrativo no mercado de doces e salgados.
              </p>
            </header>

            <main className="space-y-20">
              
              <section>
                <h2 className="text-3xl font-bold mb-4 text-center">Entendendo o Mercado e Oportunidades Reais</h2>
                 <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                    O mercado digital permite acesso direto ao consumidor com custos operacionais menores, possibilitando margens de lucro mais atrativas.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {marketStats.map(card => (
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
                 <h3 className="text-xl font-bold mb-4 text-center text-white/90">Modelos de Negócio Digitais Viáveis</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {businessModels.map(model => (
                        <Card key={model.title} className="p-4 bg-secondary/10 border-border/10">
                            <model.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                            <p className="text-sm font-semibold text-white">{model.title}</p>
                            <p className="text-xs text-muted-foreground">{model.description}</p>
                        </Card>
                    ))}
                 </div>
              </section>

              <section className="bg-secondary/10 p-8 md:p-12 rounded-3xl border border-border/10">
                 <h2 className="text-3xl font-bold mb-8 text-center">Escolhendo o Produto Certo para Escalar</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {productChoices.map(product => (
                    <Card key={product.title} className="p-6 bg-black/20 border-border/20 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <product.icon className="h-7 w-7 text-primary" />
                            </div>
                        </div>
                        <CardTitle className="text-lg mb-2 text-white">{product.title}</CardTitle>
                        <CardContent className="p-0 text-muted-foreground text-sm">
                            {product.description}
                        </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-8 bg-primary/10 border-l-4 border-primary p-5 rounded-r-lg text-center">
                    <p className="font-semibold text-primary-foreground/90"><Lightbulb className="inline-block h-5 w-5 mr-2" />
                       Estratégia de Foco: Comece com 1-3 produtos principais e expanda apenas após dominar produção, logística e marketing.
                    </p>
                </div>
              </section>

               <section>
                 <h2 className="text-3xl font-bold mb-8 text-center">Precificação Detalhada para Garantir Lucro</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <Card className="p-6 bg-secondary/5 border-border/20">
                      <CardHeader className="p-0 mb-3"><CardTitle className="text-lg text-white">Estrutura de Custos Completa</CardTitle></CardHeader>
                      <CardContent className="p-0 text-sm text-muted-foreground">
                        <p><strong>Custos Diretos:</strong> Ingredientes, embalagens, frete, comissões.</p>
                        <p><strong>Custos Fixos:</strong> Aluguel, mão de obra, marketing, sistemas.</p>
                      </CardContent>
                    </Card>
                     <Card className="p-6 bg-secondary/5 border-border/20">
                      <CardHeader className="p-0 mb-3"><CardTitle className="text-lg text-white">Margem Mínima Recomendada</CardTitle></CardHeader>
                      <CardContent className="p-0 text-sm text-muted-foreground">
                        <p><strong>30%</strong> para produtos de alto volume.</p>
                        <p><strong>50-70%</strong> para produtos premium ou de nicho.</p>
                      </CardContent>
                    </Card>
                 </div>
                 <Card className="bg-secondary/10 border-border/20 p-6">
                    <CardHeader className="p-0 mb-4"><CardTitle className="text-white text-center text-lg">Exemplo Prático: Brigadeiro Gourmet</CardTitle></CardHeader>
                    <CardContent className="p-0 text-sm text-muted-foreground">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <tbody>
                                    <tr className="border-b border-border/10"><td className="py-2">Ingredientes</td><td className="text-right">R$ 1,20</td></tr>
                                    <tr className="border-b border-border/10"><td className="py-2">Embalagem</td><td className="text-right">R$ 0,80</td></tr>
                                    <tr className="border-b border-border/10"><td className="py-2">Mão de obra proporcional</td><td className="text-right">R$ 0,50</td></tr>
                                    <tr className="border-b border-border/10"><td className="py-2">Frete médio por unidade</td><td className="text-right">R$ 0,30</td></tr>
                                    <tr className="border-b border-border/10"><td className="py-2">Marketing/comissão</td><td className="text-right">R$ 0,70</td></tr>
                                    <tr className="font-bold text-white"><td className="py-2">CUSTO TOTAL</td><td className="text-right">R$ 3,50</td></tr>
                                    <tr className="font-bold text-primary"><td className="py-2">PREÇO DE VENDA (margem 50%)</td><td className="text-right">R$ 7,00</td></tr>
                                    <tr className="font-bold text-green-400"><td className="py-2">LUCRO LÍQUIDO</td><td className="text-right">R$ 3,50</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
              </section>

              <section className="bg-secondary/10 p-8 md:p-12 rounded-3xl border border-border/10">
                <h2 className="text-3xl font-bold mb-8 text-center">Marketing Digital para Escalar Vendas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {marketingStrategies.map(model => (
                    <div key={model.title} className="flex gap-4">
                        <div className="bg-black/30 p-3 rounded-full shadow-sm border border-border/10 h-fit">
                            <model.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-white">{model.title}</h3>
                            <p className="text-muted-foreground text-sm mt-1">{model.description}</p>
                        </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-8 text-center">Gestão Operacional para Escala Sustentável</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card className="p-6 bg-secondary/5 border-border/20">
                        <CardHeader className="p-0 mb-2"><CardTitle className="text-lg text-white">Automação de Pedidos</CardTitle></CardHeader>
                        <CardContent className="p-0 text-sm text-muted-foreground">Use WhatsApp Business com respostas rápidas e catálogo digital para reduzir 70% do tempo de atendimento.</CardContent>
                    </Card>
                    <Card className="p-6 bg-secondary/5 border-border/20">
                        <CardHeader className="p-0 mb-2"><CardTitle className="text-lg text-white">Produção em Lotes Otimizada</CardTitle></CardHeader>
                        <CardContent className="p-0 text-sm text-muted-foreground">Organize a produção por dias temáticos para maximizar eficiência e use fichas técnicas para padronização.</CardContent>
                    </Card>
                 </div>
                 <Card className="p-6 bg-secondary/5 border-border/20">
                        <CardHeader className="p-0 mb-2"><CardTitle className="text-lg text-white">Checklist Operacional Diário</CardTitle></CardHeader>
                        <CardContent className="p-0 text-sm text-muted-foreground">
                            <ul className="list-disc list-inside space-y-1">
                                <li>Conferir e separar pedidos por rota.</li>
                                <li>Verificar estoque de insumos e embalagens.</li>
                                <li>Produzir conforme cronograma e embalar com padrão.</li>
                                <li>Confirmar entregas, coletar feedback e atualizar planilhas.</li>
                            </ul>
                        </CardContent>
                </Card>
              </section>
              
              <section>
                <h2 className="text-3xl font-bold mb-8 text-center">Erros Comuns e Como Evitá-los</h2>
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

               <section className="bg-secondary/10 p-8 md:p-12 rounded-3xl border border-border/10">
                <h2 className="text-3xl font-bold mb-8 text-center">Casos de Sucesso e Exemplos Práticos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {successCases.map(item => (
                        <Card key={item.title} className="p-6 bg-black/20 border-border/20 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="bg-primary/10 p-3 rounded-full"><item.icon className="h-7 w-7 text-primary" /></div>
                            </div>
                            <CardTitle className="text-lg mb-2 text-white">{item.title}</CardTitle>
                            <CardContent className="p-0 text-muted-foreground text-sm">{item.description}</CardContent>
                        </Card>
                    ))}
                </div>
                <div className="mt-8 bg-primary/10 border-l-4 border-primary p-5 rounded-r-lg text-center">
                    <p className="font-semibold text-primary-foreground/90"><Lightbulb className="inline-block h-5 w-5 mr-2" />
                       Lição Universal: Foco em qualidade, processos sólidos, relacionamento com o cliente e uso inteligente de dados são os pilares do crescimento.
                    </p>
                </div>
              </section>

              <Separator className="bg-border/20"/>

              <section>
                 <h2 className="text-3xl font-bold mb-4 text-center">Conclusão e Próximos Passos</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center mt-10">
                    <Card className="p-6 bg-secondary/5 border-border/20"><Target className="h-8 w-8 text-primary mx-auto mb-3" /><h3 className="font-semibold text-lg text-white">Comece Pequeno</h3><p className="text-muted-foreground text-sm mt-1">Valide 1-2 produtos com 20-50 clientes iniciais.</p></Card>
                    <Card className="p-6 bg-secondary/5 border-border/20"><Megaphone className="h-8 w-8 text-primary mx-auto mb-3" /><h3 className="font-semibold text-lg text-white">Invista em Marketing</h3><p className="text-muted-foreground text-sm mt-1">Fotos boas e R$10/dia em anúncios para começar.</p></Card>
                    <Card className="p-6 bg-secondary/5 border-border/20"><BarChart2 className="h-8 w-8 text-primary mx-auto mb-3" /><h3 className="font-semibold text-lg text-white">Use Dados</h3><p className="text-muted-foreground text-sm mt-1">Tome decisões baseadas em números, não em intuição.</p></Card>
                    <Card className="p-6 bg-secondary/5 border-border/20"><CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" /><h3 className="font-semibold text-lg text-white">Foque no Cliente</h3><p className="text-muted-foreground text-sm mt-1">Entrega, embalagem e pós-venda são cruciais.</p></Card>
                 </div>
                 <div className="mt-10 p-6 bg-secondary/5 border-l-4 border-primary italic text-center rounded-r-xl shadow-sm">
                    <p className="text-lg text-white/90">Lembre-se: Todo grande negócio começou pequeno. A diferença está em dar o primeiro passo hoje e manter a consistência.</p>
                </div>
              </section>
              
            </main>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

    