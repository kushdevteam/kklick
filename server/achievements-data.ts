// 50 Comprehensive Achievements for Kush Klicker
import type { InsertAchievement } from "@shared/schema";

export const FIFTY_ACHIEVEMENTS: InsertAchievement[] = [
  // Beginner Achievements (1-10)
  { name: "First Steps", description: "Click 10 times", requirement: 10, requirementType: "total_clicks", reward: 5, icon: "fas fa-baby" },
  { name: "Collect 5 KUSH", description: "Earn your first 5 KUSH", requirement: 5, requirementType: "total_kush", reward: 10, icon: "fas fa-cannabis" },
  { name: "Green Thumb", description: "Reach 25 total KUSH", requirement: 25, requirementType: "total_kush", reward: 25, icon: "fas fa-thumbs-up" },
  { name: "Speed Demon", description: "Click 250 times", requirement: 250, requirementType: "total_clicks", reward: 50, icon: "fas fa-tachometer-alt" },
  { name: "First Purchase", description: "Buy your first upgrade", requirement: 1, requirementType: "upgrades_bought", reward: 20, icon: "fas fa-shopping-bag" },
  { name: "Century Club", description: "Reach 100 total KUSH", requirement: 100, requirementType: "total_kush", reward: 50, icon: "fas fa-hundred-points" },
  { name: "Persistent Clicker", description: "Click 500 times", requirement: 500, requirementType: "total_clicks", reward: 100, icon: "fas fa-mouse" },
  { name: "Small Fortune", description: "Accumulate 500 KUSH", requirement: 500, requirementType: "total_kush", reward: 200, icon: "fas fa-piggy-bank" },
  { name: "Early Adopter", description: "Buy 3 upgrades", requirement: 3, requirementType: "upgrades_bought", reward: 75, icon: "fas fa-star" },
  { name: "Daily Grower", description: "Play for 24 hours total", requirement: 86400, requirementType: "time_played", reward: 250, icon: "fas fa-calendar-day" },

  // Intermediate Achievements (11-25)
  { name: "Kush Collector", description: "Collect 1,000 KUSH", requirement: 1000, requirementType: "total_kush", reward: 500, icon: "fas fa-coins" },
  { name: "Big Spender", description: "Buy 5 upgrades", requirement: 5, requirementType: "upgrades_bought", reward: 100, icon: "fas fa-shopping-cart" },
  { name: "Click Master", description: "Click 1,000 times", requirement: 1000, requirementType: "total_clicks", reward: 200, icon: "fas fa-hand-point-up" },
  { name: "Entrepreneur", description: "Earn 2,500 KUSH", requirement: 2500, requirementType: "total_kush", reward: 1000, icon: "fas fa-briefcase" },
  { name: "Upgrade Enthusiast", description: "Purchase 10 upgrades", requirement: 10, requirementType: "upgrades_bought", reward: 300, icon: "fas fa-level-up-alt" },
  { name: "Five Thousand Club", description: "Accumulate 5,000 KUSH", requirement: 5000, requirementType: "total_kush", reward: 2000, icon: "fas fa-medal" },
  { name: "Clicking Frenzy", description: "Click 2,500 times", requirement: 2500, requirementType: "total_clicks", reward: 500, icon: "fas fa-fire" },
  { name: "Business Owner", description: "Buy 15 upgrades", requirement: 15, requirementType: "upgrades_bought", reward: 750, icon: "fas fa-building" },
  { name: "Ten Thousand", description: "Reach 10,000 total KUSH", requirement: 10000, requirementType: "total_kush", reward: 5000, icon: "fas fa-gem" },
  { name: "Dedicated Player", description: "Play for 3 days total", requirement: 259200, requirementType: "time_played", reward: 1000, icon: "fas fa-clock" },
  { name: "Click Champion", description: "Click 5,000 times", requirement: 5000, requirementType: "total_clicks", reward: 1000, icon: "fas fa-trophy" },
  { name: "Investment Guru", description: "Buy 20 upgrades", requirement: 20, requirementType: "upgrades_bought", reward: 1500, icon: "fas fa-chart-line" },
  { name: "Quarter Million", description: "Earn 25,000 KUSH", requirement: 25000, requirementType: "total_kush", reward: 10000, icon: "fas fa-crown" },
  { name: "Automation King", description: "Have 100 auto income per second", requirement: 360000, requirementType: "auto_income", reward: 5000, icon: "fas fa-robot" },
  { name: "Week Player", description: "Play for 1 week total", requirement: 604800, requirementType: "time_played", reward: 5000, icon: "fas fa-calendar-week" },

  // Advanced Achievements (26-40)
  { name: "Fifty Thousand", description: "Accumulate 50,000 KUSH", requirement: 50000, requirementType: "total_kush", reward: 25000, icon: "fas fa-diamond" },
  { name: "Click God", description: "Click 10,000 times", requirement: 10000, requirementType: "total_clicks", reward: 2500, icon: "fas fa-bolt" },
  { name: "Empire Builder", description: "Buy 30 upgrades", requirement: 30, requirementType: "upgrades_bought", reward: 5000, icon: "fas fa-chess-king" },
  { name: "Hundred Thousand", description: "Reach 100,000 KUSH", requirement: 100000, requirementType: "total_kush", reward: 50000, icon: "fas fa-mountain" },
  { name: "Auto Millionaire", description: "Have 500 auto income per second", requirement: 1800000, requirementType: "auto_income", reward: 25000, icon: "fas fa-money-bill-wave" },
  { name: "Marathon Clicker", description: "Click 25,000 times", requirement: 25000, requirementType: "total_clicks", reward: 10000, icon: "fas fa-running" },
  { name: "Upgrade Master", description: "Purchase 40 upgrades", requirement: 40, requirementType: "upgrades_bought", reward: 15000, icon: "fas fa-graduation-cap" },
  { name: "Quarter Million Plus", description: "Accumulate 250,000 KUSH", requirement: 250000, requirementType: "total_kush", reward: 100000, icon: "fas fa-palace" },
  { name: "Monthly Player", description: "Play for 30 days total", requirement: 2592000, requirementType: "time_played", reward: 50000, icon: "fas fa-calendar-alt" },
  { name: "Cannabis Tycoon", description: "Have 1000 auto income per second", requirement: 3600000, requirementType: "auto_income", reward: 100000, icon: "fas fa-industry" },
  { name: "Half Million", description: "Earn 500,000 KUSH", requirement: 500000, requirementType: "total_kush", reward: 250000, icon: "fas fa-treasure-chest" },
  { name: "Ultra Clicker", description: "Click 50,000 times", requirement: 50000, requirementType: "total_clicks", reward: 25000, icon: "fas fa-meteor" },
  { name: "Franchise Owner", description: "Buy 50 upgrades", requirement: 50, requirementType: "upgrades_bought", reward: 50000, icon: "fas fa-store" },
  { name: "Millionaire", description: "Reach 1,000,000 KUSH", requirement: 1000000, requirementType: "total_kush", reward: 500000, icon: "fas fa-university" },
  { name: "Automation God", description: "Have 2500 auto income per second", requirement: 9000000, requirementType: "auto_income", reward: 250000, icon: "fas fa-cog" },

  // Elite Achievements (41-50)
  { name: "Multi Millionaire", description: "Accumulate 5,000,000 KUSH", requirement: 5000000, requirementType: "total_kush", reward: 1000000, icon: "fas fa-rocket" },
  { name: "Click Legend", description: "Click 100,000 times", requirement: 100000, requirementType: "total_clicks", reward: 100000, icon: "fas fa-infinity" },
  { name: "Ultimate Investor", description: "Buy 75 upgrades", requirement: 75, requirementType: "upgrades_bought", reward: 250000, icon: "fas fa-chess-queen" },
  { name: "Ten Million Club", description: "Earn 10,000,000 KUSH", requirement: 10000000, requirementType: "total_kush", reward: 2000000, icon: "fas fa-globe" },
  { name: "Auto Billionaire", description: "Have 5000 auto income per second", requirement: 18000000, requirementType: "auto_income", reward: 1000000, icon: "fas fa-satellite" },
  { name: "Persistent Legend", description: "Play for 100 days total", requirement: 8640000, requirementType: "time_played", reward: 500000, icon: "fas fa-hourglass-end" },
  { name: "Cannabis Emperor", description: "Buy 100 upgrades", requirement: 100, requirementType: "upgrades_bought", reward: 1000000, icon: "fas fa-chess-king" },
  { name: "Fifty Million", description: "Accumulate 50,000,000 KUSH", requirement: 50000000, requirementType: "total_kush", reward: 10000000, icon: "fas fa-space-shuttle" },
  { name: "Click Immortal", description: "Click 250,000 times", requirement: 250000, requirementType: "total_clicks", reward: 500000, icon: "fas fa-atom" },
  { name: "Galactic Empire", description: "Reach 100,000,000 KUSH", requirement: 100000000, requirementType: "total_kush", reward: 25000000, icon: "fas fa-galaxy" }
];