
'use client';

import React from 'react';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Zap, BarChart, BookOpen, Search, Wallet, ShoppingCart, TrendingUp, Lightbulb, Users, CheckCircle, Target, FileText, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const marketBenefits = [
  { icon: Zap, title: "Flexibilidade Total", description: "Você é seu próprio chefe, controla seus horários e cresce no seu ritmo. Comece produzindo em casa e expanda conforme sua capacidade e demanda aumentam." },
  { icon: Wallet, title: "Lucro Real e Tangível", description: "Margem de lucro entre 45% e 60%, com potencial de ganhar R$ 3.000 por mês vendendo apenas 100 brigadeiros por dia. O retorno sobre investimento é rápido e mensurável." },
  { icon: TrendingUp, title: "Mercado em Alta", description: "Demanda crescente por produtos artesanais e personalizados, com clientes dispostos a pagar mais por qualidade e exclusividade." }
];

const bestSellers = [
  { title: "Brigadeiros Gourmet e Doces de Festa", description: "Baixo custo de produção, alta aceitação no mercado e facilidade de venda. Margem de lucro: 55-65%.", icon: Award },
  { title: "Bolos no Pote e Brownies", description: "Produtos premium com apresentação sofisticada e ótima durabilidade. Margem de lucro: 50-60%.", icon: Award },
  { title: "Salgados Artesanais", description: "Coxinhas, quibes e mini pastéis têm custo acessível e alta saída. Margem de lucro: 45-55%.", icon: Award }
];

const step1Items = [
    { icon: BookOpen, title: "Aprendizado Técnico", description: "Invista em cursos para dominar receitas e técnicas profissionais. Pratique até atingir a perfeição." },
    { icon: Search, title: "Pesquisa de Mercado", description: "Analise a concorrência local e identifique oportunidades na sua região." },
    { icon: Wallet, title: "Investimento Inicial", description: "Calcule custos de ingredientes, embalagens e divulgação. Média: R$500 a R$1.500." },
    { icon: BarChart, title: "Precificação Estratégica", description: "Estabeleça preços que cubram custos, garantam lucro e sejam competitivos." },
];

const step2Items = [
    { icon: Target, title: "Defina Metas Diárias e Semanais", description: "Ex: produzir 100 brigadeiros/dia. Metas claras mantêm o foco." },
    { icon: CheckCircle, title: "Organize Seu Espaço de Trabalho", description: "Um ambiente limpo e eficiente é fundamental. Higiene é prioridade." },
    { icon: FileText, title: "Sistema de Controle Financeiro", description: "Registre todas as receitas e despesas diariamente em planilhas ou apps." },
    { icon: ShoppingCart, title: "Gestão de Estoque Inteligente", description: "Compre em quantidade adequada para evitar desperdício e ter bons preços." },
];

const step3Strategies = [
    { title: "Redes Sociais Estratégicas", description: "Use Instagram e Facebook com fotos profissionais e stories dos bastidores." },
    { title: "Combos e Kits Atrativos", description: "Aumente o ticket médio com caixas de 6, 12 ou 24 unidades e kits temáticos." },
    { title: "Canais de Distribuição Múltiplos", description: "Venda por WhatsApp, apps de delivery e feiras locais para ampliar seu alcance." },
];

const commonMistakes = [
    { title: "Concorrência Intensa", solution: "Destaque-se pela qualidade excepcional e atendimento personalizado. Crie uma identidade única." },
    { title: "Gestão de Tempo e Energia", solution: "Estabeleça uma rotina clara e realista. Use blocos de tempo para produção, vendas e planejamento." },
    { title: "Variação de Demanda", solution: "Diversifique canais de venda, crie promoções em períodos de baixa e construa uma reserva financeira." },
    { title: "Manutenção da Qualidade em Escala", solution: "Documente cada receita com precisão, use medidas padronizadas e crie checklists de qualidade." },
];

export default function MudancaDeCicloPage() {
  return (
    <AppLayout>
      <div className="flex-1 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            
            <header className="text-center mb-16 pt-16">
              <p className="text-orange-500 font-semibold tracking-wider mb-2">FASE 06: CURSO PRÁTICO</p>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Mude Sua Vida em 1 Ano</h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Descubra como o mercado de doces e salgados artesanais pode ser a chave para sua independência financeira e transformação pessoal.
              </p>
            </header>

            <main className="space-y-20">
              
              <section>
                <h2 className="text-3xl font-bold mb-4 text-center">Por que Vender Doces e Salgados?</h2>
                 <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                    Este setor combina baixo investimento inicial com alto potencial de retorno, tornando-se uma das formas mais acessíveis de iniciar um negócio próprio.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {marketBenefits.map(card => (
                    <Card key={card.title} className="text-center p-6 bg-secondary/5 border-border/20 hover:border-orange-500/50 hover:shadow-lg transition-all">
                        <div className="flex justify-center mb-4">
                            <div className="bg-orange-500/10 p-3 rounded-full">
                                <card.icon className="h-8 w-8 text-orange-500" />
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
                 <h2 className="text-3xl font-bold mb-8 text-center">Produtos Que Vendem e Dão Lucro</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {bestSellers.map(product => (
                    <Card key={product.title} className="p-6 bg-black/20 border-border/20 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-orange-500/10 p-3 rounded-full">
                                <product.icon className="h-7 w-7 text-orange-500" />
                            </div>
                        </div>
                        <CardTitle className="text-lg mb-2 text-white">{product.title}</CardTitle>
                        <CardContent className="p-0 text-muted-foreground text-sm">
                            {product.description}
                        </CardContent>
                    </Card>
                  ))}
                </div>
                 <div className="mt-8 bg-orange-500/10 border-l-4 border-orange-500 p-5 rounded-r-lg text-center">
                    <p className="font-semibold text-white/90"><Lightbulb className="inline-block h-5 w-5 mr-2 text-orange-500" />
                       Dica Profissional: Comece com 2-3 produtos, domine-os e expanda depois. Qualidade consistente vale mais que variedade.
                    </p>
                </div>
              </section>
              
              <section>
                 <h2 className="text-3xl font-bold mb-8 text-center">Passo 1: Planejamento e Aprendizado</h2>
                 <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                    A base de conhecimento e estratégia que determinará a viabilidade do seu negócio a longo prazo.
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {step1Items.map(item => (
                        <Card key={item.title} className="p-6 bg-secondary/5 border-border/20 flex items-start gap-4">
                            <div className="bg-orange-500/10 p-3 rounded-full mt-1">
                                <item.icon className="h-6 w-6 text-orange-500" />
                            </div>
                            <div>
                                <CardTitle className="text-lg text-white mb-1">{item.title}</CardTitle>
                                <CardContent className="p-0 text-sm text-muted-foreground">{item.description}</CardContent>
                            </div>
                        </Card>
                    ))}
                 </div>
                <Card className="mt-6 p-4 bg-secondary/5 border-border/20">
                  <CardContent className="p-0 text-sm text-muted-foreground">
                    <p><strong>Recursos de aprendizado:</strong> Cursos do SEBRAE, plataformas como Hotmart e Udemy, canais no YouTube e grupos de empreendedores para trocar experiências.</p>
                  </CardContent>
                </Card>
              </section>
              
              <section>
                 <h2 className="text-3xl font-bold mb-8 text-center">Passo 2: Organização e Produção</h2>
                 <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                    A eficiência operacional é o que separa um hobby de um negócio lucrativo. Processos claros e disciplina são essenciais.
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {step2Items.map(item => (
                        <Card key={item.title} className="p-6 bg-secondary/5 border-border/20 flex items-start gap-4">
                            <div className="bg-orange-500/10 p-3 rounded-full mt-1">
                                <item.icon className="h-6 w-6 text-orange-500" />
                            </div>
                            <div>
                                <CardTitle className="text-lg text-white mb-1">{item.title}</CardTitle>
                                <CardContent className="p-0 text-sm text-muted-foreground">{item.description}</CardContent>
                            </div>
                        </Card>
                    ))}
                    <Card className="p-6 bg-secondary/5 border-border/20 flex items-start gap-4">
                        <div className="bg-orange-500/10 p-3 rounded-full mt-1"><Star className="h-6 w-6 text-orange-500" /></div>
                        <div>
                            <CardTitle className="text-lg text-white mb-1">Qualidade Constante</CardTitle>
                            <CardContent className="p-0 text-sm text-muted-foreground">Padronize suas receitas com medidas exatas. Cada lote deve ter o mesmo sabor e aparência impecável.</CardContent>
                        </div>
                    </Card>
                     <Card className="p-6 bg-secondary/5 border-border/20 flex items-start gap-4">
                        <div className="bg-orange-500/10 p-3 rounded-full mt-1"><Zap className="h-6 w-6 text-orange-500" /></div>
                        <div>
                            <CardTitle className="text-lg text-white mb-1">Disciplina Operacional</CardTitle>
                            <CardContent className="p-0 text-sm text-muted-foreground">Estabeleça uma rotina consistente. Comece com 3-4 horas diárias dedicadas e aumente gradualmente.</CardContent>
                        </div>
                    </Card>
                 </div>
              </section>

              <section className="bg-secondary/10 p-8 md:p-12 rounded-3xl border border-border/10">
                <h2 className="text-3xl font-bold mb-8 text-center">Passo 3: Venda e Marketing</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {step3Strategies.map(strategy => (
                    <Card key={strategy.title} className="p-6 bg-black/20 border-border/20">
                      <CardTitle className="text-lg text-white mb-2">{strategy.title}</CardTitle>
                      <CardContent className="p-0 text-sm text-muted-foreground">{strategy.description}</CardContent>
                    </Card>
                  ))}
                </div>
                <Card className="p-6 bg-black/20 border-border/20">
                  <CardTitle className="text-lg text-white mb-2">Estratégias de Crescimento de Vendas</CardTitle>
                  <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                    <li>Depoimentos de Clientes para construir credibilidade social.</li>
                    <li>Programa de Indicação para incentivar o boca a boca.</li>
                    <li>Promoções Estratégicas para gerar urgência e experimentar produtos.</li>
                    <li>Parcerias Locais com cafeterias, academias e salões.</li>
                    <li>Participação em Eventos e Feiras para ganhar visibilidade.</li>
                  </ul>
                </Card>
              </section>

              <section>
                 <h2 className="text-3xl font-bold mb-8 text-center">Passo 4: Crescimento e Escala</h2>
                  <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                    Após validar seu produto, o próximo passo é aumentar a receita sem comprometer a qualidade ou sobrecarregar sua operação.
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 bg-secondary/5 border-border/20 text-center"><TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-3" /><h3 className="font-semibold text-lg text-white">Reinvestimento Inteligente</h3><p className="text-muted-foreground text-sm mt-1">Separe 30-40% do lucro para reinvestir em equipamentos, embalagens e marketing.</p></Card>
                    <Card className="p-6 bg-secondary/5 border-border/20 text-center"><Users className="h-8 w-8 text-orange-500 mx-auto mb-3" /><h3 className="font-semibold text-lg text-white">Parcerias Estratégicas</h3><p className="text-muted-foreground text-sm mt-1">Busque estabelecimentos locais (cafeterias, padarias) para revender seus produtos.</p></Card>
                    <Card className="p-6 bg-secondary/5 border-border/20 text-center"><Award className="h-8 w-8 text-orange-500 mx-auto mb-3" /><h3 className="font-semibold text-lg text-white">Fortalecimento de Marca</h3><p className="text-muted-foreground text-sm mt-1">Invista em embalagens personalizadas e logo profissional para criar fidelização.</p></Card>
                 </div>
                 <Card className="mt-8 p-6 bg-secondary/5 border-border/20">
                    <CardHeader className="p-0 mb-3"><CardTitle className="text-white text-center text-lg">Indicadores de Que Você Está Pronto Para Escalar</CardTitle></CardHeader>
                    <CardContent className="p-0 text-sm text-muted-foreground space-y-2">
                        <p><strong>Demanda Consistente:</strong> Você vende regularmente toda sua produção e tem lista de espera.</p>
                        <p><strong>Processos Estabelecidos:</strong> Suas receitas estão padronizadas e você controla custos e qualidade.</p>
                        <p><strong>Capital de Giro:</strong> Você acumulou reserva financeira para investir em crescimento.</p>
                    </CardContent>
                </Card>
              </section>
              
               <section className="bg-secondary/10 p-8 md:p-12 rounded-3xl border border-border/10">
                <h2 className="text-3xl font-bold mb-8 text-center">Exemplo Real: Lucro com Brigadeiros Gourmet</h2>
                 <Card className="bg-black/20 border-border/20 p-6">
                    <CardContent className="p-0 text-sm text-muted-foreground">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <tbody>
                                    <tr className="border-b border-border/10"><td className="py-2">Custo por Unidade</td><td className="text-right font-semibold text-white">R$ 1,40</td></tr>
                                    <tr className="border-b border-border/10"><td className="py-2">Preço de Venda</td><td className="text-right font-semibold text-white">R$ 3,50</td></tr>
                                    <tr className="border-b border-border/10"><td className="py-2">Lucro Unitário (60%)</td><td className="text-right font-semibold text-orange-500">R$ 2,10</td></tr>
                                    <tr className="border-b border-border/10"><td className="py-2">Meta Diária</td><td className="text-right font-semibold text-white">100 unidades</td></tr>
                                    <tr className="font-bold text-white"><td className="py-2">PROJEÇÃO MENSAL (28 DIAS)</td><td className="text-right text-lg text-green-400">R$ 5.880,00</td></tr>
                                </tbody>
                            </table>
                        </div>
                         <p className="text-xs text-muted-foreground mt-4 text-center">Este cálculo considera vendas diretas. Parcerias podem exigir margem menor (40-45%) mas garantem volume.</p>
                    </CardContent>
                </Card>
                <div className="text-center mt-8">
                  <p className="font-bold text-xl text-white">Potencial de Crescimento</p>
                  <p className="text-muted-foreground">200 brigadeiros/dia = <span className="font-semibold text-green-400">R$ 11.760/mês</span></p>
                   <p className="text-muted-foreground">Adicionando outros produtos, seu faturamento pode ultrapassar <span className="font-semibold text-green-400">R$ 15.000 mensais</span> no primeiro ano.</p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-8 text-center">Desafios e Como Superá-los</h2>
                <div className="space-y-6">
                    {commonMistakes.map(item => (
                        <Card key={item.title} className="bg-destructive/5 border-destructive/20">
                            <CardHeader>
                                <CardTitle className="text-lg text-destructive/90">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <p><strong className="text-green-400">Solução:</strong> <span className="text-white/80">{item.solution}</span></p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                 <Card className="mt-6 p-4 bg-secondary/5 border-border/20">
                    <CardHeader className="p-0 mb-2"><CardTitle className="text-white text-center text-lg">Mentalidade Para Superar Obstáculos</CardTitle></CardHeader>
                    <CardContent className="p-0 text-sm text-muted-foreground space-y-1">
                        <p><strong>Aprendizado Contínuo:</strong> Veja cada erro como lição. Peça feedback e adapte-se rapidamente.</p>
                        <p><strong>Resiliência e Persistência:</strong> Os primeiros meses podem ser lentos. Não desanime. Celebre pequenas vitórias.</p>
                    </CardContent>
                </Card>
              </section>
              
              <Separator className="bg-border/20"/>

              <section>
                 <h2 className="text-3xl font-bold mb-4 text-center">Você Pode Mudar Sua Vida em 1 Ano!</h2>
                 <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
                    A transformação que você busca não é apenas possível — ela está ao seu alcance. A diferença entre sonhar e realizar está em dar o primeiro passo hoje.
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-10">
                    <Card className="p-6 bg-secondary/5 border-border/20"><Zap className="h-8 w-8 text-orange-500 mx-auto mb-3" /><h3 className="font-semibold text-lg text-white">Esforço Direcionado</h3><p className="text-muted-foreground text-sm mt-1">Trabalhe com propósito claro. Cada passo é um tijolo na construção do seu futuro.</p></Card>
                    <Card className="p-6 bg-secondary/5 border-border/20"><Target className="h-8 w-8 text-orange-500 mx-auto mb-3" /><h3 className="font-semibold text-lg text-white">Foco Inabalável</h3><p className="text-muted-foreground text-sm mt-1">Sua visão de liberdade deve ser maior que qualquer obstáculo temporário.</p></Card>
                    <Card className="p-6 bg-secondary/5 border-border/20"><Award className="h-8 w-8 text-orange-500 mx-auto mb-3" /><h3 className="font-semibold text-lg text-white">Paixão Pelo Que Faz</h3><p className="text-muted-foreground text-sm mt-1">Clientes sentem e valorizam o cuidado e a dedicação em cada detalhe.</p></Card>
                 </div>
                 <Card className="mt-10 p-6 bg-secondary/10 border-border/20">
                    <CardHeader className="p-0 mb-4"><CardTitle className="text-white text-center text-lg">Comece Hoje: Seu Plano de Ação Imediato</CardTitle></CardHeader>
                    <CardContent className="p-0 text-sm text-muted-foreground space-y-3">
                        <p><strong>Próximas 24 Horas:</strong> Escolha seus 2-3 produtos principais, faça a lista de compras e calcule o investimento inicial.</p>
                        <p><strong>Primeira Semana:</strong> Pratique as receitas, crie seu perfil no Instagram e fotografe os produtos.</p>
                        <p><strong>Primeiro Mês:</strong> Faça as primeiras 50 vendas, colete feedback e estabeleça uma rotina de produção.</p>
                        <p><strong>Primeiros 3 Meses:</strong> Alcance 100 unidades/dia, reinvista lucros e busque parcerias.</p>
                        <p><strong>Primeiro Ano:</strong> Construa uma marca sólida, clientes fiéis e faturamento consistente de R$ 5.000+.</p>
                    </CardContent>
                </Card>
                 <div className="mt-10 p-6 bg-secondary/5 border-l-4 border-orange-500 italic text-center rounded-r-xl shadow-sm">
                    <p className="text-lg text-white/90">"O sucesso não é acidente. É trabalho duro, perseverança, aprendizado, estudo, sacrifício e, acima de tudo, amor pelo que você está fazendo." — Pelé</p>
                </div>
              </section>

            </main>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
