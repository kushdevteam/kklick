import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';

export default function Roadmap() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <i className="fas fa-road text-blue-400 text-3xl"></i>
          <h1 className="text-4xl font-bold text-foreground">KushKlicker Roadmap</h1>
        </div>
        <p className="text-xl text-muted-foreground">Our journey to revolutionize Web3 gaming</p>
        <p className="text-sm text-muted-foreground mt-2">Last Updated: January 2025</p>
      </div>

      {/* Navigation */}
      <div className="flex justify-center mb-8">
        <Link href="/">
          <Button variant="outline" className="mr-4">
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Game
          </Button>
        </Link>
        <Link href="/whitepaper">
          <Button variant="default">
            <i className="fas fa-file-alt mr-2"></i>
            Read Whitepaper
          </Button>
        </Link>
      </div>

      <div className="space-y-8">
        {/* Phase 1 - Foundation (COMPLETED) */}
        <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3 text-green-700 dark:text-green-300">
                <i className="fas fa-check-circle text-green-500"></i>
                <span>Phase 1: Foundation & Core Development</span>
              </CardTitle>
              <Badge variant="default" className="bg-green-500 text-white">COMPLETED</Badge>
            </div>
            <CardDescription className="text-green-600 dark:text-green-400">
              September 2025 | Building the core game infrastructure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">✅ Core Features Delivered:</h4>
                <ul className="space-y-1 text-green-800 dark:text-green-200 text-sm">
                  <li>• Complete incremental clicker game mechanics</li>
                  <li>• 50 comprehensive achievements system</li>
                  <li>• 18 upgrade tiers across multiple categories</li>
                  <li>• Real-time leaderboard functionality</li>
                  <li>• Mobile-responsive design</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">✅ Technical Infrastructure:</h4>
                <ul className="space-y-1 text-green-800 dark:text-green-200 text-sm">
                  <li>• React 18 frontend with TypeScript</li>
                  <li>• Express.js backend with PostgreSQL</li>
                  <li>• Telegram bot integration</li>
                  <li>• Discord bot development</li>
                  <li>• Manual wallet registration system</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">🔒 Security Innovation:</h4>
              <p className="text-green-800 dark:text-green-200 text-sm">
                Successfully implemented trust-first wallet approach, removing connection requirements and eliminating "drainer" concerns.
                Users safely register Solana addresses manually with full transparency.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Phase 2 - Enhancement & Community Building (COMPLETED) */}
        <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3 text-green-700 dark:text-green-300">
                <i className="fas fa-check-circle text-green-500"></i>
                <span>Phase 2: Enhancement & Community Building</span>
              </CardTitle>
              <Badge variant="default" className="bg-green-500 text-white">COMPLETED</Badge>
            </div>
            <CardDescription className="text-green-600 dark:text-green-400">
              Q4 2025 | Advanced gaming features and community systems
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">✅ Major Features Delivered:</h4>
                <ul className="space-y-1 text-green-800 dark:text-green-200 text-sm">
                  <li>• 🌱 Complete Cannabis Garden System</li>
                  <li>• ⚔️ PvP Battle Arena with tournaments</li>
                  <li>• 🏰 Guild System with management tools</li>
                  <li>• 🤖 Enhanced bot integration (Telegram/Discord)</li>
                  <li>• 💎 Live $KUSH token integration</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">✅ Advanced Systems:</h4>
                <ul className="space-y-1 text-green-800 dark:text-green-200 text-sm">
                  <li>• Cross-breeding lab with rare genetics</li>
                  <li>• Real-time PvP battles with abilities</li>
                  <li>• Guild leaderboards and contributions</li>
                  <li>• Token burning for premium features</li>
                  <li>• Mobile-optimized touch controls</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">🎯 Success Metrics Target:</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">10K</p>
                  <p className="text-xs text-blue-800 dark:text-blue-200">Monthly Active Users</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">50K</p>
                  <p className="text-xs text-blue-800 dark:text-blue-200">Bot Interactions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">5K</p>
                  <p className="text-xs text-blue-800 dark:text-blue-200">Wallet Registrations</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phase 3 - Web3 Integration & Token Economy (IN PROGRESS) */}
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3 text-blue-700 dark:text-blue-300">
                <i className="fas fa-cog fa-spin text-blue-500"></i>
                <span>Phase 3: Web3 Integration & Token Economy</span>
              </CardTitle>
              <Badge variant="secondary" className="bg-blue-500 text-white">IN PROGRESS</Badge>
            </div>
            <CardDescription className="text-blue-600 dark:text-blue-400">
              Q1 2025 | Live token integration and automated rewards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">✅ Token Integration Completed:</h4>
                <ul className="space-y-1 text-blue-800 dark:text-blue-200 text-sm">
                  <li>• ✅ Live $KUSH token on Solana mainnet</li>
                  <li>• ✅ Token burning system for grow lights</li>
                  <li>• ✅ Manual reward distribution system</li>
                  <li>• ✅ Real-time balance checking</li>
                  <li>• ✅ Secure wallet address registration</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">🚀 Currently Developing:</h4>
                <ul className="space-y-1 text-blue-800 dark:text-blue-200 text-sm">
                  <li>• Automated reward distribution system</li>
                  <li>• Advanced token burning mechanics</li>
                  <li>• Guild treasury and token sharing</li>
                  <li>• PvP wagering with real $KUSH stakes</li>
                  <li>• Token marketplace integration</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">🎯 Current Focus:</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-coins text-blue-500"></i>
                  <span className="text-sm text-blue-800 dark:text-blue-200">Live $KUSH token: FPdBJCFaSqwrh4qQLezZgoVCLDvXkuFm5tR95TkXDZGBVYUtqCUL</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-fire text-blue-500"></i>
                  <span className="text-sm text-blue-800 dark:text-blue-200">Token burning system for grow lights and premium features</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-robot text-blue-500"></i>
                  <span className="text-sm text-blue-800 dark:text-blue-200">Automated reward distribution development</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phase 4 - Expansion (PLANNED) */}
        <Card className="border-purple-200 dark:border-purple-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3 text-purple-700 dark:text-purple-300">
                <i className="fas fa-rocket text-purple-500"></i>
                <span>Phase 4: Platform Expansion & Advanced Features</span>
              </CardTitle>
              <Badge variant="outline" className="border-purple-500 text-purple-700 dark:text-purple-300">PLANNED</Badge>
            </div>
            <CardDescription className="text-purple-600 dark:text-purple-400">
              Q2-Q3 2025 | Advanced gameplay and ecosystem expansion
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">🏆 Advanced Competition:</h4>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• Global PvP tournaments with $KUSH prizes</li>
                  <li>• Seasonal events and challenges</li>
                  <li>• Inter-guild championship battles</li>
                  <li>• Ranked competitive ladders</li>
                  <li>• Elite strain breeding competitions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">📱 Platform Expansion:</h4>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• Dedicated mobile applications (iOS/Android)</li>
                  <li>• Desktop client with enhanced graphics</li>
                  <li>• Browser extension for quick access</li>
                  <li>• Smart TV and console applications</li>
                  <li>• Multi-language localization</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">🎯 Expansion Goals:</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">100K</p>
                  <p className="text-xs text-purple-800 dark:text-purple-200">Daily Active Users</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">1000+</p>
                  <p className="text-xs text-purple-800 dark:text-purple-200">Active Guilds</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">10M+</p>
                  <p className="text-xs text-purple-800 dark:text-purple-200">$KUSH Token Volume</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phase 5 - Innovation Hub (VISION) */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                <i className="fas fa-star text-gray-500"></i>
                <span>Phase 5: Innovation Hub & Ecosystem</span>
              </CardTitle>
              <Badge variant="outline" className="border-gray-500 text-gray-700 dark:text-gray-300">VISION</Badge>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              2027+ | Leading Web3 gaming innovation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">🔬 Innovation Focus:</h4>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• AI-powered gameplay personalization</li>
                  <li>• Procedural content generation</li>
                  <li>• Advanced analytics and insights</li>
                  <li>• Blockchain governance mechanisms</li>
                  <li>• Sustainability initiatives</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">🏗️ Ecosystem Development:</h4>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• Developer SDK and API platform</li>
                  <li>• Third-party game integration</li>
                  <li>• Community-driven content creation</li>
                  <li>• Educational and research initiatives</li>
                  <li>• Industry standard setting</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">🎯 Long-term Impact:</h4>
              <p className="text-gray-800 dark:text-gray-200 text-sm">
                Establish KushKlicker as the foundational platform for the next generation of Web3 gaming experiences, 
                fostering innovation, education, and responsible cannabis advocacy through technology.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Development Methodology */}
        <Card className="border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-cyan-700 dark:text-cyan-300">
              <i className="fas fa-code text-cyan-500"></i>
              <span>Multi-Agent Development Approach</span>
            </CardTitle>
            <CardDescription className="text-cyan-600 dark:text-cyan-400">
              Revolutionizing development through AI collaboration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-cyan-800 dark:text-cyan-200 text-sm leading-relaxed">
              KushKlicker pioneered a unique multi-agent development methodology, enabling rapid iteration and 
              collaborative improvement through AI-assisted development cycles. This approach ensures consistent 
              quality, comprehensive documentation, and seamless knowledge transfer.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border border-cyan-200 dark:border-cyan-800 rounded-lg">
                <i className="fas fa-robot text-cyan-500 text-2xl mb-2"></i>
                <h5 className="font-semibold text-cyan-700 dark:text-cyan-300">AI Collaboration</h5>
                <p className="text-xs text-cyan-600 dark:text-cyan-400">Seamless agent handoffs</p>
              </div>
              <div className="text-center p-4 border border-cyan-200 dark:border-cyan-800 rounded-lg">
                <i className="fas fa-book text-cyan-500 text-2xl mb-2"></i>
                <h5 className="font-semibold text-cyan-700 dark:text-cyan-300">Documentation</h5>
                <p className="text-xs text-cyan-600 dark:text-cyan-400">Comprehensive knowledge base</p>
              </div>
              <div className="text-center p-4 border border-cyan-200 dark:border-cyan-800 rounded-lg">
                <i className="fas fa-sync text-cyan-500 text-2xl mb-2"></i>
                <h5 className="font-semibold text-cyan-700 dark:text-cyan-300">Rapid Iteration</h5>
                <p className="text-xs text-cyan-600 dark:text-cyan-400">Continuous improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <i className="fas fa-trophy text-yellow-400"></i>
              <span>Community Milestones & Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="p-4 border border-border rounded-lg">
                <i className="fas fa-users text-blue-400 text-2xl mb-2"></i>
                <h5 className="text-lg font-bold">1K+ Players</h5>
                <p className="text-xs text-muted-foreground">Beta Launch Success</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <i className="fas fa-mouse-pointer text-green-400 text-2xl mb-2"></i>
                <h5 className="text-lg font-bold">1M+ Clicks</h5>
                <p className="text-xs text-muted-foreground">Community Engagement</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <i className="fab fa-telegram text-blue-400 text-2xl mb-2"></i>
                <h5 className="text-lg font-bold">500+ Bot Users</h5>
                <p className="text-xs text-muted-foreground">Telegram Integration</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <i className="fas fa-wallet text-purple-400 text-2xl mb-2"></i>
                <h5 className="text-lg font-bold">100+ Wallets</h5>
                <p className="text-xs text-muted-foreground">Secure Registrations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Navigation */}
      <div className="text-center mt-12 pt-8 border-t border-border">
        <div className="flex justify-center space-x-4">
          <Link href="/">
            <Button variant="outline">
              <i className="fas fa-gamepad mr-2"></i>
              Play Game
            </Button>
          </Link>
          <Link href="/whitepaper">
            <Button variant="default">
              <i className="fas fa-file-alt mr-2"></i>
              Read Whitepaper
            </Button>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Follow our journey as we revolutionize Web3 gaming with security, trust, and innovation.
        </p>
      </div>
    </div>
  );
}