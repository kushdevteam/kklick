import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function Whitepaper() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <i className="fas fa-leaf text-green-400 text-3xl"></i>
          <h1 className="text-4xl font-bold text-foreground">KushKlicker Whitepaper</h1>
        </div>
        <p className="text-xl text-muted-foreground">The Ultimate Cannabis-Themed Web3 Gaming Experience</p>
        <p className="text-sm text-muted-foreground mt-2">Version 2.0 | January 2025</p>
      </div>

      {/* Navigation */}
      <div className="flex justify-center mb-8">
        <Link href="/">
          <Button variant="outline" className="mr-4">
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Game
          </Button>
        </Link>
        <Link href="/roadmap">
          <Button variant="default">
            <i className="fas fa-road mr-2"></i>
            View Roadmap
          </Button>
        </Link>
      </div>

      <div className="space-y-8">
        {/* Executive Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <i className="fas fa-chart-line text-blue-400"></i>
              <span>Executive Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground leading-relaxed">
              KushKlicker represents a revolutionary fusion of traditional incremental gaming mechanics with modern Web3 technology, 
              creating an engaging cannabis-themed experience that bridges entertainment and blockchain innovation.
            </p>
            <p className="text-foreground leading-relaxed">
              Our platform combines the addictive simplicity of clicker games with advanced features including Cannabis Garden cultivation, 
              PvP Battle Arena, Guild Systems, and live $KUSH token integration on Solana mainnet, creating a comprehensive gaming ecosystem.
            </p>
          </CardContent>
        </Card>

        {/* Problem Statement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <i className="fas fa-exclamation-triangle text-yellow-400"></i>
              <span>Problem Statement</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold text-foreground">Current Gaming Landscape Issues:</h4>
            <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
              <li><strong>Complex Web3 Onboarding:</strong> Steep learning curve for blockchain gaming newcomers</li>
              <li><strong>Lack of Real Value:</strong> Traditional games offer no tangible rewards for time invested</li>
              <li><strong>Fragmented Social Experience:</strong> Limited cross-platform integration and community building</li>
            </ul>
          </CardContent>
        </Card>

        {/* Solution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <i className="fas fa-lightbulb text-green-400"></i>
              <span>Our Solution</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold text-foreground">Security-First Web3 Gaming:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-400 mb-2">🔒 Manual Wallet Registration</h5>
                <p className="text-sm text-foreground">
                  Users manually enter wallet addresses - no permissions, no connections, maximum security
                </p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-400 mb-2">📱 Multi-Platform Integration</h5>
                <p className="text-sm text-foreground">
                  Seamless experience across web, Telegram, and Discord with unified progress tracking
                </p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h5 className="font-semibold text-purple-400 mb-2">🎮 Advanced Gaming Features</h5>
                <p className="text-sm text-foreground">
                  Complete Garden system, PvP battles, Guild management, 50+ achievements, and cross-platform bot integration
                </p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h5 className="font-semibold text-orange-400 mb-2">💰 Live Token Integration</h5>
                <p className="text-sm text-foreground">
                  Real $KUSH tokens on Solana mainnet with manual distribution system and token burning features
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Architecture */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <i className="fas fa-cogs text-purple-400"></i>
              <span>Technical Architecture</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border border-border rounded-lg">
                <i className="fab fa-react text-blue-400 text-2xl mb-2"></i>
                <h5 className="font-semibold">Frontend</h5>
                <p className="text-sm text-muted-foreground">React 18, TypeScript, Tailwind CSS</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <i className="fas fa-server text-green-400 text-2xl mb-2"></i>
                <h5 className="font-semibold">Backend</h5>
                <p className="text-sm text-muted-foreground">Express.js, PostgreSQL, Drizzle ORM</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <i className="fab fa-ethereum text-purple-400 text-2xl mb-2"></i>
                <h5 className="font-semibold">Blockchain</h5>
                <p className="text-sm text-muted-foreground">Solana Network Integration</p>
              </div>
            </div>
            
            <h4 className="font-semibold text-foreground mt-6">Key Technical Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-foreground ml-4">
              <li>Real-time multiplayer leaderboards with live updates</li>
              <li>Portable database architecture for multi-agent development</li>
              <li>Comprehensive bot integration (Telegram & Discord)</li>
              <li>Mobile-responsive design optimized for all devices</li>
              <li>Auto-seeding game data for consistent experiences</li>
            </ul>
          </CardContent>
        </Card>

        {/* Game Economy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <i className="fas fa-coins text-yellow-400"></i>
              <span>Game Economy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">$KUSH Token Economy:</h4>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-center space-x-2">
                    <i className="fas fa-mouse-pointer text-green-400"></i>
                    <span><strong>Click Rewards:</strong> Base earning mechanism</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <i className="fas fa-arrow-up text-blue-400"></i>
                    <span><strong>Upgrade System:</strong> 18 tiers of improvements</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <i className="fas fa-robot text-purple-400"></i>
                    <span><strong>Auto Income:</strong> Passive earning mechanisms</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <i className="fas fa-trophy text-yellow-400"></i>
                    <span><strong>Achievement Rewards:</strong> Bonus distributions</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Upgrade Categories:</h4>
                <div className="space-y-2">
                  <div className="bg-muted/50 p-2 rounded">
                    <strong className="text-green-400">Growing Equipment:</strong> Basic farming tools
                  </div>
                  <div className="bg-muted/50 p-2 rounded">
                    <strong className="text-blue-400">Processing Tools:</strong> Efficiency multipliers
                  </div>
                  <div className="bg-muted/50 p-2 rounded">
                    <strong className="text-purple-400">Premium Systems:</strong> Advanced automation
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Model */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <i className="fas fa-shield-alt text-green-400"></i>
              <span>Security Model</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">🛡️ Trust-First Approach</h4>
              <p className="text-green-800 dark:text-green-200 text-sm">
                Our security model prioritizes user trust by eliminating wallet connection requirements entirely.
              </p>
            </div>
            
            <h4 className="font-semibold text-foreground">Security Features:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-foreground">
                <li>✅ No wallet permissions required</li>
                <li>✅ Manual address registration only</li>
                <li>✅ Clear security messaging throughout</li>
                <li>✅ Address validation and verification</li>
              </ul>
              <ul className="space-y-2 text-foreground">
                <li>✅ Encrypted data transmission</li>
                <li>✅ Secure session management</li>
                <li>✅ Multi-platform account linking</li>
                <li>✅ Transparent reward distribution</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Market Opportunity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <i className="fas fa-chart-bar text-blue-400"></i>
              <span>Market Opportunity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 border border-border rounded-lg">
                <h5 className="text-2xl font-bold text-green-400">$4.3B</h5>
                <p className="text-sm text-muted-foreground">Mobile Gaming Market</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h5 className="text-2xl font-bold text-purple-400">$1.8B</h5>
                <p className="text-sm text-muted-foreground">Web3 Gaming Sector</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h5 className="text-2xl font-bold text-blue-400">740M</h5>
                <p className="text-sm text-muted-foreground">Telegram Monthly Users</p>
              </div>
            </div>
            
            <h4 className="font-semibold text-foreground">Target Demographics:</h4>
            <ul className="list-disc list-inside space-y-1 text-foreground ml-4">
              <li>Casual mobile gamers seeking rewards-based experiences</li>
              <li>Crypto enthusiasts interested in gaming applications</li>
              <li>Cannabis culture enthusiasts and advocacy communities</li>
              <li>Telegram and Discord community members</li>
            </ul>
          </CardContent>
        </Card>

        {/* Team & Development */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <i className="fas fa-users text-purple-400"></i>
              <span>Development Philosophy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold text-foreground">Multi-Agent Development Approach:</h4>
            <p className="text-foreground leading-relaxed">
              KushKlicker is built using a cutting-edge multi-agent development methodology, enabling rapid iteration 
              and collaborative improvement through AI-assisted development cycles.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h5 className="font-semibold text-blue-400 mb-2">🤖 Agent-Friendly Architecture</h5>
                <p className="text-sm text-foreground">
                  Comprehensive documentation and portable codebase design for seamless AI collaboration
                </p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-400 mb-2">📚 Documentation-First</h5>
                <p className="text-sm text-foreground">
                  Extensive technical documentation enabling knowledge transfer and rapid development
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future Vision */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <i className="fas fa-rocket text-orange-400"></i>
              <span>Future Vision</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold text-foreground">Long-term Goals:</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <i className="fas fa-globe text-blue-400 mt-1"></i>
                <div>
                  <strong className="text-foreground">Global Cannabis Gaming Platform:</strong>
                  <p className="text-sm text-muted-foreground">Become the leading Web3 gaming destination for cannabis enthusiasts worldwide</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <i className="fas fa-handshake text-green-400 mt-1"></i>
                <div>
                  <strong className="text-foreground">Industry Partnerships:</strong>
                  <p className="text-sm text-muted-foreground">Collaborate with cannabis brands and blockchain projects for unique experiences</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <i className="fas fa-mobile text-purple-400 mt-1"></i>
                <div>
                  <strong className="text-foreground">Mobile Application:</strong>
                  <p className="text-sm text-muted-foreground">Dedicated mobile apps for iOS and Android with enhanced features</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <i className="fas fa-coins text-yellow-400 mt-1"></i>
                <div>
                  <strong className="text-foreground">Token Launch:</strong>
                  <p className="text-sm text-muted-foreground">Official $KUSH token deployment with real-world utility and rewards</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-700 dark:text-yellow-300">
              <i className="fas fa-exclamation-triangle"></i>
              <span>Important Disclaimer</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-yellow-800 dark:text-yellow-200 space-y-2">
            <p className="text-sm">
              <strong>Educational and Entertainment Purpose:</strong> KushKlicker is designed for educational and entertainment purposes. 
              Cannabis references are purely thematic and do not promote illegal activities.
            </p>
            <p className="text-sm">
              <strong>No Investment Advice:</strong> This whitepaper does not constitute investment advice. 
              Always comply with local laws and regulations regarding cannabis and cryptocurrency.
            </p>
            <p className="text-sm">
              <strong>Beta Status:</strong> The platform is currently in beta. Features and tokenomics may change based on user feedback and market conditions.
            </p>
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
          <Link href="/roadmap">
            <Button variant="default">
              <i className="fas fa-road mr-2"></i>
              View Roadmap
            </Button>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          © 2025 KushKlicker. Building the future of Web3 gaming with trust and security.
        </p>
      </div>
    </div>
  );
}