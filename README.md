# HYPERSPACE HELLFIRE
## Game Design Document

---

## 1. CORE GAMEPLAY

### Concept
Hyperspace Hellfire is an intense bullet hell shoot-'em-up set in space, where players control a small, nimble spaceship, navigating through waves of enemies while avoiding massive bullet patterns.

### Gameplay Loop
- Navigate through scrolling levels
- Shoot enemies
- Dodge intricate bullet patterns
- Collect power-ups
- Defeat boss encounters
- Progress through increasingly difficult levels

### Game Mode
- Single-player only

### Movement Mechanics
- Player ship always points upward
- Movement in all directions using arrow keys
- Vertical scrolling levels

---

## 2. PLAYER CHARACTER

### Ship Design
- Small and nimble spacecraft
- Clearly visible against space backgrounds
- Pixel art style with distinct silhouette

### Controls
- **Arrow Keys**: Movement in all directions
- **Space**: Fire main weapon
- **Z**: Activate special attack (when meter is full)

### Life System
- One-hit death (contact with any enemy or bullet is fatal)
- Three lives at the start of the game
- Instant respawn upon death until no lives remain
- Player loses one weapon level after losing a life

### Special Attack
- Huge beam weapon that lasts 3 seconds
- Deals massive damage to all enemies in its path
- Special meter fills by killing enemies
- Cannot be activated until meter is completely full
- Visual and audio cues indicate when special attack is ready

---

## 3. ENEMIES

### Enemy Spawn System
- Enemies appear in choreographed waves
- Wave difficulty increases as levels progress
- Later levels have more complex wave patterns and frequency

### Simple Enemies (Common)

#### Drones
- Small, agile ships that appear in swarms
- Move in formation patterns
- Fire single bullets in predictable patterns
- Low health
- Low score value

#### Miners
- Medium-sized ships
- Launch explosive projectiles that split into smaller bullets when they detonate
- Medium health
- Medium score value

#### Sentries
- Stationary turrets
- Track player movement
- Fire concentrated bursts of bullets toward player position
- Medium health
- Medium score value

#### Pulsars
- Emit circular waves of bullets at regular intervals
- Create rhythmic patterns for player to navigate
- Medium health
- Medium score value

#### Shielders
- Defensive units with protective barriers
- Bullets bounce off walls and obstacles
- Create unpredictable bullet trajectories
- Medium-high health
- Higher score value

### Elite Enemies (Rare)

#### Void Harbinger
- Creates bullet-absorbing black holes
- Black holes suddenly collapse and release all captured projectiles in omnidirectional blasts
- High health
- High score value

#### Quantum Weaver
- Generates intricate geometric bullet patterns
- Patterns transform and rotate
- Requires precise movement to find safe paths
- High health
- High score value

#### Star Eater
- Absorbs nearby simple enemies to power up
- Grows stronger with each consumption
- Releases homing missiles
- Creates temporary bullet walls
- Very high health
- Very high score value

---

## 4. BOSSES

### First Boss: The Vanguard
- Massive battle cruiser with multiple weapon systems
- Systems activate in sequence
- Features rotating shield generators that must be destroyed to expose its core
- Specific parts must be targeted to damage the boss
- Some attacks require player to stay in specific spots to evade
- Appears at the end of Level 3

### Second Boss: The Architect
- Controls the battlefield by creating structures that limit movement space
- Launches complex bullet patterns
- Can repair itself
- Summons simple enemies as reinforcements
- Specific parts must be targeted to damage the boss
- Some attacks require player to stay in specific spots to evade
- Appears at the end of Level 6

### Final Boss: The Stellar Sovereign
- Three distinct phases with separate HP bars

#### Phase 1 (Ascension)
- Relies on overwhelming firepower
- Fills the screen with intricate bullet patterns
- Remains relatively stationary

#### Phase 2 (Convergence)
- Splits into multiple smaller versions
- Smaller versions attack in coordination
- Requires tracking multiple threats simultaneously

#### Phase 3 (Transcendence)
- Transforms into true form
- Alters game physics
- Creates previously unseen bullet patterns
- Features brief vulnerability windows between massive attack sequences
- Appears at the end of Level 9

---

## 5. LEVELS & PROGRESSION

### Level Structure
- 9 levels total
- Linear progression
- Boss encounters after levels 3, 6, and 9
- Theme, background, and music change after each boss

### Enemy Scaling
Enemy counts per level:
- **Level 1:** 50 standard enemies, 1 elite enemy
- **Level 2:** 70 standard enemies, 2 elite enemies
- **Level 3:** 98 standard enemies, 2 elite enemies, BOSS 1
- **Level 4:** 137 standard enemies, 3 elite enemies
- **Level 5:** 192 standard enemies, 3 elite enemies
- **Level 6:** 269 standard enemies, 4 elite enemies, BOSS 2
- **Level 7:** 376 standard enemies, 4 elite enemies
- **Level 8:** 527 standard enemies, 5 elite enemies
- **Level 9:** 738 standard enemies, 5 elite enemies, FINAL BOSS

### Scaling Formula
- Standard Enemies: 50 × (1.4)^(n-1) rounded to nearest whole number
- Elite Enemies: ⌊n/2⌋ + 1 (integer division by 2, plus 1)

### Save System
- Game saves progress after completing a level
- No checkpoints within levels
- Player must complete each level in one session

---

## 6. WEAPONS & POWER-UPS

### Main Weapon System
Player's main weapon can be leveled up to level 10 by collecting power-ups dropped by elite enemies.

#### Level 1: Pulse Blaster
- One small blue energy bullet per second
- Basic damage, straightforward trajectory
- Simple audio: soft "pew" sound

#### Level 2: Dual Pulse
- Two larger blue energy bullets per second
- Bullets spread slightly for better coverage
- Enhanced audio: deeper "pew" sound

#### Level 3: Tri-Shot
- Three medium bullets in a spread pattern
- Slight homing capability on the outer bullets
- Visual effect: bullets leave a faint trail

#### Level 4: Quad Barrage
- Four bullets in rapid succession (2 per 0.5 seconds)
- Bullets penetrate through weaker enemies
- Visual effect: bullets create small explosions on impact

#### Level 5: Nova Stream
- Continuous beam of energy instead of bullets
- Deals damage tick-by-tick (equivalent to 5 DPS)
- Visual effect: pulsating beam with particle effects
- Audio: satisfying humming sound that intensifies

#### Level 6: Radial Burst
- Six bullets in a wide spread pattern
- Secondary effect: each bullet splits into three smaller projectiles upon impact
- Visual: primary bullets have a glowing core with electric arcs

#### Level 7: Phase Cannon
- Powerful charged shots (one per second)
- Each shot passes through all enemies in its path
- Creates damaging rifts where it hits that persist for 1.5 seconds
- Visual: distortion effects around the shots, screen slightly shakes on firing

#### Level 8: Stellar Cascade
- Eight homing projectiles per second
- Projectiles chain to nearby enemies after hitting initial target
- Visual: comet-like appearance with particle trails in multiple colors
- Audio: ethereal chiming sounds when projectiles chain between targets

#### Level 9: Void Artillery
- Fires massive energy spheres (1.5 per second)
- Each sphere creates a gravity well on impact, pulling enemies in and damaging them
- Secondary effect: smaller enemies caught in gravity wells are temporarily stunned
- Visual: dark purple/black spheres with swirling energy patterns

#### Level 10: Cosmic Annihilation
- Unleashes a combination attack system:
  - Primary: Continuous destructive beam that sweeps across the screen
  - Secondary: Orbiting shield of 12 energy projectiles that damage enemies on contact
  - Passive: Random lightning strikes target 3 enemies per second
- Visual: screen edges glow with cosmic energy, player ship appears to channel power from beyond
- Audio: orchestral crescendo mixed with electronic elements that responds to enemy destruction

### Power-Ups
Simple enemies have a 5% chance to drop one of the following power-ups:

#### Time Warp
- Slows down all enemy movement and bullets by 50% for 15 seconds
- Gives player time to navigate dense bullet patterns

#### Shield Matrix
- Generates a protective barrier that absorbs up to 3 hits
- Lasts 20 seconds or until all charges are used

#### Spread Fire
- Temporarily adds 45° angle shots to main weapon
- Effectively triples attack coverage
- Lasts 12 seconds

#### Payload Amplifier
- Doubles the size and damage of weapon projectiles
- Lasts 10 seconds

#### Quantum Echo
- Creates a mirrored copy of the player ship
- Copy mimics movements with a 0.5-second delay
- Copy fires duplicates of player shots
- Lasts 15 seconds

#### Gravity Well
- Deploys a vortex that pulls in and destroys enemy bullets
- Does not affect enemies themselves
- Lasts 8 seconds

#### Overdrive
- Doubles fire rate for 10 seconds
- Dramatically increases DPS

#### Neutron Bomb
- One-time screen-clearing explosion
- Destroys all basic enemies and bullets
- Deals 30% damage to elites
- Deals 10% damage to bosses

#### Phasing
- Grants temporary invulnerability for 5 seconds
- Allows passing through bullets and enemies without taking damage

#### Missile Swarm
- Launches a barrage of 12 homing missiles
- Missiles seek out enemies over 8 seconds
- Prioritizes elite enemies if present

---

## 7. VISUAL STYLE & AUDIO

### Visual Style
- Pixel art aesthetic
- Space setting with parallax scrolling backgrounds
- Vibrant bullet patterns with distinct color coding
- Visual feedback for all player actions
- Screen shake for impactful moments
- Particle effects for explosions and weapon impacts

### Audio Design
- Fast-paced dubstep and drum 'n' bass soundtrack
- Music changes after each boss (new theme for next set of levels)
- Sound effects for:
  - Player weapons (different for each weapon level)
  - Enemy attacks
  - Power-up collection
  - Special attack activation
  - Player death
  - Enemy destruction
  - Boss phase transitions

---

## 8. TECHNICAL DETAILS

### Development Platform
- React (JSX)
- JavaScript
- Phaser.js

### Target Platforms
- PC (browser-based)
- Potential for mobile adaptation later

### Performance Goals
- Consistent 60 FPS
- Smooth animation even with hundreds of bullets on screen
- Responsive controls with no input lag
- Low memory footprint

---

## 9. UI & GAME SYSTEMS

### HUD Elements
- Lives count
- Special attack meter
- Score
- Enemy count remaining
- Boss health bar (during boss encounters)

### Hitbox System
- Full ship collision (entire ship sprite acts as hitbox)
- Pixel-perfect collision detection

### Scoring System
- Points awarded based on enemy rarity
- Simple enemies: Low point value
- Elite enemies: Higher point value
- Bosses: Highest point value

---

## 10. FUTURE CONSIDERATIONS

### Potential Features for Future Updates
- Story/narrative elements
- End-game content after final boss
- New Game+ mode with increased difficulty
- Additional levels and bosses
- Adjustable difficulty settings
- Leaderboards
- Achievements