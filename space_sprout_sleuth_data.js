// Space Sprout Sleuth — Game Data
// All case content, clues, diagnoses, explanations, and ranks

// Embedded spritesheet frame data — avoids fetch() so game works from file:// protocol
const SPRITE_FRAMES = {
  // All 5 crew spritesheets share identical layout: 9 anim frames (100x100) + 1 portrait (96x96)
  crew: [
    { frame: {x:1,y:1,w:100,h:100} },     { frame: {x:103,y:1,w:100,h:100} },
    { frame: {x:205,y:1,w:100,h:100} },    { frame: {x:1,y:103,w:100,h:100} },
    { frame: {x:103,y:103,w:100,h:100} },  { frame: {x:205,y:103,w:100,h:100} },
    { frame: {x:1,y:205,w:100,h:100} },    { frame: {x:103,y:205,w:100,h:100} },
    { frame: {x:205,y:205,w:100,h:100} },  { frame: {x:307,y:1,w:96,h:96} }
  ],
  // UI spritesheet: icons, portraits, title sprout (NO badges — those are in badge_spritesheet)
  ui: [
    { filename: "icon_alien_logs.png",        frame: {x:1,y:1,w:24,h:24} },
    { filename: "icon_alien_plants.png",     frame: {x:27,y:1,w:24,h:24} },
    { filename: "icon_alien_sensors.png",    frame: {x:53,y:1,w:24,h:24} },
    { filename: "icon_logs.png",             frame: {x:79,y:1,w:25,h:32} },
    { filename: "icon_plants.png",           frame: {x:106,y:1,w:26,h:32} },
    { filename: "icon_sensors.png",          frame: {x:134,y:1,w:32,h:32} },
    { filename: "portrait_alien_logs.png",   frame: {x:168,y:1,w:48,h:48} },
    { filename: "portrait_alien_plants.png", frame: {x:1,y:51,w:96,h:96} },
    { filename: "portrait_alien_sensors.png", frame: {x:218,y:1,w:48,h:48} },
    { filename: "portrait_bioreactor.png",   frame: {x:99,y:51,w:96,h:96} },
    { filename: "portrait_europa.png",       frame: {x:197,y:51,w:96,h:96} },
    { filename: "portrait_logs.png",         frame: {x:1,y:149,w:96,h:96} },
    { filename: "portrait_lunar.png",        frame: {x:99,y:149,w:96,h:96} },
    { filename: "portrait_mars.png",         frame: {x:197,y:149,w:96,h:96} },
    { filename: "portrait_plants.png",       frame: {x:295,y:1,w:96,h:96} },
    { filename: "portrait_sensors.png",      frame: {x:295,y:99,w:96,h:96} },
    { filename: "title_sprout.png",          frame: {x:295,y:197,w:33,h:30} }
  ],
  // Badge spritesheet: 512x512 rank badges (displayed smaller in-game)
  badges: [
    { filename: "badge_chief_sprout_sleuth.png", frame: {x:1,y:1,w:512,h:512} },
    { filename: "badge_crop_specialist.png",     frame: {x:515,y:1,w:512,h:512} },
    { filename: "badge_field_agent.png",         frame: {x:1,y:515,w:512,h:512} },
    { filename: "badge_senior_sleuth.png",       frame: {x:515,y:515,w:512,h:512} },
    { filename: "badge_trainee.png",             frame: {x:1029,y:1,w:512,h:512} },
    { filename: "badge_xenobotanist.png",        frame: {x:1029,y:515,w:512,h:512} }
  ],
  // Alien character spritesheet: 5 mood variant portraits (no talk animation)
  alien: [
    { filename: "portrait_alien.png",          frame: {x:1,y:1,w:96,h:96} },
    { filename: "portrait_alien_confused.png", frame: {x:99,y:1,w:96,h:96} },
    { filename: "portrait_alien_grateful.png", frame: {x:1,y:99,w:96,h:96} },
    { filename: "portrait_alien_intrigued.png", frame: {x:99,y:99,w:96,h:96} },
    { filename: "portrait_alien_neutral.png",  frame: {x:197,y:1,w:96,h:96} }
  ]
};

const GAME_DATA = {
  ranks: ["Trainee", "Field Agent", "Crop Specialist", "Senior Sleuth", "Chief Sprout Sleuth", "Xenobotanist"],

  personalities: {
    patient:      { annoyThreshold: 3, lockThreshold: 5, recoveryOptions: true },
    professional: { annoyThreshold: 2, lockThreshold: 4, recoveryOptions: true },
    prickly:      { annoyThreshold: 1, lockThreshold: 3, recoveryOptions: false },
    stressed:     { annoyThreshold: 2, lockThreshold: 4, recoveryOptions: true },
    stoic:        { annoyThreshold: 4, lockThreshold: null, recoveryOptions: true },
    curious:      { annoyThreshold: 3, lockThreshold: null, recoveryOptions: true }
  },

  cases: [
    // ── CASE 1: ISS Greenhouse Module ─────────────────────────────
    {
      id: "iss",
      name: "ISS Greenhouse Module",
      location: "Low Earth Orbit",
      subtitle: "International Space Station",
      palette: {
        bg:        "#0a0e1a",
        bgMid:     "#1a2332",
        accent:    "#4fc3f7",
        highlight: "#e0f7fa",
        plant:     "#66bb6a"
      },
      // Sprite paths — drop PNGs here; game falls back to canvas/emoji if missing
      sprites: {
        scene: "sprites/scene_iss.png"             // 480x~560 or any size, fills left col
      },
      // Window region in sprite-space (240x280) where stars show through
      sceneWindow: { x: 71, y: 51, w: 98, h: 105 },
      briefing: "Dr. Nova, we have a situation aboard the International Space Station. The veggie growth chamber lettuce crop is alive, but stunted — roots are tangled into chaotic balls instead of growing downward, and leaves are small and pale. Astronaut Kim is waiting for you. Get up there and figure out what's going wrong.",

      // ── Dialogue tree sources (V2 engine) ──────────────────────────
      sources: {
        crew: {
          type: "conversation",
          speaker: "Astronaut Kim",
          personality: "patient",
          startMood: 0,
          nodes: {
            start: {
              text: "Dr. Nova! Thank goodness SAA sent someone. These plants are driving me up the wall. Or... they would if there was a consistent 'up.'",
              options: [
                { label: "What seems to be the problem?", goto: "problem_main" },
                { label: "How long have you been stationed here?", goto: "background" },
                { label: "Any theories of your own?", goto: "own_theory" },
                { label: "I noticed gravity reads zero here...", goto: "gravity_insight", requires: { clueFound: "ZERO_GRAVITY" } },
                { label: "The mission logs mention gravitropism issues...", goto: "gravitropism_discussion", requires: { nodeVisited: "logs.gravitropism_entry" } },
                { label: "The roots I examined are a tangled mess...", goto: "root_observation", requires: { clueFound: "ROOT_TANGLE" } },
                { label: "[Poke the floating lettuce]", goto: "poke_lettuce", isAction: true },
                { label: "I'll look around first.", goto: "exit_neutral" }
              ]
            },
            problem_main: {
              text: "The lettuce just doesn't seem to know which way is down. Back on Earth, roots always find their way into the soil. Up here? They go every which way. We planted them the same way we would on the ground.",
              revealsClue: "ROOTS_DIRECTIONLESS",
              setsFlag: "kim_mentioned_earth",
              options: [
                { label: "What have you tried so far?", goto: "attempts" },
                { label: "When did this start?", goto: "timeline" },
                { label: "Has anyone else worked on this?", goto: "prior_crew" },
                { label: "Let me ask about something else.", goto: "start" },
                { label: "That's helpful. Thanks.", goto: "exit_friendly" }
              ]
            },
            gravity_insight: {
              text: "Zero-g! Yes! That's the thing I keep dancing around but never quite landing on. On Earth, roots just... know. They grow down. Stems grow up. Maybe without gravity, they've lost their sense of direction entirely?",
              revealsClue: "ROOTS_DIRECTIONLESS",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "That's exactly what I'm thinking.", goto: "validate_theory" },
                { label: "Has anyone studied plants in microgravity?", goto: "prior_research" },
                { label: "How would we even fix that?", goto: "possible_solutions" },
                { label: "Let me confirm this elsewhere.", goto: "exit_friendly" }
              ]
            },
            gravitropism_discussion: {
              text: "Gravitropism! That's the word from the logs, right? I remember reading that entry but I didn't fully connect it. So the plants literally use gravity to orient themselves? And without it...",
              revealsClue: "ROOTS_DIRECTIONLESS",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "Exactly. No gravity means no orientation signal.", goto: "validate_theory" },
                { label: "The logs suggest physical guides could help.", goto: "guide_discussion" },
                { label: "I need to check a few more things.", goto: "exit_friendly" }
              ]
            },
            root_observation: {
              text: "You examined them too? I've stared at those roots for hours. They're not dead or unhealthy — they're just... confused. Growing in circles. Like they're searching for something they can't find.",
              revealsClue: "ROOTS_DIRECTIONLESS",
              bonusInsight: true,
              options: [
                { label: "They're searching for a gravity signal.", goto: "validate_theory" },
                { label: "The stems seem confused too.", goto: "stem_discussion" },
                { label: "Let me think on this.", goto: "exit_friendly" }
              ]
            },
            validate_theory: {
              text: "So it's not disease, not nutrients, not us doing something wrong. It's just... the fundamental physics of this place. Huh. That's actually kind of reassuring? At least it's not my fault.",
              moodShift: 1,
              options: [
                { label: "Not your fault at all.", goto: "reassurance" },
                { label: "Now we need a workaround.", goto: "possible_solutions" },
                { label: "I should confirm with the other sources.", goto: "exit_friendly" }
              ]
            },
            attempts: {
              text: "We've adjusted nutrient levels, tried different watering schedules, repositioned the LED arrays twice. Nothing helps. The roots just keep tangling up regardless of what we do.",
              options: [
                { label: "What about physical guides for the roots?", goto: "guide_discussion" },
                { label: "Maybe the issue isn't nutrients at all.", goto: "different_angle" },
                { label: "Let me ask about something else.", goto: "start" }
              ]
            },
            guide_discussion: {
              text: "Physical guides? Like... channels for the roots to follow? That's interesting. We don't have anything like that in the current setup. The seeds are just in these pillow things with wicking material.",
              options: [
                { label: "The wicking is for water, but roots might need more.", goto: "deep_insight" },
                { label: "I'll check if the logs mention this.", goto: "exit_friendly" }
              ]
            },
            deep_insight: {
              text: "You know, that makes sense. On Earth the soil itself is a guide — roots push through it seeking water and nutrients. Up here, there's nothing to push against. Nothing telling them where to go.",
              moodShift: 1,
              options: [
                { label: "Exactly. They need an alternative to gravity.", goto: "exit_friendly" },
                { label: "The mission logs might have more on this.", goto: "exit_friendly" }
              ]
            },
            background: {
              text: "Six months now. I volunteered for the ag rotation because I missed green things. Didn't expect the green things to be so... frustrating. I grew tomatoes on my balcony back home. Those just worked.",
              options: [
                { label: "Earth plants have it easy.", goto: "earth_comparison" },
                { label: "Tell me about the actual problem.", goto: "problem_main" },
                { label: "Let me ask about something else.", goto: "start" }
              ]
            },
            earth_comparison: {
              text: "Right? On Earth you just plant them, water them, and they figure out the rest. Up here it's like... they've forgotten how to be plants.",
              setsFlag: "kim_mentioned_earth",
              options: [
                { label: "Maybe they haven't forgotten — they're just missing something.", goto: "different_angle" },
                { label: "What exactly are they doing wrong?", goto: "problem_main" },
                { label: "Let me investigate.", goto: "exit_neutral" }
              ]
            },
            different_angle: {
              text: "Missing something? You mean like a nutrient? We've checked everything...",
              options: [
                { label: "Not a nutrient. Something more fundamental.", goto: "problem_main" },
                { label: "I need to check the sensors.", goto: "exit_neutral" }
              ]
            },
            own_theory: {
              text: "Honestly? I keep coming back to how different everything is up here. The water floats. The air doesn't move the same way. Maybe the plants just... can't cope with how weird this place is?",
              options: [
                { label: "You might be onto something.", goto: "encourage_theory" },
                { label: "Let's stick to specifics. What are the symptoms?", goto: "problem_main" },
                { label: "[Roll your eyes]", goto: "dismiss_theory", isAction: true }
              ]
            },
            encourage_theory: {
              text: "Really? I mean, I'm not a scientist. Just an astronaut who was voluntold to water the plants.",
              moodShift: 1,
              options: [
                { label: "Sometimes fresh eyes see things experts miss.", goto: "encouraged" },
                { label: "Tell me more about what you've observed.", goto: "problem_main" }
              ]
            },
            encouraged: {
              text: "Well... the roots. They're the weirdest part. They just grow in random curls instead of down. Everything else — leaves, stems — sort of follows from that.",
              revealsClue: "ROOTS_DIRECTIONLESS",
              moodShift: 1,
              options: [
                { label: "That's a key observation.", goto: "validate_theory" },
                { label: "I'll investigate the roots directly.", goto: "exit_friendly" }
              ]
            },
            dismiss_theory: {
              text: "...Okay. I'm just the person who's been living with these plants for six months, but sure, what do I know.",
              moodShift: -2,
              options: [
                { label: "Sorry, I didn't mean to dismiss you.", goto: "apologize" },
                { label: "Just tell me the facts.", goto: "problem_curt" },
                { label: "[Shrug]", goto: "shrug", isAction: true }
              ]
            },
            apologize: {
              text: "...It's fine. I know I'm not the expert here. It's just frustrating watching these plants struggle.",
              moodShift: 1,
              options: [
                { label: "Your observations matter. What have you noticed?", goto: "problem_main" },
                { label: "Let me look around and come back.", goto: "exit_neutral" }
              ]
            },
            shrug: {
              text: "You know what? Figure it out yourself. I've told you everything I know.",
              moodShift: -2,
              setMood: "annoyed",
              options: [
                { label: "Fine. I will.", goto: "exit_cold" },
                { label: "Wait, I'm sorry.", goto: "apologize_harder" }
              ]
            },
            apologize_harder: {
              text: "*sigh* I know you're under pressure. We all are. Just... please take this seriously.",
              moodShift: 1,
              setMood: "neutral",
              options: [
                { label: "I am. Tell me about the plants.", goto: "problem_main" },
                { label: "I'll come back when I have more information.", goto: "exit_neutral" }
              ]
            },
            problem_curt: {
              text: "Roots. Going everywhere. Not down. That's it.",
              revealsClue: "ROOTS_DIRECTIONLESS",
              options: [
                { label: "Thanks.", goto: "exit_cold" }
              ]
            },
            prior_crew: {
              text: "The previous rotation tried a few things. There are notes in the mission logs somewhere. I think they flagged it as an ongoing issue but never solved it.",
              options: [
                { label: "I'll check the logs.", goto: "exit_neutral" },
                { label: "What do you remember from their notes?", goto: "vague_memory" }
              ]
            },
            vague_memory: {
              text: "Something about... tropisms? Plant movements? I'm probably butchering the terminology. The logs would have the exact words.",
              options: [
                { label: "Tropisms. Got it. I'll check.", goto: "exit_neutral" },
                { label: "Let me ask about something else.", goto: "start" }
              ]
            },
            timeline: {
              text: "Since we planted them, basically. Three weeks now. They germinate fine, start growing, and then the roots just go haywire. Every batch. Every time.",
              options: [
                { label: "So it's consistent, not random.", goto: "consistent_issue" },
                { label: "What's different between germination and later growth?", goto: "germination_question" },
                { label: "Let me ask about something else.", goto: "start" }
              ]
            },
            consistent_issue: {
              text: "Completely consistent. If it was random I'd think contamination or bad seeds. But it's every single plant. There's something systematic going on.",
              options: [
                { label: "Something about this environment specifically.", goto: "environment_hint" },
                { label: "I'll investigate the conditions.", goto: "exit_neutral" }
              ]
            },
            environment_hint: {
              text: "This environment? You mean the station? I mean, it's a weird place to grow plants, but we've controlled for everything — temperature, humidity, nutrients...",
              options: [
                { label: "Maybe not everything.", goto: "exit_neutral" },
                { label: "What can't you control?", goto: "uncontrollable" }
              ]
            },
            uncontrollable: {
              text: "Well... gravity, obviously. Can't exactly turn that on. And cosmic radiation, but we're shielded. The vacuum outside, but the plants are sealed in. What else is there?",
              options: [
                { label: "Gravity. You just said it.", goto: "gravity_insight" },
                { label: "I need to check the sensors.", goto: "exit_neutral" }
              ]
            },
            germination_question: {
              text: "Good question. When they're seeds, they don't need to orient. They just soak up water and start growing. But once they're seedlings, they need to figure out which way is up and which way is down. That's when it goes wrong.",
              options: [
                { label: "How do plants normally figure that out?", goto: "how_plants_know" },
                { label: "Interesting. Let me investigate.", goto: "exit_friendly" }
              ]
            },
            how_plants_know: {
              text: "I... actually don't know. Roots go down, stems go up. It's just what they do. I never thought about *how* they know.",
              options: [
                { label: "That might be the key.", goto: "exit_friendly" },
                { label: "The mission logs might have more.", goto: "exit_neutral" }
              ]
            },
            prior_research: {
              text: "NASA's been growing plants up here for years. Veggie experiments, Zinnia, all kinds of things. I assume they've studied this, but I don't know the details. Maybe the logs have research summaries?",
              options: [
                { label: "I'll check the logs.", goto: "exit_neutral" },
                { label: "Let me ask about something else.", goto: "start" }
              ]
            },
            possible_solutions: {
              text: "Fix it? I don't know, give them something else to orient toward? If they can't sense gravity, maybe they can sense... light? Or physical barriers? Something to tell them which way to grow?",
              options: [
                { label: "Physical guides might work.", goto: "guide_discussion" },
                { label: "Light cues could help too.", goto: "light_cues" },
                { label: "I'll look into solutions.", goto: "exit_friendly" }
              ]
            },
            light_cues: {
              text: "We have directional LEDs. Maybe if we positioned them more precisely? Give the stems something to grow toward? Though I'm not sure that helps the roots...",
              options: [
                { label: "Roots might need a different solution.", goto: "exit_friendly" },
                { label: "Let me think about this.", goto: "exit_friendly" }
              ]
            },
            reassurance: {
              text: "Thanks, Dr. Nova. I've been beating myself up thinking I was killing the plants. Nice to know it's just physics being physics.",
              moodShift: 1,
              options: [
                { label: "We'll figure out a solution.", goto: "exit_friendly" },
                { label: "Now let me confirm with the other sources.", goto: "exit_friendly" }
              ]
            },
            stem_discussion: {
              text: "The stems too! They're supposed to grow toward light, right? Phototropism? They do, sort of, but it's sluggish. Like they're waiting for another signal that never comes.",
              options: [
                { label: "Gravity would normally help orient them.", goto: "validate_theory" },
                { label: "Let me check the lighting setup.", goto: "exit_neutral" }
              ]
            },
            poke_lettuce: {
              text: "Hey—! Don't poke the specimens! ...Okay, I've done it too. They just float there looking sad. But please, let's be professional.",
              moodShift: -1,
              setsAction: "poke_lettuce",
              options: [
                { label: "Sorry. What's the actual problem?", goto: "problem_main" },
                { label: "[Poke it again]", goto: "poke_again", isAction: true, requires: { moodIsNot: "angry" } },
                { label: "Just testing their responsiveness.", goto: "justify_poke" }
              ]
            },
            justify_poke: {
              text: "Their responsiveness? They're lettuce. They respond to light and water, not... poking.",
              moodShift: -1,
              options: [
                { label: "Fair point. Tell me about the real problem.", goto: "problem_main" },
                { label: "[Poke it anyway]", goto: "poke_again", isAction: true }
              ]
            },
            poke_again: {
              text: "Seriously? We're trying to do science here.",
              moodShift: -2,
              setMood: "annoyed",
              options: [
                { label: "Fine. What's wrong with the plants?", goto: "problem_curt" },
                { label: "[Keep poking]", goto: "poke_angry", isAction: true }
              ]
            },
            poke_angry: {
              text: "That's it. I'm done talking until you take this seriously. Go bother the sensors.",
              setMood: "angry",
              locksSource: true,
              options: [
                { label: "[Leave]", goto: "exit_angry" }
              ]
            },
            exit_friendly: {
              text: "Good luck, Dr. Nova. I hope you can figure this out — I'm getting tired of sad lettuce.",
              moodShift: 1,
              endsConversation: true,
              exitLabel: "Thanks, Kim"
            },
            exit_neutral: {
              text: "Let me know if you need anything else.",
              endsConversation: true,
              exitLabel: "Head back"
            },
            exit_cold: {
              text: "Sure. Whatever.",
              endsConversation: true,
              exitLabel: "Walk away"
            },
            exit_angry: {
              text: "[Kim turns away and pretends to check a panel.]",
              endsConversation: true,
              exitLabel: "Slink away..."
            },
            locked: {
              text: "[Kim is pointedly not looking at you. The lettuce floats between you accusingly.]",
              options: [
                { label: "Look, I'm sorry about earlier.", goto: "apology_attempt" },
                { label: "[Leave quietly]", goto: "exit_angry", isAction: true }
              ]
            },
            apology_attempt: {
              text: "*sigh* Fine. I accept your apology. But no more poking. What do you want to know?",
              setMood: "annoyed",
              locksSource: false,
              options: [
                { label: "What's wrong with the plants?", goto: "problem_curt" },
                { label: "I'll be more professional. Tell me everything.", goto: "problem_main" }
              ]
            }
          }
        },
        sensors: {
          type: "terminal",
          speaker: "ISS-GH Sensor Array",
          startState: "nominal",
          nodes: {
            start: {
              text: "+----------------------------------+\n|  ISS GREENHOUSE SENSOR ARRAY     |\n|  Status: ONLINE                  |\n+----------------------------------+\n\nAwaiting query.",
              options: [
                { label: "Display environmental readings", goto: "env_readings" },
                { label: "Display gravity data", goto: "gravity" },
                { label: "Display nutrient levels", goto: "nutrients" },
                { label: "Display light system status", goto: "light" },
                { label: "Run full diagnostic", goto: "diagnostic" },
                { label: "Query gravitropism baseline", goto: "gravitropism_query", requires: { nodeVisited: "logs.gravitropism_entry" } },
                { label: "[Force sensor recalibration]", goto: "recalibrate_warning", isAction: true },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            env_readings: {
              text: "═══ ENVIRONMENTAL READINGS ═══\n\nAir Temperature: 22°C [NOMINAL]\nHumidity: 65% [NOMINAL]\nCO₂ Level: 410 ppm [NOMINAL]\nO₂ Level: 21% [NOMINAL]\nAir Pressure: 101.3 kPa [NOMINAL]\n\nAll environmental parameters within acceptable ranges.",
              options: [
                { label: "What about gravity?", goto: "gravity" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            gravity: {
              text: "═══ GRAVITATIONAL DATA ═══\n\nGravitational Acceleration: 0.00 g\nStatus: MICROGRAVITY ENVIRONMENT\n\nNote: Standard for Low Earth Orbit facility. Station maintains freefall trajectory around Earth.",
              revealsClue: "ZERO_GRAVITY",
              options: [
                { label: "Is microgravity affecting the plants?", goto: "gravity_plant_note" },
                { label: "Can we simulate gravity?", goto: "gravity_simulation" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            gravity_plant_note: {
              text: "QUERY: Microgravity effects on plant biology\n\n[Searching database...]\n\nResult: Microgravity eliminates gravitropic orientation cues. Plants may exhibit:\n- Random root growth patterns\n- Delayed stem phototropism\n- Altered fluid transport\n\nRecommendation: Consult mission logs for mitigation strategies.",
              options: [
                { label: "This might be the problem.", goto: "gravity_confirmed" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            gravity_confirmed: {
              text: "ANALYSIS: High probability that microgravity is primary stressor.\n\nSuggested actions:\n- Review gravitropism documentation\n- Examine root growth patterns directly\n- Consult crew observations",
              options: [
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            gravity_simulation: {
              text: "QUERY: Artificial gravity options\n\nISS Greenhouse Module is not equipped with centrifugal systems.\n\nAlternative approaches:\n- Directional light cues (phototropism)\n- Physical root guides (thigmotropism)\n- Moisture gradients (hydrotropism)\n\nThese may partially substitute for gravitropic cues.",
              options: [
                { label: "Interesting alternatives.", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            nutrients: {
              text: "═══ NUTRIENT ANALYSIS ═══\n\nNitrogen (N): 150 ppm [NOMINAL]\nPhosphorus (P): 50 ppm [NOMINAL]\nPotassium (K): 200 ppm [NOMINAL]\nCalcium (Ca): 180 ppm [NOMINAL]\nMagnesium (Mg): 50 ppm [NOMINAL]\npH: 6.0 [NOMINAL]\n\nNutrient solution within optimal ranges for leafy greens.",
              options: [
                { label: "So nutrients aren't the problem.", goto: "nutrients_confirmed" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            nutrients_confirmed: {
              text: "ANALYSIS: Nutrient deficiency unlikely.\n\nCurrent readings match NASA Veggie protocol specifications. If plants are showing stress, cause is likely environmental rather than nutritional.",
              options: [
                { label: "What environmental factors?", goto: "env_factors" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            env_factors: {
              text: "KEY ENVIRONMENTAL DIFFERENCES FROM EARTH:\n\n1. Gravitational acceleration: 0.00 g\n2. Radiation exposure: elevated (shielded)\n3. Air circulation: fan-driven (no convection)\n4. Light source: artificial LEDs\n\nGravity differential is most significant deviation from terrestrial conditions.",
              options: [
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            light: {
              text: "═══ LIGHTING SYSTEM ═══\n\nType: LED Array (full spectrum)\nPhotoperiod: 16h ON / 8h OFF\nPAR: 250 µmol/m²/s [NOMINAL]\nSpectrum: Red 660nm, Blue 450nm, White fill\n\nLighting parameters optimal for leafy green cultivation.",
              options: [
                { label: "Light seems fine.", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            diagnostic: {
              text: "+----------------------------------+\n|     RUNNING FULL DIAGNOSTIC      |\n+----------------------------------+\n\n[████████████████████] 100%\n\nAll sensors nominal.\nNo hardware faults detected.\nCalibration current.\n\nNote: Diagnostic checks hardware only. Biological anomalies require direct observation.",
              options: [
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            gravitropism_query: {
              text: "QUERY: Gravitropism baseline\n\n[Accessing research database...]\n\nGravitropism baseline: NULL\nReason: No gravity vector available for measurement.\n\nIn microgravity, statoliths (gravity-sensing organelles) cannot settle. Plants lose primary orientation mechanism.\n\nThis is expected behavior, not a sensor fault.",
              revealsClue: "ZERO_GRAVITY",
              bonusInsight: true,
              options: [
                { label: "So the plants literally can't sense direction.", goto: "gravitropism_confirmed" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            gravitropism_confirmed: {
              text: "CORRECT.\n\nWithout gravitational force, statoliths remain suspended in statocyte cells. No settling = no directional signal.\n\nPlants default to random growth vectors or seek alternative cues (light, touch, moisture gradients).",
              options: [
                { label: "This confirms my hypothesis.", goto: "exit" },
                { label: "Back to main menu", goto: "start" }
              ]
            },
            recalibrate_warning: {
              text: "+----------------------------------+\n|          ! WARNING !             |\n+----------------------------------+\n\nManual recalibration may cause temporary sensor drift. This action is logged.\n\nProceed with recalibration?",
              options: [
                { label: "[Confirm recalibration]", goto: "recalibrate_result", isAction: true },
                { label: "Cancel", goto: "start" }
              ]
            },
            recalibrate_result: {
              text: "[RECALIBRATING...]\n\n[████████████████████] 100%\n\nRecalibration complete.\n\nResult: No significant drift detected. Previous calibration was accurate.\n\n(...That was anticlimactic. But at least nothing broke.)",
              options: [
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            exit: {
              text: "[Terminal session ended]",
              endsConversation: true,
              exitLabel: "Close terminal"
            }
          }
        },
        plants: {
          type: "examination",
          speaker: "Lettuce Specimen Tray",
          nodes: {
            start: {
              text: "You float over to the Veggie growth chamber. Several lettuce plants drift gently in their growing pillows, tethered by their own roots. Even at a glance, something seems off about them.",
              options: [
                { label: "Examine the leaves", goto: "leaves" },
                { label: "Examine the roots", goto: "roots" },
                { label: "Examine the stems", goto: "stems" },
                { label: "Check the growing medium", goto: "medium" },
                { label: "[Taste a leaf]", goto: "taste", isAction: true },
                { label: "[Gently tug a plant]", goto: "tug", isAction: true },
                { label: "Step back", goto: "exit" }
              ]
            },
            leaves: {
              text: "The leaves are smaller than they should be — pale green, almost yellowish at the edges. They're not diseased or spotted, just... underdeveloped. Like the plant couldn't fully commit to growing them.",
              options: [
                { label: "Why would leaves be underdeveloped?", goto: "leaves_analysis" },
                { label: "Examine something else", goto: "start" },
                { label: "Step back", goto: "exit" }
              ]
            },
            leaves_analysis: {
              text: "Underdeveloped leaves usually indicate the plant is struggling with something fundamental — light, water, nutrients, or structural support. The plant diverts resources to survival rather than growth. But this isn't resource scarcity. It's more like... confusion.",
              options: [
                { label: "Examine the roots", goto: "roots" },
                { label: "Examine the stems", goto: "stems" },
                { label: "Step back", goto: "exit" }
              ]
            },
            roots: {
              text: "The roots are the strangest part. Instead of extending outward or downward to seek water and nutrients, they've curled into dense, tangled mats. Some have wrapped back around the seed pillow. Others spiral into knots. It's like they're searching for something they can't find.",
              revealsClue: "ROOT_TANGLE",
              options: [
                { label: "What would roots normally be searching for?", goto: "root_analysis" },
                { label: "Without gravity, they don't know which way is 'down'...", goto: "root_gravity_insight", requires: { clueFound: "ZERO_GRAVITY" } },
                { label: "Examine something else", goto: "start" },
                { label: "Step back", goto: "exit" }
              ]
            },
            root_analysis: {
              text: "On Earth, roots grow toward gravity (down) and moisture (wherever water is). They sense direction using specialized cells. Here, floating in microgravity with water delivered from all sides via wicking material, they have no gradient to follow. No 'down.' No 'toward.' Just... everywhere and nowhere.",
              options: [
                { label: "Check what the sensors say about gravity", goto: "exit" },
                { label: "Examine the stems", goto: "stems" },
                { label: "Step back", goto: "exit" }
              ]
            },
            root_gravity_insight: {
              text: "Exactly. Without a gravity vector, the root tip cells that normally sense 'down' are getting no signal. The statoliths — tiny starch grains that settle toward gravity — are just floating randomly. The roots are firing off growth in every direction, hoping to find something. But there's nothing to find.",
              bonusInsight: true,
              options: [
                { label: "This confirms the gravitropism theory.", goto: "exit" },
                { label: "Examine something else", goto: "start" }
              ]
            },
            stems: {
              text: "The stems are growing, but at odd angles. They seem to be reaching toward the LED lights, but sluggishly, like they're not fully committed. On Earth, stems grow upward confidently. Here, they look uncertain.",
              options: [
                { label: "Do stems also use gravity to orient?", goto: "stem_analysis" },
                { label: "Examine something else", goto: "start" },
                { label: "Step back", goto: "exit" }
              ]
            },
            stem_analysis: {
              text: "Stems respond to both light (phototropism) and gravity (negative gravitropism — they grow away from it). Without the gravity signal, phototropism alone isn't enough. The stem can sense the light, but without gravity confirming 'up,' it's hesitant. Like trying to navigate with only one landmark.",
              options: [
                { label: "The plants need gravity to orient properly.", goto: "exit" },
                { label: "Examine something else", goto: "start" }
              ]
            },
            medium: {
              text: "The growing medium is NASA's standard 'plant pillow' — a packet of arcillite (baked clay) with wicking material to distribute water. It looks fine. The water delivery system is functioning. The problem isn't with the medium or the water supply.",
              options: [
                { label: "So it's not a moisture issue.", goto: "moisture_confirmed" },
                { label: "Examine something else", goto: "start" },
                { label: "Step back", goto: "exit" }
              ]
            },
            moisture_confirmed: {
              text: "No. The wicking material delivers water evenly from all sides — which might actually be part of the problem. Roots normally grow toward moisture gradients. Here, with water everywhere, there's no 'toward' to grow toward.",
              options: [
                { label: "Another missing directional cue.", goto: "exit" },
                { label: "Examine the roots", goto: "roots" }
              ]
            },
            taste: {
              text: "You pluck a small leaf and pop it in your mouth. It's... fine. A bit bland, maybe. Slightly bitter. Nothing harmful, just underwhelming. Space lettuce: 3/10, would not recommend.",
              setsAction: "tasted_lettuce",
              options: [
                { label: "At least it's not toxic.", goto: "start" },
                { label: "I should focus on the actual problem.", goto: "start" }
              ]
            },
            tug: {
              text: "You gently pull on one of the plants. It resists slightly, then the entire root ball pops free of the growing pillow, trailing a tangled mess of white roots. The roots were barely anchored at all — they weren't growing into the medium, just curling around it.",
              setsAction: "tugged_plant",
              options: [
                { label: "Poor root anchoring. Interesting.", goto: "tug_analysis" },
                { label: "[Put it back]", goto: "put_back", isAction: true }
              ]
            },
            tug_analysis: {
              text: "On Earth, roots grow into soil and anchor firmly. Here, without gravity telling them which way to push, they've just wrapped around the surface. The plant has no foundation. No grip. No sense of 'here' versus 'there.'",
              revealsClue: "ROOT_TANGLE",
              options: [
                { label: "Gravity affects root behavior.", goto: "exit" },
                { label: "Examine something else", goto: "start" }
              ]
            },
            put_back: {
              text: "You tuck the plant back into its pillow as best you can. It floats there, looking faintly reproachful. Or maybe that's just you projecting.",
              options: [
                { label: "Examine something else", goto: "start" },
                { label: "Step back", goto: "exit" }
              ]
            },
            exit: {
              text: "You float back from the specimen tray, mentally cataloging what you've observed.",
              endsConversation: true,
              exitLabel: "Float back"
            }
          }
        },
        logs: {
          type: "archive",
          speaker: "Mission Log Archive",
          startAccess: "standard",
          nodes: {
            start: {
              text: "+----------------------------------+\n|   ISS MISSION LOG ARCHIVE        |\n|   Greenhouse Module Records      |\n+----------------------------------+\n\nEnter search query or select category.",
              options: [
                { label: "Search: plant growth issues", goto: "plant_issues" },
                { label: "Search: root problems", goto: "root_problems" },
                { label: "Search: gravitropism", goto: "gravitropism_entry" },
                { label: "Search: previous crew observations", goto: "crew_observations" },
                { label: "Search: Earth planting protocols", goto: "earth_protocols", requires: { flagSet: "kim_mentioned_earth" } },
                { label: "Search: root orientation studies", goto: "root_orientation", requires: { clueFound: "ROOT_TANGLE" } },
                { label: "Browse: Veggie experiment history", goto: "veggie_history" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            plant_issues: {
              text: "═══ SEARCH RESULTS: plant growth issues ═══\n\n3 results found:\n\n[001] Veggie-03 Post-Harvest Report\n[002] Growth Anomaly Documentation\n[003] Recommended Protocol Adjustments",
              options: [
                { label: "Read: Veggie-03 Post-Harvest Report", goto: "veggie03" },
                { label: "Read: Growth Anomaly Documentation", goto: "anomaly_doc" },
                { label: "Read: Protocol Adjustments", goto: "protocol_adjust" },
                { label: "New search", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            anomaly_doc: {
              text: "═══ GROWTH ANOMALY DOCUMENTATION ═══\n\nDate: [Expedition 67]\nAuthor: Dr. Santos, Payload Specialist\n\nObservations:\n- Lettuce seedlings exhibit abnormal root growth patterns\n- Roots grow in random vectors rather than downward\n- Stems show delayed phototropic response\n- Leaf development stunted compared to ground controls\n\nPreliminary assessment: Possible gravitropism disruption in microgravity environment. Recommend further investigation.",
              options: [
                { label: "Search: gravitropism", goto: "gravitropism_entry" },
                { label: "New search", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            gravitropism_entry: {
              text: "═══ GRAVITROPISM REFERENCE ═══\n\nGravitropism: The directional growth of plants in response to gravity.\n\n• Roots: positive gravitropism (grow toward gravity)\n• Stems: negative gravitropism (grow away from gravity)\n\nMechanism: Statocytes (specialized cells) contain statoliths (starch-filled amyloplasts). Statoliths settle toward gravity, triggering asymmetric auxin distribution. Auxin causes differential cell elongation → directional growth.\n\n⚠️ MICROGRAVITY NOTE:\nWithout gravity vector, statoliths do not settle. Plants lose primary orientation mechanism. Roots default to random growth patterns.\n\nRecommendation: Provide alternative orientation cues (directional light, physical root guides, moisture gradients) to substitute for gravitropic signal.",
              revealsClue: "GRAVITROPISM_MISSING",
              options: [
                { label: "This explains everything.", goto: "gravitropism_confirmed" },
                { label: "Are there documented solutions?", goto: "solutions_search" },
                { label: "New search", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            gravitropism_confirmed: {
              text: "ANALYSIS: Gravitropism disruption is well-documented challenge in space agriculture.\n\nKey insight: Plants do not \"know\" which way is down without gravity. All directional growth behaviors dependent on statoliths are compromised.\n\nThis is not a malfunction. It is expected plant behavior in microgravity.",
              options: [
                { label: "Search for solutions", goto: "solutions_search" },
                { label: "New search", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            solutions_search: {
              text: "═══ GRAVITROPISM SOLUTIONS ═══\n\nDocumented approaches to compensate for gravitropism loss:\n\n1. PHYSICAL GUIDES\n   Provide rigid channels or mesh for roots to follow.\n   Root tips exhibit thigmotropism (touch response).\n\n2. DIRECTIONAL LIGHT\n   Position LEDs to provide strong phototropic cue for stems.\n   Does not help root orientation.\n\n3. MOISTURE GRADIENTS\n   Create uneven water distribution to trigger hydrotropism.\n   Less reliable than gravitropism.\n\n4. CENTRIFUGAL SYSTEMS\n   Spinning growth chambers create artificial gravity.\n   Not currently available on ISS.",
              options: [
                { label: "Physical guides seem most practical.", goto: "guide_notes" },
                { label: "New search", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            guide_notes: {
              text: "═══ PHYSICAL ROOT GUIDE RESEARCH ═══\n\nNASA Ames Research Center has developed prototype \"root channel\" systems using biodegradable mesh. Early results promising.\n\nCurrent ISS plant pillows use wicking material that provides some tactile cue, but lacks directional guidance.\n\nRecommendation: Future missions should include structured root guides to replace gravitropic signal.",
              options: [
                { label: "Good to know for the future.", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            root_problems: {
              text: "═══ SEARCH RESULTS: root problems ═══\n\n2 results found:\n\n[001] Root Morphology in Microgravity (Research Summary)\n[002] Growth Anomaly Documentation",
              options: [
                { label: "Read: Root Morphology in Microgravity", goto: "root_morph" },
                { label: "Read: Growth Anomaly Documentation", goto: "anomaly_doc" },
                { label: "New search", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            root_morph: {
              text: "═══ ROOT MORPHOLOGY IN MICROGRAVITY ═══\n\nResearch Summary — Johnson Space Center\n\nFindings:\nRoots grown in microgravity exhibit:\n- Decreased primary root length\n- Increased lateral root branching\n- Random growth vectors (no consistent direction)\n- Reduced gravitropic response (obviously)\n- Normal hydrotropic response (toward moisture)\n- Normal thigmotropic response (around obstacles)\n\nConclusion: Roots require at least one directional cue to grow efficiently. In microgravity, light, touch, or moisture must substitute for gravity.",
              revealsClue: "GRAVITROPISM_MISSING",
              options: [
                { label: "This confirms the gravitropism issue.", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            crew_observations: {
              text: "═══ CREW OBSERVATION LOGS ═══\n\n[Expedition 65 - Astronaut Chen]\n\"Plants look healthy enough but the roots are weird. Tangled up like they don't know where to go. Reminds me of my first week up here — I didn't know which way was up either.\"\n\n[Expedition 66 - Astronaut Patel]\n\"Harvested the lettuce early. Roots never anchored properly. Stems grew toward the lights but slowly. Not sure what's going on.\"",
              options: [
                { label: "Multiple crews have noticed this.", goto: "crew_pattern" },
                { label: "New search", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            crew_pattern: {
              text: "PATTERN DETECTED:\n\nRoot anomalies reported by:\n- Expedition 65 (Chen)\n- Expedition 66 (Patel)\n- Expedition 67 (Santos)\n- Current mission (Kim)\n\nThis is a persistent issue, not a one-time anomaly. Likely environmental rather than procedural.",
              options: [
                { label: "It's something about this environment.", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            veggie_history: {
              text: "═══ VEGGIE EXPERIMENT HISTORY ═══\n\nThe Veggie hardware was installed in 2014 to grow fresh food on ISS.\n\nNotable achievements:\n- 2015: First space-grown food eaten (red romaine lettuce)\n- 2016: First flower bloomed in space (zinnia)\n- 2018: Successful dwarf wheat cultivation\n- 2021: Chile peppers grown and harvested\n\nOngoing challenges:\n- Root orientation in microgravity\n- Pollination of fruiting crops\n- Maintaining plant health across full growth cycle",
              options: [
                { label: "Root orientation is a known challenge.", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            earth_protocols: {
              text: "═══ EARTH PLANTING PROTOCOLS ═══\n\nStandard terrestrial procedure:\n1. Plant seed in soil\n2. Water from above\n3. Wait for gravity to do the work\n\nGravity provides:\n- Directional cue for root growth (down)\n- Directional cue for stem growth (up)\n- Water drainage pattern (down through soil)\n- Consistent \"anchor\" reference for plant structure\n\nThese assumptions break in microgravity. Space planting requires explicit substitutes for each gravity-dependent mechanism.",
              bonusInsight: true,
              options: [
                { label: "Earth protocols assume gravity.", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            root_orientation: {
              text: "═══ ROOT ORIENTATION STUDIES ═══\n\nSummary: Multiple ISS experiments have documented root disorientation in microgravity.\n\nKey finding: Roots without gravity grow in \"skewing\" or \"waving\" patterns — curves and spirals rather than straight lines.\n\nHypothesis: Without statoliths settling, root tip cannot determine preferred growth direction. Growth becomes semi-random, influenced by touch and moisture but lacking clear vectoring.\n\nCross-reference: Gravitropism; Statocytes; Statoliths",
              bonusInsight: true,
              options: [
                { label: "Cross-reference: Gravitropism", goto: "gravitropism_entry" },
                { label: "New search", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            veggie03: {
              text: "═══ VEGGIE-03 POST-HARVEST REPORT ═══\n\nMission: Veggie-03A (Outredgeous Red Romaine)\nHarvest date: [REDACTED]\nYield: 87g (below target)\n\nNotes:\n- Plants grew but remained smaller than ground controls\n- Root mass concentrated near seed pillow, did not spread\n- Leaves pale green/yellow, possibly due to reduced chlorophyll\n- Taste test: acceptable but \"different\"\n\nRecommendation: Investigate root confinement issue.",
              options: [
                { label: "Root issues affect overall growth.", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            protocol_adjust: {
              text: "═══ RECOMMENDED PROTOCOL ADJUSTMENTS ═══\n\nBased on accumulated observations, future missions should:\n\n1. Install directional LED arrays for stronger phototropic cues\n2. Test physical root guides or mesh systems\n3. Consider moisture gradient delivery instead of uniform wicking\n4. Document root morphology throughout growth cycle\n5. Accept that microgravity yield will likely be lower than Earth equivalent",
              options: [
                { label: "These are workarounds, not solutions.", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            exit: {
              text: "[Archive session ended]",
              endsConversation: true,
              exitLabel: "Close archive"
            }
          }
        }
      },

      clues: [
        {
          action: "crew",
          label: "Talk to Crew",
          icon: "\ud83d\udc68\u200d\ud83d\ude80",
          speaker: "Astronaut Kim",
          sprites: {
            spritesheet:     "sprites/kim/spritesheet.png",
            spritesheetJson: "sprites/kim/spritesheet.json"
          },
          text: "The lettuce just doesn't seem to know which way is down. Back on Earth, roots always find their way into the soil. Up here? They go every which way. We planted them the same way we would on the ground.",
          clueTag: "ROOTS_DIRECTIONLESS",
          learned: "Roots are not orienting downward."
        },
        {
          action: "sensors",
          label: "Check Sensors",
          icon: "\ud83d\udcca",
          speaker: "ISS-GH Sensor Array",
          sprites: {
            portrait:   "portrait_sensors.png",
            actionIcon: "icon_sensors.png"
          },
          text: "Nutrient levels nominal. Water delivery functional. Air temp 22\u00b0C. Humidity 65%. Light cycle 16h/8h.\n\n\u26a0\ufe0f Gravitational acceleration: 0.00 g.",
          clueTag: "ZERO_GRAVITY",
          learned: "The module is in microgravity — zero g."
        },
        {
          action: "plants",
          label: "Examine Plants",
          icon: "\ud83c\udf31",
          speaker: "Lettuce Specimen Tray",
          sprites: {
            portrait:   "portrait_plants.png",
            actionIcon: "icon_plants.png"
          },
          text: "The roots have formed dense, tangled mats around the seed pillow. Instead of extending outward to find water and nutrients, they've curled back on themselves. The stems are growing at odd angles despite the overhead lights.",
          clueTag: "ROOT_TANGLE",
          learned: "Roots can't orient themselves; stems not tracking light well."
        },
        {
          action: "logs",
          label: "Review Logs",
          icon: "\ud83d\udccb",
          speaker: "Mission Log Archive",
          sprites: {
            portrait:   "portrait_logs.png",
            actionIcon: "icon_logs.png"
          },
          text: "Previous mission log: \"Earth-based crop training assumes gravitropism for root guidance. Without gravity vector, roots default to random growth. Recommend installing directional light guides or physical root channels to provide alternative orientation cues.\"",
          clueTag: "GRAVITROPISM_MISSING",
          learned: "Plants use gravity to orient roots. No gravity = no orientation."
        }
      ],

      diagnoses: [
        {
          id: "gravity",
          label: "Microgravity is disrupting gravitropism — roots can't sense \"down\" without gravity and need physical guides or directional light to orient properly.",
          isCorrect: true
        },
        {
          id: "nutrients",
          label: "Nutrient solution is too concentrated, burning the roots.",
          isCorrect: false,
          hint: "Sensor data shows nutrients are nominal. Look at what's really different about this environment."
        },
        {
          id: "light",
          label: "Light cycle is wrong for lettuce growth.",
          isCorrect: false,
          hint: "16/8 is a standard photoperiod for lettuce. The issue is more fundamental than lighting schedules."
        },
        {
          id: "seeds",
          label: "The seed stock has a genetic defect.",
          isCorrect: false,
          hint: "This same seed variety grows perfectly on Earth. What's different up here?"
        }
      ],

      rankUpText: "You just learned about gravitropism \u2014 a survival system plants have used for 470 million years. Without it, space farming needs entirely new solutions.",

      explanation: {
        title: "Gravitropism: How Plants Know Which Way Is Down",
        body: "On Earth, plants sense gravity using specialized cells called statocytes, which contain tiny starch-filled granules (statoliths). These granules settle to the bottom of the cell like sand in an hourglass, telling the root \"that way is down \u2014 grow toward it.\" This process is called gravitropism, and it's one of the most fundamental orientation systems in plant biology.\n\nIn microgravity, statoliths don't settle. They float. The plant loses its primary sense of direction. Roots grow randomly, often curling into tight balls, and stems may not orient toward light efficiently. NASA's Veggie experiment on the ISS solved this with specially designed \"plant pillows\" that use wicking material to guide roots toward water, and LED light banks positioned to give stems a strong directional cue.",
        funFact: "Astronaut Scott Kelly grew the first space-harvested red romaine lettuce in 2015 as part of the Veg-01 experiment. He described the taste as \"kind of like arugula.\""
      }
    },

    // ── CASE 2: Lunar Greenhouse ──────────────────────────────────
    {
      id: "lunar",
      name: "Lunar Greenhouse",
      location: "Shackleton Crater",
      subtitle: "Lunar South Pole",
      palette: {
        bg:        "#1a1a2e",
        bgMid:     "#2d2d44",
        accent:    "#b0bec5",
        highlight: "#eceff1",
        plant:     "#81c784"
      },
      sprites: {
        scene: "sprites/scene_lunar.png"
      },
      sceneWindow: { x: 0, y: 0, w: 240, h: 126, twinkle: true },
      briefing: "Attention Dr. Nova — Shackleton Crater lunar base reports a pollination crisis. Tomato plants are lush and flowering beautifully, but after 3 weeks of blooms, not a single fruit has set. Botanist Chen needs your expertise. Travel to the Moon and investigate.",

      // ── Dialogue tree sources (V2 engine) ──────────────────────────
      sources: {
        crew: {
          type: "conversation",
          speaker: "Botanist Chen",
          personality: "professional",
          startMood: 0,
          nodes: {
            start: {
              text: "Dr. Nova, welcome to Shackleton. I'll be honest — I'm embarrassed this got escalated. The plants are textbook-healthy. Beautiful flowers. But three weeks and not a single fruit. Something fundamental is wrong and I can't see it.",
              options: [
                { label: "Walk me through what you've observed.", goto: "problem_main" },
                { label: "What's your background with these cultivars?", goto: "background" },
                { label: "Could it be the soil?", goto: "soil_guess" },
                { label: "I noticed the air is very still in here...", goto: "airflow_insight", requires: { clueFound: "LOW_AIRFLOW" } },
                { label: "The design docs say pollination was never addressed.", goto: "docs_insight", requires: { clueFound: "NO_POLLINATION_PLAN" } },
                { label: "The pollen I examined isn't moving at all.", goto: "pollen_insight", requires: { clueFound: "POLLEN_UNDISTURBED" } }
              ]
            },
            problem_main: {
              text: "The flowers open on schedule. Color is perfect, anthers are full of pollen. Then after about five days, the whole flower just... drops off. No swelling, no fruit initiation. It's like the reproductive cycle stalls at the last step.",
              revealsClue: "FLOWERS_NO_FRUIT",
              options: [
                { label: "On Earth, how does fruit set normally happen?", goto: "earth_comparison" },
                { label: "Have you tried hand-pollinating?", goto: "hand_pollination" },
                { label: "Maybe the flowers are defective?", goto: "defective_guess" },
                { label: "Let me check the other sources.", goto: "exit_neutral" }
              ]
            },
            background: {
              text: "I've grown these exact cherry tomato cultivars for six years in controlled environments. They're prolific fruiters. That's why this is so frustrating — I know these plants. They should be producing.",
              options: [
                { label: "What's different about this environment?", goto: "whats_different" },
                { label: "Tell me about the flower drop.", goto: "problem_main" },
                { label: "I'll investigate and come back.", goto: "exit_neutral" }
              ]
            },
            whats_different: {
              text: "Lower gravity — one-sixth Earth. Sealed atmosphere. Custom LED lighting. Regolith-compost soil blend. Honestly, I've accounted for all of those. The plants adapted beautifully. It's specifically the fruit set that fails.",
              options: [
                { label: "What about air movement?", goto: "air_question" },
                { label: "Could reduced gravity affect pollination?", goto: "gravity_pollination" },
                { label: "I need to check the sensors.", goto: "exit_neutral" }
              ]
            },
            air_question: {
              text: "Air movement? It's a sealed habitat. We have CO2 scrubbers but... hmm. I suppose there's no real wind in here. I never thought about that. Why?",
              setsFlag: "chen_mentioned_air",
              options: [
                { label: "Wind helps move pollen. No wind, no transfer.", goto: "wind_revelation" },
                { label: "Just a hunch. Let me check the sensors.", goto: "exit_neutral" }
              ]
            },
            wind_revelation: {
              text: "...Of course. Wind. Vibration. Buzz pollination. On Earth there's always some physical force moving pollen around. Here there's nothing. The pollen just sits on the anthers. I can't believe I missed that.",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "It's easy to overlook. What about solutions?", goto: "solutions" },
                { label: "Let me confirm with the other sources.", goto: "exit_friendly" }
              ]
            },
            gravity_pollination: {
              text: "Interesting thought. In lower gravity, pollen would fall more slowly. But tomatoes are self-pollinating — the pollen just needs to reach the stigma within the same flower. Even in one-sixth gravity that shouldn't be a problem... unless nothing is moving it at all.",
              options: [
                { label: "So what normally moves it?", goto: "what_moves_pollen" },
                { label: "Let me check if there's any air movement.", goto: "exit_neutral" }
              ]
            },
            what_moves_pollen: {
              text: "Wind, mostly. Or insects — bees create vibrations that shake pollen loose. In commercial greenhouses on Earth they use bumblebees or fans or even hand-held vibrators on the stems. Here we have... none of those.",
              setsFlag: "chen_explained_vectors",
              options: [
                { label: "That sounds like the answer.", goto: "realization" },
                { label: "I need to verify with the sensors.", goto: "exit_neutral" }
              ]
            },
            realization: {
              text: "You might be right. No wind, no bees, no vibration of any kind. The pollen is just sitting there. Three weeks of perfect flowers and nobody thought to shake them.",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "What would you need to fix it?", goto: "solutions" },
                { label: "Let me confirm with the other sources.", goto: "exit_friendly" }
              ]
            },
            solutions: {
              text: "Small oscillating fans would help — even gentle airflow could do it. Or a vibrating wand pressed to the stems. Or honestly, just flicking the flowers by hand every morning. Bees do it best but we can't exactly keep a hive up here.",
              options: [
                { label: "NASA actually studied bees in space.", goto: "bee_trivia" },
                { label: "Fans seem like the simplest fix.", goto: "fans_solution" },
                { label: "I'll wrap up my investigation.", goto: "exit_friendly" }
              ]
            },
            bee_trivia: {
              text: "Really? I'd love to read about that. I wonder if they could handle lunar gravity. Probably impractical for a sealed habitat though — the colony maintenance alone...",
              moodShift: 1,
              options: [
                { label: "Fans are probably more practical.", goto: "fans_solution" },
                { label: "Good luck with the tomatoes.", goto: "exit_friendly" }
              ]
            },
            fans_solution: {
              text: "Agreed. I'll put in a requisition. In the meantime, I can start hand-pollinating with a small brush. Should see fruit within a week if that's really the issue. Thank you, Dr. Nova.",
              options: [
                { label: "Happy to help.", goto: "exit_friendly" }
              ]
            },
            soil_guess: {
              text: "The regolith blend? No, we tested extensively. Nutrients are optimal, pH is dialed in, the microbial culture is thriving. Whatever the problem is, it's not the soil.",
              moodShift: -1,
              options: [
                { label: "What about the flowers specifically?", goto: "problem_main" },
                { label: "Maybe the light spectrum?", goto: "light_guess" },
                { label: "I'll check the sensors.", goto: "exit_neutral" }
              ]
            },
            light_guess: {
              text: "Full-spectrum LEDs with UV components. The plants are flowering perfectly — if the light were wrong, we wouldn't even get flowers. Please, let's focus on what happens after the flowers open.",
              moodShift: -1,
              options: [
                { label: "Fair point. Tell me about the flower drop.", goto: "problem_main" },
                { label: "Let me investigate on my own.", goto: "exit_cold" }
              ]
            },
            defective_guess: {
              text: "Defective? These are proven cultivars from certified stock. And the flowers are morphologically perfect — I've checked under magnification. The issue isn't the flowers themselves.",
              moodShift: -1,
              options: [
                { label: "You're right, sorry. What else could it be?", goto: "earth_comparison" },
                { label: "Fine. I'll look elsewhere.", goto: "exit_cold" }
              ]
            },
            earth_comparison: {
              text: "On Earth, fruit set requires successful pollination. Pollen from the anther reaches the stigma, fertilization occurs, and the ovary develops into fruit. For tomatoes, this usually happens via wind vibration or insect activity.",
              options: [
                { label: "And here there's no wind or insects.", goto: "wind_revelation" },
                { label: "Could the reduced gravity affect pollen transfer?", goto: "gravity_pollination" },
                { label: "Let me examine the pollen directly.", goto: "exit_neutral" }
              ]
            },
            hand_pollination: {
              text: "Hand-pollinating? No, I... honestly it didn't occur to me. These cultivars are self-pollinating. I assumed the pollen would just... get there. Wait. Does it need physical help even in self-pollinators?",
              moodShift: 1,
              options: [
                { label: "Yes — wind or vibration normally handles it.", goto: "wind_revelation" },
                { label: "Let me check if the pollen is actually transferring.", goto: "exit_neutral" }
              ]
            },
            airflow_insight: {
              text: "The air is still? How still? I guess I never noticed because the temperature is fine, but... oh. Oh no. If there's no airflow at all, the pollen wouldn't move. Tomato flowers need physical disturbance to release pollen.",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "Exactly. No wind, no pollination.", goto: "realization" },
                { label: "The sensors say 0.01 m/s. Basically nothing.", goto: "realization" }
              ]
            },
            docs_insight: {
              text: "Pollination was never addressed? Let me see that... 'Strategy: TBD.' TBD?! Someone put TBD on a critical biological process and nobody followed up? This is a fundamental systems oversight.",
              bonusInsight: true,
              moodShift: -1,
              options: [
                { label: "At least now we know the cause.", goto: "solutions" },
                { label: "These things happen in new installations.", goto: "consolation" }
              ]
            },
            consolation: {
              text: "You're right. It's a new habitat, things get missed. I just wish it hadn't been something so... basic. Pollination 101.",
              moodShift: 1,
              options: [
                { label: "What matters is the fix.", goto: "solutions" },
                { label: "I'll finish my investigation.", goto: "exit_friendly" }
              ]
            },
            pollen_insight: {
              text: "You examined the pollen? And it's not moving? That confirms it. The grains are viable — they're just sitting on the anthers with nothing to transport them. No wind, no vibration, no insects. It's a pollination desert.",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "What's the fix?", goto: "solutions" },
                { label: "Let me confirm with the other sources.", goto: "exit_friendly" }
              ]
            },
            exit_friendly: {
              text: "Thank you, Dr. Nova. This is already the most productive conversation I've had about these plants. Let me know what else you find.",
              moodShift: 1,
              endsConversation: true,
              exitLabel: "Head out"
            },
            exit_neutral: {
              text: "Sure. Let me know if you need anything from my end.",
              endsConversation: true,
              exitLabel: "Head back"
            },
            exit_cold: {
              text: "Fine. The data is what it is. I'll be here when you want to discuss actual evidence.",
              endsConversation: true,
              exitLabel: "Walk away"
            }
          }
        },

        sensors: {
          type: "terminal",
          speaker: "Lunar-GH Sensor Array",
          nodes: {
            start: {
              text: "+----------------------------------+\n|  LUNAR-GH SENSOR ARRAY           |\n|  Status: ONLINE                  |\n+----------------------------------+\n\nAwaiting query.",
              options: [
                { label: "Display environmental readings", goto: "env_readings" },
                { label: "Display air circulation data", goto: "airflow" },
                { label: "Run full diagnostic", goto: "diagnostic" },
                { label: "Query: pollination requirements", goto: "pollination_query", requires: { clueFound: "NO_POLLINATION_PLAN" } },
                { label: "Query: airflow specs for pollination", goto: "airflow_pollination", requires: { flagSet: "chen_explained_vectors" } },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            env_readings: {
              text: "ENVIRONMENTAL SUMMARY\n--------------------\nSoil nutrients: OPTIMAL (custom regolith-compost blend)\nWater pH: 6.2 (nominal)\nLight: Full-spectrum LED, 14h/10h cycle\nTemp: 24C day / 18C night\nCO2: 800ppm\nHumidity: 70%\nGravity: 0.166g (lunar standard)\n\nAll parameters within growth thresholds.\nNo anomalies detected in primary metrics.",
              options: [
                { label: "Display air circulation data", goto: "airflow" },
                { label: "Anything flagged as borderline?", goto: "borderline" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            borderline: {
              text: "BORDERLINE ALERTS\n-----------------\n! Air circulation: 0.01 m/s\n  Note: Below recommended minimum for\n  most crop operations (0.5 m/s).\n  No active ventilation fans installed.\n  CO2 scrubbers provide minimal passive\n  air movement only.",
              options: [
                { label: "Display air circulation details", goto: "airflow" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            airflow: {
              text: "AIR CIRCULATION DATA\n--------------------\nCurrent airspeed: 0.01 m/s\nTarget airspeed: NOT CONFIGURED\nFan units installed: 0\nAir movement source: CO2 scrubber passive exhaust only\n\n! WARNING: Airspeed insufficient for\n  pollen dispersal, evapotranspiration\n  regulation, and stem strengthening.\n\nRecommendation: Install oscillating fans.",
              revealsClue: "LOW_AIRFLOW",
              options: [
                { label: "What is minimum airspeed for pollination?", goto: "pollination_airspeed" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            pollination_airspeed: {
              text: "REFERENCE: POLLINATION AIRSPEED\n-------------------------------\nTomato (self-pollinating): 0.5-1.0 m/s\n  or equivalent mechanical vibration\nCurrent reading: 0.01 m/s\n\nPollen release requires physical\ndisturbance of anther. Wind, insect\nactivity, or manual intervention\nare standard vectors.\n\nCurrent conditions: INSUFFICIENT\nfor passive pollination.",
              bonusInsight: true,
              options: [
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            pollination_query: {
              text: "QUERY: POLLINATION REQUIREMENTS\n-------------------------------\nSearching design specifications...\n\nResult: Pollination strategy listed\nas 'TBD' in greenhouse design docs.\nNo pollination equipment installed.\nNo insect colonies present.\nAir circulation insufficient for\npassive wind pollination.\n\nStatus: UNRESOLVED DESIGN GAP",
              bonusInsight: true,
              options: [
                { label: "Display air circulation data", goto: "airflow" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            airflow_pollination: {
              text: "QUERY: AIRFLOW SPECS FOR POLLINATION\n------------------------------------\nMinimum viable airspeed: 0.5 m/s\nOptimal range: 0.5 - 1.0 m/s\nCurrent: 0.01 m/s (2% of minimum)\n\nAlternative pollination vectors:\n- Mechanical vibration (60-90 Hz)\n- Manual brush transfer\n- Insect pollinators (not available)\n\nRecommendation: Install 2-4 oscillating\nfans rated 0.5-1.0 m/s output.",
              bonusInsight: true,
              options: [
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            diagnostic: {
              text: "+----------------------------------+\n|     RUNNING FULL DIAGNOSTIC      |\n+----------------------------------+\n\n[████████████████████] 100%\n\nAll sensors nominal.\nNo hardware faults detected.\nCalibration current.\n\nNote: No fan units detected in system.\nAir circulation hardware not installed.",
              options: [
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            exit: {
              text: "[Terminal session ended]",
              endsConversation: true,
              exitLabel: "Close terminal"
            }
          }
        },

        plants: {
          type: "examination",
          speaker: "Tomato Specimen Row",
          nodes: {
            start: {
              text: "A row of healthy tomato plants in raised beds filled with regolith-compost blend. Bright yellow flowers dot the branches. The plants look vigorous, but there's not a single fruit in sight.",
              options: [
                { label: "Examine the flowers", goto: "flowers" },
                { label: "Examine the stems and leaves", goto: "stems" },
                { label: "Examine the soil", goto: "soil" },
                { label: "Look for insects", goto: "insects" },
                { label: "Try shaking a stem", goto: "shake_stem", requires: { flagSet: "chen_explained_vectors" } },
                { label: "Step back", goto: "exit" }
              ]
            },
            flowers: {
              text: "The flowers are textbook-perfect. Five bright yellow petals, fused anthers forming a cone around the stigma. You can see fine pollen grains coating the anthers. But the stigma looks clean — no pollen has reached it.",
              options: [
                { label: "Look closer at the pollen", goto: "pollen_close" },
                { label: "Check if flowers are dropping", goto: "flower_drop" },
                { label: "Try touching the pollen", goto: "touch_pollen", isAction: true },
                { label: "Back to overview", goto: "start" }
              ]
            },
            pollen_close: {
              text: "Under close inspection, the pollen grains are abundant and appear viable — golden-yellow, properly formed. But they're sitting undisturbed on the anthers, exactly where they developed. None have fallen or been transferred to the stigma below.",
              revealsClue: "POLLEN_UNDISTURBED",
              options: [
                { label: "Why isn't it moving?", goto: "why_not_moving" },
                { label: "Try touching the pollen", goto: "touch_pollen", isAction: true },
                { label: "Back to overview", goto: "start" }
              ]
            },
            why_not_moving: {
              text: "On Earth, pollen moves via wind, vibration, or insect contact. Here in the sealed greenhouse, the air is perfectly still. There are no insects. Nothing is disturbing these flowers at all.",
              bonusInsight: true,
              options: [
                { label: "Try touching the pollen", goto: "touch_pollen", isAction: true },
                { label: "Back to overview", goto: "start" }
              ]
            },
            touch_pollen: {
              text: "You gently flick a flower stem. A tiny cloud of pollen puffs from the anthers and settles onto the stigma. That's all it took — one small vibration. These flowers have been waiting weeks for that.",
              setsAction: "touch_pollen",
              bonusInsight: true,
              options: [
                { label: "Examine other flowers", goto: "flower_drop" },
                { label: "Back to overview", goto: "start" }
              ]
            },
            flower_drop: {
              text: "Several dried flower remnants litter the soil surface beneath the plants. These flowers completed their bloom cycle and dropped without ever being pollinated. A few newer flowers are showing early signs of the same — petals beginning to brown at the edges.",
              revealsClue: "POLLEN_UNDISTURBED",
              options: [
                { label: "Look closer at the pollen", goto: "pollen_close" },
                { label: "Back to overview", goto: "start" }
              ]
            },
            stems: {
              text: "Stems are thick and green. Leaves are large, healthy, and dark green with no discoloration or wilting. The plants show excellent vegetative growth — they're clearly getting everything they need nutritionally.",
              options: [
                { label: "Examine the flowers", goto: "flowers" },
                { label: "Back to overview", goto: "start" }
              ]
            },
            soil: {
              text: "The regolith-compost blend looks dark and well-structured. Moisture level appears good — not waterlogged, not dry. You can see fine root networks at the surface. The growing medium is clearly supporting healthy plant growth.",
              options: [
                { label: "Examine the flowers", goto: "flowers" },
                { label: "Back to overview", goto: "start" }
              ]
            },
            insects: {
              text: "You scan the plants carefully. No insects of any kind. No bees, no flies, no aphids. The greenhouse is completely sealed — nothing could get in. On Earth, a greenhouse this productive would be buzzing with pollinators.",
              options: [
                { label: "Examine the flowers", goto: "flowers" },
                { label: "Back to overview", goto: "start" }
              ]
            },
            shake_stem: {
              text: "Remembering what Chen said about vibration, you grasp a stem and give it a firm shake. Pollen cascades from every open flower. Within seconds, you can see grains settling onto stigmas. It's almost comically simple.",
              setsAction: "shake_stem",
              bonusInsight: true,
              options: [
                { label: "That's the whole problem.", goto: "eureka" },
                { label: "Back to overview", goto: "start" }
              ]
            },
            eureka: {
              text: "All these plants needed was a good shake. No fancy equipment, no genetic modifications — just the physical vibration that wind and bees provide for free on Earth. In this perfectly still, sealed greenhouse, nobody thought to be the wind.",
              options: [
                { label: "Step back", goto: "exit" }
              ]
            },
            exit: {
              text: "You step back from the specimen row, mentally cataloging your observations.",
              endsConversation: true,
              exitLabel: "Step back"
            }
          }
        },

        logs: {
          type: "archive",
          speaker: "Greenhouse Design Docs",
          nodes: {
            start: {
              text: "+----------------------------------+\n|   LUNAR GREENHOUSE DESIGN DOCS   |\n|   Shackleton Crater Base         |\n+----------------------------------+\n\nEnter search query or select category.",
              options: [
                { label: "Greenhouse specifications", goto: "specs" },
                { label: "Crop management protocols", goto: "crop_protocols" },
                { label: "Environmental systems", goto: "env_systems" },
                { label: "Search: pollination", goto: "pollination_search" },
                { label: "Search: hand-pollination protocols", goto: "hand_pollination", requires: { clueFound: "POLLEN_UNDISTURBED" } },
                { label: "Search: mechanical pollination", goto: "mechanical_pollination", requires: { flagSet: "chen_explained_vectors" } },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            specs: {
              text: "GREENHOUSE SPECIFICATIONS\n------------------------\nModule: Pressurized inflatable dome\nArea: 200 sq meters\nAtmosphere: Earth-standard N2/O2 mix\nGravity: 0.166g (lunar natural)\nLighting: Full-spectrum LED array\nWater: Closed-loop recirculation\nSoil: Regolith-compost hybrid blend\nCrops: Tomato, lettuce, radish, herbs\n\nDesign target: Full food supplementation\nfor crew of 6.",
              options: [
                { label: "Crop management protocols", goto: "crop_protocols" },
                { label: "Environmental systems", goto: "env_systems" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            crop_protocols: {
              text: "CROP MANAGEMENT PROTOCOLS\n-------------------------\nWatering: Automated drip, 2x daily\nNutrients: Weekly compost tea supplement\nPruning: Bi-weekly maintenance\nPest control: UV sterilization on intake\nPollination: TBD\n\n! FLAGGED ITEM: Pollination strategy\n  listed as TBD. No follow-up recorded.",
              revealsClue: "NO_POLLINATION_PLAN",
              options: [
                { label: "Search: pollination", goto: "pollination_search" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            env_systems: {
              text: "ENVIRONMENTAL SYSTEMS\n---------------------\nCO2 management: Scrubber/generator cycle\nTemperature: Radiative heating + insulation\nHumidity: Passive regulation via plant\n  transpiration + dehumidifier\nAir circulation: CO2 scrubber passive\n  exhaust (no dedicated fans)\n\nNote: Air circulation was deprioritized\ndue to mass budget constraints. No fan\nunits included in habitat manifest.",
              options: [
                { label: "That explains the still air.", goto: "still_air_note" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            still_air_note: {
              text: "ADDENDUM: Air circulation concerns\n-----------------------------------\nPost-installation review noted lack of\nair movement may affect:\n- Evapotranspiration rates\n- Stem strengthening\n- Pollen dispersal\n\nRecommendation: Add oscillating fans.\nStatus: PENDING (mass budget review)",
              bonusInsight: true,
              options: [
                { label: "Back to main menu", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            pollination_search: {
              text: "SEARCH: 'POLLINATION'\n---------------------\n3 results found:\n\n1. Crop Protocol: 'Pollination: TBD'\n2. Risk Assessment: 'Sealed environment\n   eliminates natural pollination vectors.\n   Mitigation: TBD'\n3. Pre-launch Review Note: 'Recommend\n   including hand-pollination kit in\n   supply manifest.' Status: NOT SHIPPED",
              revealsClue: "NO_POLLINATION_PLAN",
              options: [
                { label: "View risk assessment details", goto: "risk_assessment" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            risk_assessment: {
              text: "RISK ASSESSMENT: POLLINATION\n----------------------------\nRisk: Fruiting crops require pollination\n  vectors not present in sealed habitat.\nLikelihood: HIGH\nImpact: Complete loss of fruit production\nMitigation: TBD\n\nReviewer note: 'This was flagged in\ndesign phase but dropped from the\ncritical path when mass budget was cut.\nRevisit before fruiting crop phase.'\n\nRevisit status: NEVER COMPLETED",
              options: [
                { label: "Back to main menu", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            hand_pollination: {
              text: "SEARCH: 'HAND-POLLINATION PROTOCOLS'\n------------------------------------\nNo station-specific protocols found.\n\nEarth reference data:\n- Use small brush or cotton swab\n- Gently touch anthers to collect pollen\n- Transfer to stigma of same/other flower\n- Vibrating tools (electric toothbrush)\n  can simulate buzz pollination\n- Best performed when flowers fully open\n- Repeat every 2-3 days during bloom",
              bonusInsight: true,
              options: [
                { label: "Back to main menu", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            mechanical_pollination: {
              text: "SEARCH: 'MECHANICAL POLLINATION'\n--------------------------------\nReference: NASA Technical Brief TB-2019-AG\n\nMethods for enclosed habitat pollination:\n1. Oscillating fans (0.5-1.0 m/s)\n2. Vibration plates under grow beds\n3. Hand-held vibrating wand (60-90 Hz)\n4. Timed air pulse system\n5. Manual brush pollination\n\nNote: Methods 1-4 require equipment\nnot currently in habitat manifest.\nMethod 5 requires crew time allocation.",
              bonusInsight: true,
              options: [
                { label: "Back to main menu", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            exit: {
              text: "[Archive session ended]",
              endsConversation: true,
              exitLabel: "Close archive"
            }
          }
        }
      },

      clues: [
        {
          action: "crew",
          label: "Talk to Crew",
          icon: "\ud83d\udc68\u200d\ud83d\ude80",
          speaker: "Botanist Chen",
          sprites: {
            spritesheet:     "sprites/chen/spritesheet.png",
            spritesheetJson: "sprites/chen/spritesheet.json"
          },
          text: "It's baffling. The plants look textbook-healthy. Gorgeous flowers. But they just... drop off after a few days without producing anything. On Earth these same cultivars are prolific fruiters. Could the regolith-based soil mix be the issue?",
          clueTag: "FLOWERS_NO_FRUIT",
          learned: "Healthy flowers are dropping without setting fruit."
        },
        {
          action: "sensors",
          label: "Check Sensors",
          icon: "\ud83d\udcca",
          speaker: "Lunar-GH Sensor Array",
          sprites: {
            portrait:   "portrait_sensors.png",
            actionIcon: "icon_sensors.png"
          },
          text: "Soil nutrients optimal (custom regolith-compost blend). Water pH 6.2. Light: full-spectrum LEDs, 14h/10h cycle. Temp 24\u00b0C day / 18\u00b0C night. CO\u2082: 800ppm. Humidity 70%.\n\n\u26a0\ufe0f Air circulation: 0.01 m/s (minimal).",
          clueTag: "LOW_AIRFLOW",
          learned: "Air movement in the sealed greenhouse is nearly zero."
        },
        {
          action: "plants",
          label: "Examine Plants",
          icon: "\ud83c\udf31",
          speaker: "Tomato Specimen Row",
          sprites: {
            portrait:   "portrait_lunar.png",
            actionIcon: "icon_plants.png"
          },
          text: "Flowers are intact and appear healthy. Pollen is visible on the anthers but appears undisturbed \u2014 the grains are sitting exactly where they formed. Stigmas are receptive but clean. No insects observed anywhere in the greenhouse.",
          clueTag: "POLLEN_UNDISTURBED",
          learned: "Pollen isn't reaching the stigma. No insects. No movement."
        },
        {
          action: "logs",
          label: "Review Logs",
          icon: "\ud83d\udccb",
          speaker: "Greenhouse Design Docs",
          sprites: {
            portrait:   "portrait_logs.png",
            actionIcon: "icon_logs.png"
          },
          text: "Greenhouse design document: \"Pollination strategy: TBD. Note \u2014 sealed lunar greenhouse will have no natural pollinators. Earth greenhouses typically rely on wind, bees, or manual intervention. Recommend addressing before fruiting crop phase.\" Status: UNRESOLVED.",
          clueTag: "NO_POLLINATION_PLAN",
          learned: "Nobody set up a pollination system for the sealed greenhouse."
        }
      ],

      diagnoses: [
        {
          id: "regolith",
          label: "Lunar regolith is toxic to fruit development.",
          isCorrect: false,
          hint: "The soil sensors show healthy nutrient levels, and the plants themselves are thriving. The issue happens specifically at the flower stage."
        },
        {
          id: "light",
          label: "The light spectrum is missing UV needed for fruiting.",
          isCorrect: false,
          hint: "These full-spectrum LEDs include UV components, and the plants are flowering normally. The problem is after the flower opens."
        },
        {
          id: "pollination",
          label: "No pollination is occurring \u2014 without insects, wind, or manual intervention, pollen can't reach the stigma.",
          isCorrect: true
        },
        {
          id: "co2",
          label: "CO\u2082 levels are too high for tomatoes.",
          isCorrect: false,
          hint: "800ppm is actually beneficial for tomato growth. That's not what's preventing fruit set."
        }
      ],

      rankUpText: "No wind, no bees, no fruit. You discovered that even self-pollinating plants need a helping hand in sealed environments.",

      explanation: {
        title: "The Pollination Problem: No Bees in Space",
        body: "Tomatoes are self-pollinating \u2014 their flowers contain both male and female parts \u2014 but they still need physical movement to transfer pollen from anther to stigma. On Earth, this happens via wind, vibration from buzzing bees (\"buzz pollination\"), or simple jostling from weather. In a sealed greenhouse with nearly still air and no insects, that transfer simply never happens.\n\nThe solution is surprisingly low-tech. NASA experiments use small fans to create airflow, electric toothbrush-style vibrators touched to flower stems, or simple finger-flicking. Buzz pollination is so important to tomato production on Earth that commercial greenhouses pay for bumblebee colonies. In space, the crew becomes the bees.",
        funFact: "In the 1990s, NASA briefly studied using actual bumblebees in space habitats. The bees could fly in microgravity after a brief confused period, but maintaining a healthy hive in a sealed habitat proved impractical."
      }
    },

    // ── CASE 3: Mars Habitat ──────────────────────────────────────
    {
      id: "mars",
      name: "Mars Habitat",
      location: "Arcadia Planitia",
      subtitle: "Mars",
      palette: {
        bg:        "#1b0a00",
        bgMid:     "#3e1f0a",
        accent:    "#ff8a65",
        highlight: "#fbe9e7",
        plant:     "#a5d6a7"
      },
      sprites: {
        scene: "sprites/scene_mars.png"
      },
      sceneFx: { type: 'dust', mask: 'sprites/scene_mars.mask.png' },
      briefing: "Dr. Nova, Mars base Arcadia reports a rapid crop decline. Potato plants were growing well for 3 weeks, but leaves are now yellowing from the top down, and new growth is bleached almost white. Engineer Okafor is not happy. Get to Mars and sort this out.",

      // ── Dialogue tree sources (V2 engine) ──────────────────────────
      sources: {
        crew: {
          type: "conversation",
          speaker: "Engineer Okafor",
          personality: "prickly",
          startMood: 0,
          nodes: {
            start: {
              text: "You must be the SAA investigator. Fine. The potatoes are dying and nobody here can tell me why. Let's skip the pleasantries — what do you need to know?",
              options: [
                { label: "What's happening with the potatoes?", goto: "problem_main" },
                { label: "When did the symptoms start?", goto: "timeline" },
                { label: "How are you holding up?", goto: "small_talk" },
                { label: "The new growth has no chlorophyll at all.", goto: "chlorophyll_insight", requires: { clueFound: "CHLOROPHYLL_FAILURE_NEW" } },
                { label: "Tell me about the light delivery system.", goto: "light_pipe_insight", requires: { clueFound: "LIGHT_PIPE_SYSTEM" } },
                { label: "Red light is critical for chlorophyll production.", goto: "red_light_insight", requires: { clueFound: "LIGHT_SPECTRUM_KEY" } }
              ]
            },
            problem_main: {
              text: "They were doing great at first. Nice green tops. Then about week three, the newest leaves started looking washed out. I thought it was a nutrient issue, so I boosted the iron and nitrogen. No improvement. If anything it's getting worse.",
              revealsClue: "YELLOWING_TOP_DOWN",
              options: [
                { label: "What else have you tried?", goto: "tried_fixes" },
                { label: "Could it be the water or soil?", goto: "wrong_guess_soil" },
                { label: "Tell me about the lighting setup.", goto: "lighting_setup" },
                { label: "Let me check the other sources.", goto: "exit_neutral" }
              ]
            },
            tried_fixes: {
              text: "Iron supplement — nothing. Nitrogen boost — nothing. Adjusted the watering schedule — nothing. Checked for pests — spotless. I'm an engineer, not a botanist, but I've run through every variable I can think of.",
              setsFlag: "okafor_explained_fixes",
              options: [
                { label: "Tell me about the lighting setup.", goto: "lighting_setup" },
                { label: "Maybe you need more nutrients?", goto: "wrong_guess_nutrients" },
                { label: "I'll investigate elsewhere.", goto: "exit_neutral" }
              ]
            },
            timeline: {
              text: "First three weeks, perfect growth. Textbook. Then the newest leaves came in pale. Within a few days the whole top canopy was yellowing. It's been getting worse since.",
              options: [
                { label: "What changed at week three?", goto: "what_changed" },
                { label: "Tell me about the symptoms.", goto: "problem_main" },
                { label: "I'll check the sensors.", goto: "exit_neutral" }
              ]
            },
            what_changed: {
              text: "That's what's driving me crazy — nothing changed. Same water, same nutrients, same lights. The hab systems have been rock-steady since installation. Whatever's wrong was always wrong. It just took three weeks to show.",
              options: [
                { label: "The early leaves were fine because...?", goto: "early_leaves" },
                { label: "Tell me about the lights.", goto: "lighting_setup" },
                { label: "I'll investigate.", goto: "exit_neutral" }
              ]
            },
            early_leaves: {
              text: "I don't know. They grew in green and stayed green. It's only the new growth that's bleaching. The old leaves are holding onto whatever chlorophyll they already had.",
              options: [
                { label: "That's an important clue.", goto: "lighting_setup" },
                { label: "Let me examine the plants directly.", goto: "exit_neutral" }
              ]
            },
            lighting_setup: {
              text: "We use fiber optic light pipes — route natural sunlight from the surface down into the hab through 12 meters of cable. Plus supplemental white LEDs. PAR meter says 280 micromoles. Should be plenty for potatoes.",
              setsFlag: "okafor_described_light",
              options: [
                { label: "What wavelengths do the light pipes actually transmit?", goto: "wavelength_question" },
                { label: "PAR measures total photons, not specific colors.", goto: "par_distinction" },
                { label: "I'll check the sensor data.", goto: "exit_neutral" }
              ]
            },
            wavelength_question: {
              text: "Wavelengths? I'm an engineer, not an optics specialist. The PAR reading says adequate. If you want spectral data, the sensor array can run that analysis.",
              options: [
                { label: "I'll check the sensors.", goto: "exit_neutral" },
                { label: "PAR doesn't tell the whole story.", goto: "par_distinction" }
              ]
            },
            par_distinction: {
              text: "You're saying the total amount of light could be fine but specific colors could be missing? Huh. I never thought about it that way. The light pipes route through Mars regolith — I suppose the glass could filter certain wavelengths over that distance.",
              bonusInsight: true,
              options: [
                { label: "Exactly. That's worth checking.", goto: "exit_friendly" },
                { label: "I need the spectral data.", goto: "exit_neutral" }
              ]
            },
            small_talk: {
              text: "How am I holding up? My crops are dying, headquarters sent a detective instead of a botanist, and you're asking about my feelings. Can we focus?",
              moodShift: -1,
              options: [
                { label: "Right. What's happening with the potatoes?", goto: "problem_main" },
                { label: "Fine, I'll look around myself.", goto: "exit_cold" }
              ]
            },
            wrong_guess_soil: {
              text: "The soil? I already checked. Roots are healthy, nutrients are optimal, pH is dialed in. It's not the soil. Pay attention.",
              moodShift: -1,
              options: [
                { label: "What about the light?", goto: "lighting_setup" },
                { label: "Let me investigate.", goto: "exit_neutral" }
              ]
            },
            wrong_guess_nutrients: {
              text: "I just told you I already boosted the nutrients. It didn't help. Were you listening?",
              moodShift: -1,
              options: [
                { label: "You're right, sorry. Tell me about the lights.", goto: "lighting_setup" },
                { label: "I'll come back with more info.", goto: "exit_cold" }
              ]
            },
            chlorophyll_insight: {
              text: "No chlorophyll in the new growth? So it's not just yellowing — the pigment literally isn't forming? That changes things. The plant has everything it needs to grow but can't make the one molecule that matters.",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "Something is blocking the biosynthesis pathway.", goto: "biosynthesis_blocked" },
                { label: "I'm still investigating the cause.", goto: "exit_friendly" }
              ]
            },
            biosynthesis_blocked: {
              text: "Blocked how? They've got iron, nitrogen, magnesium — all the building blocks. What else does chlorophyll production need?",
              setsFlag: "okafor_asked_biosynthesis",
              options: [
                { label: "Light. Specific wavelengths of light.", goto: "light_revelation" },
                { label: "I need to check the research archives.", goto: "exit_neutral" }
              ]
            },
            light_revelation: {
              text: "Specific wavelengths? You mean the amount of light isn't enough — it has to be the right color? The light pipes... they're running through 12 meters of glass and Mars dust. If they're filtering out a critical wavelength...",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "That's exactly what I'm thinking.", goto: "realization" },
                { label: "I'll verify with the sensors.", goto: "exit_friendly" }
              ]
            },
            light_pipe_insight: {
              text: "The fiber optic light pipes? What about them — they're transmitting fine. PAR readings are adequate.",
              moodShift: 1,
              options: [
                { label: "PAR measures quantity, not quality.", goto: "pipe_quality" },
                { label: "12 meters of glass might filter certain wavelengths.", goto: "pipe_filtering" }
              ]
            },
            pipe_quality: {
              text: "Quantity versus quality... you're saying enough total light gets through but maybe not the right kind? The glass has a specific composition. Over 12 meters, yeah, some wavelengths could attenuate more than others.",
              bonusInsight: true,
              options: [
                { label: "We need a spectral analysis.", goto: "exit_friendly" },
                { label: "Specifically the red wavelengths.", goto: "pipe_filtering" }
              ]
            },
            pipe_filtering: {
              text: "You think the cables are filtering out specific wavelengths? I never ran a spectral analysis — the PAR reading was fine so I didn't think to check. And the Mars dust coating on the surface intakes... that could shift things too.",
              setsFlag: "okafor_realized_filtering",
              bonusInsight: true,
              options: [
                { label: "A spectral analysis would confirm it.", goto: "exit_friendly" },
                { label: "That could explain everything.", goto: "realization" }
              ]
            },
            red_light_insight: {
              text: "Red light? For chlorophyll? ...The fiber optics. Mars surface already filters UV. The glass attenuates longer wavelengths over distance. We might be losing the deep red entirely. That would explain why only new growth is affected — old leaves already have their chlorophyll.",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "Exactly. The fix is supplemental red LEDs.", goto: "solution" },
                { label: "That fits all the evidence.", goto: "realization" }
              ]
            },
            realization: {
              text: "If the light pipes are filtering out red wavelengths, new chlorophyll can't form. Old leaves keep their existing pigment, but new growth comes in white. That's exactly the pattern. I need to check the spectral data and get red LEDs installed.",
              options: [
                { label: "Supplemental red LEDs should fix it.", goto: "solution" },
                { label: "Happy to help.", goto: "exit_friendly" }
              ]
            },
            solution: {
              text: "I have spare LED panels in storage. I can swap in 660-nanometer red arrays today. If you're right, we should see green new growth within a week. Thank you, Dr. Nova. I don't say that often.",
              moodShift: 1,
              options: [
                { label: "Good luck with the potatoes.", goto: "exit_friendly" }
              ]
            },
            annoyed: {
              text: "Look — the new leaves are coming in white. I already tried iron and nitrogen. It didn't work. That's all I know. Now ask me something useful or go investigate on your own.",
              revealsClue: "YELLOWING_TOP_DOWN",
              options: [
                { label: "What about the lighting?", goto: "lighting_setup" },
                { label: "I'll come back with real evidence.", goto: "exit_cold" }
              ]
            },
            locked: {
              text: "We're done. The new growth is bleaching white and nothing I've tried fixes it. That's all you're getting from me. Figure it out yourself.",
              revealsClue: "YELLOWING_TOP_DOWN",
              endsConversation: true,
              exitLabel: "Walk away"
            },
            exit_friendly: {
              text: "Alright. Let me know what you find — I want this fixed.",
              moodShift: 1,
              endsConversation: true,
              exitLabel: "Head out"
            },
            exit_neutral: {
              text: "Fine. I'll be here.",
              endsConversation: true,
              exitLabel: "Head back"
            },
            exit_cold: {
              text: "Whatever. Don't waste my time next visit.",
              endsConversation: true,
              exitLabel: "Walk away"
            }
          }
        },

        sensors: {
          type: "terminal",
          speaker: "Mars-Hab Sensor Array",
          nodes: {
            start: {
              text: "+----------------------------------+\n|  MARS-HAB SENSOR ARRAY           |\n|  Arcadia Planitia Installation   |\n|  Status: ONLINE                  |\n+----------------------------------+\n\nAwaiting query.",
              options: [
                { label: "Display environmental readings", goto: "env_readings" },
                { label: "Display lighting system data", goto: "lighting_data" },
                { label: "Run full diagnostic", goto: "diagnostic" },
                { label: "Query: spectral analysis of light pipes", goto: "spectral_analysis", requires: { clueFound: "LIGHT_SPECTRUM_KEY" } },
                { label: "Query: chlorophyll wavelength requirements", goto: "chlorophyll_wavelengths", requires: { clueFound: "CHLOROPHYLL_FAILURE_NEW" } },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            env_readings: {
              text: "ENVIRONMENTAL SUMMARY\n--------------------\nSoil nutrients: ADJUSTED (iron supplement)\nNitrogen: BOOSTED (no improvement noted)\nWater delivery: ON SCHEDULE\nTemp: 20C (nominal)\nCO2: 1200ppm (Mars-atmosphere derived)\nUV index inside hab: 0.1 (heavily filtered)\nHumidity: 55%\n\nNo anomalies in primary metrics.",
              options: [
                { label: "Display lighting system data", goto: "lighting_data" },
                { label: "Any alerts or flags?", goto: "alerts" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            alerts: {
              text: "ACTIVE ALERTS\n-------------\n! UV index: 0.1 (expected - Mars\n  atmosphere + fiber optic filtering)\n\n! Crop status: YELLOWING (new growth)\n  Nutrient adjustments ineffective.\n  Cause: UNKNOWN\n\nNo hardware faults detected.",
              options: [
                { label: "Display lighting system data", goto: "lighting_data" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            lighting_data: {
              text: "LIGHTING SYSTEM\n---------------\nPrimary: Fiber optic light pipes\n  Source: Mars-filtered sunlight\n  Cable length: 12m (surface to hab)\n  Intake: Surface-mounted collector\n  Output: Ceiling diffuser array\n\nSupplemental: White LED panels\n  Color temp: 4000K (broad spectrum)\n  Contribution: ~30% of total PAR\n\nCombined PAR: 280 umol/m2/s\nStatus: NOMINAL",
              revealsClue: "LIGHT_PIPE_SYSTEM",
              options: [
                { label: "What wavelengths do the LEDs cover?", goto: "led_spectrum" },
                { label: "Light pipe transmission details", goto: "pipe_details" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            led_spectrum: {
              text: "LED SPECTRAL PROFILE\n--------------------\nType: Broad-spectrum white (4000K)\nBlue peak: ~450nm (moderate)\nGreen range: 500-580nm (strong)\nRed range: 600-700nm (weak)\n\nNote: Standard white LEDs have minimal\noutput in deep red (>640nm) range.\nNot designed as primary grow lights.\nIntended as supplemental only.",
              bonusInsight: true,
              options: [
                { label: "Light pipe transmission details", goto: "pipe_details" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            pipe_details: {
              text: "FIBER OPTIC LIGHT PIPE DATA\n---------------------------\nCable type: Multi-strand borosilicate\nLength: 12m (surface to hab floor)\nIntake condition: Dust accumulation\n  noted (last cleaned: 47 sols ago)\n\nTotal transmission efficiency: 68%\nNote: Wavelength-specific attenuation\n  data requires full spectral analysis.",
              options: [
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            spectral_analysis: {
              text: "SPECTRAL ANALYSIS - LIGHT PIPES\n-------------------------------\nSurface intake vs hab output:\n\nBlue  (400-500nm): 92% transmission\nGreen (500-600nm): 88% transmission\nRed   (600-700nm): 31% transmission !!\nDeep red (700nm+): 12% transmission !!\n\n!! WARNING: Severe attenuation in red\nspectrum. Causes: glass composition +\n12m cable length + Mars dust coating\non intake optics.\n\nRed delivery: CRITICALLY INSUFFICIENT\nfor chlorophyll biosynthesis.",
              bonusInsight: true,
              options: [
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            chlorophyll_wavelengths: {
              text: "QUERY: CHLOROPHYLL WAVELENGTH NEEDS\n-----------------------------------\nReference database result:\n\nChlorophyll a peaks: 430nm, 662nm\nChlorophyll b peaks: 453nm, 642nm\n\nCritical process:\nProtochlorophyllide -> chlorophyllide\nRequires: 600-700nm (red) photons\n\nCross-ref with current light data:\nBlue delivery: ADEQUATE\nRed delivery: INSUFFICIENT\n\n!! Chlorophyll biosynthesis may be\nimpaired by red spectrum deficit.",
              bonusInsight: true,
              options: [
                { label: "Display lighting system data", goto: "lighting_data" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            diagnostic: {
              text: "+----------------------------------+\n|    RUNNING FULL DIAGNOSTIC       |\n+----------------------------------+\n\n[||||||||||||||||||||] 100%\n\nAll sensors nominal.\nNo hardware faults detected.\nCalibration current.\n\nNote: Light pipe intake dust level\nELEVATED. Recommend surface cleaning.",
              options: [
                { label: "Back to main menu", goto: "start" },
                { label: "Exit terminal", goto: "exit" }
              ]
            },
            exit: {
              text: "[Terminal session ended]",
              endsConversation: true,
              exitLabel: "Close terminal"
            }
          }
        },

        plants: {
          type: "examination",
          speaker: "Potato Grow Towers",
          nodes: {
            start: {
              text: "Vertical grow towers filled with enriched regolith blend. Potato plants at various growth stages. The contrast is stark — lower foliage retains some green, but the upper canopy and all new growth is pale yellow to bleached white.",
              options: [
                { label: "Examine the upper leaves", goto: "upper_leaves" },
                { label: "Examine the lower leaves", goto: "lower_leaves" },
                { label: "Check the roots", goto: "roots" },
                { label: "Look at the growing tips", goto: "growing_tips" },
                { label: "Compare old and new growth side by side", goto: "compare_growth", requires: { flagSet: "okafor_explained_fixes" } },
                { label: "Step back", goto: "exit" }
              ]
            },
            upper_leaves: {
              text: "New growth at the top is pale yellow to almost white. Leaf structure is normal — no spots, curling, or pest damage. The tissue looks healthy in every way except for the complete lack of green pigmentation. It's as if the color simply never developed.",
              revealsClue: "CHLOROPHYLL_FAILURE_NEW",
              options: [
                { label: "Look closer at the leaf cells", goto: "leaf_cells" },
                { label: "Examine the lower leaves", goto: "lower_leaves" },
                { label: "Back to overview", goto: "start" }
              ]
            },
            lower_leaves: {
              text: "Older leaves lower on the plant still retain green color, though it's fading at the edges. These leaves were established before whatever is causing the problem became critical. The gradient from green at the bottom to white at the top is unmistakable.",
              options: [
                { label: "Examine the upper leaves", goto: "upper_leaves" },
                { label: "Look at the growing tips", goto: "growing_tips" },
                { label: "Back to overview", goto: "start" }
              ]
            },
            leaf_cells: {
              text: "Under close inspection, the cells appear structurally normal. But where you'd expect to see green chloroplasts packed into palisade cells, the tissue looks empty. The pigment factories are present but not producing. Protochlorophyllide is likely accumulating without converting to chlorophyll.",
              bonusInsight: true,
              options: [
                { label: "What drives that conversion?", goto: "conversion_question" },
                { label: "Back to overview", goto: "start" }
              ]
            },
            conversion_question: {
              text: "That's a biochemistry question beyond what a visual examination can answer. The research archives might have information on chlorophyll biosynthesis requirements and what drives the final conversion step.",
              options: [
                { label: "Back to overview", goto: "start" },
                { label: "Step back", goto: "exit" }
              ]
            },
            growing_tips: {
              text: "The very newest growth at the shoot apex is almost pure white. Even the stem tissue shows reduced pigmentation. Whatever is causing this affects all new chlorophyll production — leaves, stems, everything. The plant is growing but completely unable to make green pigment.",
              revealsClue: "CHLOROPHYLL_FAILURE_NEW",
              options: [
                { label: "Examine the upper leaves", goto: "upper_leaves" },
                { label: "Look closer at the leaf cells", goto: "leaf_cells" },
                { label: "Back to overview", goto: "start" }
              ]
            },
            roots: {
              text: "You carefully pull back the growing medium to expose some roots. They look healthy — white, well-branched, with fine root hairs actively growing. No signs of disease, rot, or nutrient deficiency at the root level.",
              options: [
                { label: "That rules out root problems.", goto: "root_healthy" },
                { label: "Back to overview", goto: "start" }
              ]
            },
            root_healthy: {
              text: "Healthy roots mean the plant can absorb nutrients and water just fine. Whatever is causing the yellowing isn't coming from below — it's happening in the leaves themselves, at the point where chlorophyll should be manufactured.",
              options: [
                { label: "Examine the upper leaves", goto: "upper_leaves" },
                { label: "Back to overview", goto: "start" }
              ]
            },
            compare_growth: {
              text: "Knowing that Okafor already boosted iron and nitrogen without improvement, you compare the oldest and newest leaves side by side. Old leaves: green, functional chlorophyll. New leaves: white, zero chlorophyll. The plant has all the nutrients it needs. Something in the final assembly step — the light-dependent conversion — is failing.",
              bonusInsight: true,
              options: [
                { label: "Look closer at the leaf cells", goto: "leaf_cells" },
                { label: "Back to overview", goto: "start" }
              ]
            },
            exit: {
              text: "You step back from the grow towers, turning over the observations in your mind. Green below, white above. The pattern is clear — but the cause isn't. Yet.",
              endsConversation: true,
              exitLabel: "Step back"
            }
          }
        },

        logs: {
          type: "archive",
          speaker: "Research Note Archive",
          nodes: {
            start: {
              text: "+----------------------------------+\n|   MARS HABITAT RESEARCH ARCHIVE  |\n|   Arcadia Planitia Base          |\n+----------------------------------+\n\nEnter search query or select category.",
              options: [
                { label: "Habitat specifications", goto: "hab_specs" },
                { label: "Crop monitoring reports", goto: "crop_reports" },
                { label: "Lighting system documentation", goto: "lighting_docs" },
                { label: "Search: light spectrum requirements", goto: "spectrum_search" },
                { label: "Search: chlorophyll biosynthesis", goto: "chlorophyll_search", requires: { clueFound: "CHLOROPHYLL_FAILURE_NEW" } },
                { label: "Search: fiber optic transmission losses", goto: "fiber_optic_search", requires: { clueFound: "LIGHT_PIPE_SYSTEM" } },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            hab_specs: {
              text: "HABITAT SPECIFICATIONS\n----------------------\nModule: Pressurized subsurface dome\nLocation: Arcadia Planitia, 12m depth\nAtmosphere: Earth-standard N2/O2 mix\nGravity: 0.38g (Mars natural)\nLighting: Fiber optic light pipes +\n  supplemental white LED panels\nWater: Closed-loop recirculation\nSoil: Enriched regolith blend\nCrops: Potato, soybean, wheat, greens\n\nDesign target: 60% food self-sufficiency\nfor crew of 4.",
              options: [
                { label: "Lighting system documentation", goto: "lighting_docs" },
                { label: "Crop monitoring reports", goto: "crop_reports" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            crop_reports: {
              text: "CROP MONITORING - POTATO BATCH 3\n--------------------------------\nWeek 1-2: Vigorous vegetative growth.\n  All metrics nominal. Green canopy\n  developing well.\nWeek 3: First signs of chlorosis in\n  newest leaves. Initially attributed\n  to iron deficiency.\nWeek 4: Progressive bleaching of all\n  new tissue. Iron and nitrogen\n  supplements had no effect.\nWeek 5: Ongoing. New growth fully\n  white. Older leaves slowly fading.\n\nAssessment: Cause unknown. Nutrient\ndeficiency ruled out.",
              options: [
                { label: "Lighting system documentation", goto: "lighting_docs" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            lighting_docs: {
              text: "LIGHTING SYSTEM DOCUMENTATION\n-----------------------------\nPrimary: Fiber optic light pipes\n  12m borosilicate glass cables\n  Surface collector -> ceiling diffuser\n  Rated for full-spectrum transmission\n\nSupplemental: White LED panels (4000K)\n  Broad-spectrum, ~30% of total PAR\n\nCombined PAR: 280 umol/m2/s\nDesign note: 'PAR adequate for all\ncrop types in rotation.'\n\nSpectral analysis: NOT PERFORMED\n(PAR reading deemed sufficient)",
              options: [
                { label: "Search: light spectrum requirements", goto: "spectrum_search" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            spectrum_search: {
              text: "SEARCH: 'LIGHT SPECTRUM REQUIREMENTS'\n-------------------------------------\n2 results found:\n\n1. General: 'Plants require light in\n   the Photosynthetically Active\n   Radiation (PAR) range, 400-700nm.\n   Blue (450nm) and red (660nm) are\n   primary absorption peaks.'\n\n2. Technical note: 'PAR meters measure\n   total photon flux, not spectral\n   distribution. Adequate PAR does not\n   guarantee adequate representation\n   of all critical wavelengths.'",
              options: [
                { label: "More detail on red wavelength requirements", goto: "red_wavelength_detail" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            red_wavelength_detail: {
              text: "RESEARCH NOTE: RED LIGHT IN PLANTS\n----------------------------------\nChlorophyll biosynthesis requires\nspecific light wavelengths as enzymatic\ncofactors. The critical step:\n\nProtochlorophyllide -> chlorophyllide\n\nThis conversion is driven by light\nin the 600-700nm (red) range. The\nenzyme protochlorophyllide\noxidoreductase (POR) specifically\nrequires red photons to function.\n\nIf red wavelengths are absent, plants\ncannot complete chlorophyll production\neven with adequate total light.\n\nRecommendation: Verify light delivery\nsystem transmits full PAR spectrum\nincluding deep red.",
              revealsClue: "LIGHT_SPECTRUM_KEY",
              options: [
                { label: "Search: fiber optic transmission losses", goto: "fiber_optic_search", requires: { clueFound: "LIGHT_PIPE_SYSTEM" } },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            chlorophyll_search: {
              text: "SEARCH: 'CHLOROPHYLL BIOSYNTHESIS'\n----------------------------------\nChlorophyll production pathway:\n\n1. Glutamate -> ALA (enzymatic)\n2. ALA -> protoporphyrin IX\n3. Mg insertion -> Mg-protoporphyrin\n4. -> Protochlorophyllide (dark step)\n5. -> Chlorophyllide (LIGHT-DEPENDENT)\n6. -> Chlorophyll a/b (final)\n\nStep 5 requires RED LIGHT (600-700nm)\nEnzyme: POR (protochlorophyllide\noxidoreductase)\n\nWithout red light, pathway stalls at\nstep 4. Protochlorophyllide accumulates\nbut cannot convert to chlorophyll.",
              revealsClue: "LIGHT_SPECTRUM_KEY",
              options: [
                { label: "More on red light requirements", goto: "red_wavelength_detail" },
                { label: "Back to main menu", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            fiber_optic_search: {
              text: "SEARCH: 'FIBER OPTIC TRANSMISSION'\n----------------------------------\nTechnical brief: Wavelength-dependent\nattenuation in borosilicate fiber.\n\nOver 12m cable length:\n- Blue (400-500nm): ~8% loss\n- Green (500-600nm): ~12% loss\n- Red (600-700nm): ~45% loss (!!)\n- Deep red (>700nm): ~65% loss (!!)\n\nContributing factors:\n- Glass composition (silica/boron ratio)\n- Cable length (exponential attenuation)\n- Surface dust on intake collector\n- Mars atmospheric filtering at source\n\nRecommendation: Supplement with\ntargeted red-spectrum LED arrays\n(640-680nm peak) for any crops\nrequiring active chlorophyll synthesis.",
              bonusInsight: true,
              options: [
                { label: "Back to main menu", goto: "start" },
                { label: "Exit archive", goto: "exit" }
              ]
            },
            exit: {
              text: "[Archive session ended]",
              endsConversation: true,
              exitLabel: "Close archive"
            }
          }
        }
      },

      clues: [
        {
          action: "crew",
          label: "Talk to Crew",
          icon: "\ud83d\udc68\u200d\ud83d\ude80",
          speaker: "Engineer Okafor",
          sprites: {
            spritesheet:     "sprites/okafor/spritesheet.png",
            spritesheetJson: "sprites/okafor/spritesheet.json"
          },
          text: "They were doing great at first! Nice green tops. Then about week three, the newest leaves started looking washed out. I thought it was a nutrient issue, so I boosted the iron and nitrogen. No improvement. If anything it's getting worse.",
          clueTag: "YELLOWING_TOP_DOWN",
          learned: "New growth affected first; not responding to nutrient adjustments."
        },
        {
          action: "sensors",
          label: "Check Sensors",
          icon: "\ud83d\udcca",
          speaker: "Mars-Hab Sensor Array",
          sprites: {
            portrait:   "portrait_sensors.png",
            actionIcon: "icon_sensors.png"
          },
          text: "Nutrients adjusted upward (iron supplemented). Water delivery on schedule. Temp 20\u00b0C. CO\u2082: 1200ppm (Mars-atmosphere derived). UV index inside hab: 0.1 (heavily filtered).\n\n\u26a0\ufe0f Lighting: Mars-filtered sunlight via fiber optic light pipes + supplemental white LEDs. PAR reading: 280 \u00b5mol/m\u00b2/s.",
          clueTag: "LIGHT_PIPE_SYSTEM",
          learned: "Light routed from surface via fiber optics; UV heavily filtered out."
        },
        {
          action: "plants",
          label: "Examine Plants",
          icon: "\ud83c\udf31",
          speaker: "Potato Grow Towers",
          sprites: {
            portrait:   "portrait_mars.png",
            actionIcon: "icon_plants.png"
          },
          text: "Older lower leaves still have some green. Upper canopy and all new growth is pale yellow to white. Leaf structure appears normal \u2014 no spots, no curling, no pest damage. Chlorophyll seems to simply not be developing in new tissue. Roots look healthy when checked.",
          clueTag: "CHLOROPHYLL_FAILURE_NEW",
          learned: "Chlorophyll isn't forming in new growth \u2014 a light-triggered biosynthesis issue."
        },
        {
          action: "logs",
          label: "Review Logs",
          icon: "\ud83d\udccb",
          speaker: "Research Note Archive",
          sprites: {
            portrait:   "portrait_logs.png",
            actionIcon: "icon_logs.png"
          },
          text: "Research note: \"Chlorophyll biosynthesis requires specific light wavelengths as enzymatic cofactors. Protochlorophyllide \u2192 chlorophyllide conversion is driven by light in the 600-700nm (red) range. Verify that light delivery system transmits full photosynthetically active spectrum including deep red.\"",
          clueTag: "LIGHT_SPECTRUM_KEY",
          learned: "Chlorophyll production depends on specific wavelengths, particularly red light."
        }
      ],

      diagnoses: [
        {
          id: "perchlorates",
          label: "Mars soil perchlorates are poisoning the roots.",
          isCorrect: false,
          hint: "The potatoes are growing in a prepared nutrient system, and root inspection shows healthy roots. The damage pattern (top-down, new growth) doesn't match root poisoning."
        },
        {
          id: "co2",
          label: "CO\u2082 levels are too high for potatoes.",
          isCorrect: false,
          hint: "1200ppm is elevated but well within tolerance for potatoes. This actually boosts growth in most cases."
        },
        {
          id: "photoperiod",
          label: "Martian day length (sol) is disrupting the photoperiod.",
          isCorrect: false,
          hint: "Mars sols are only 37 minutes longer than Earth days, which wouldn't cause this kind of chlorophyll failure."
        },
        {
          id: "spectrum",
          label: "The light delivery system is filtering out red wavelengths needed for chlorophyll biosynthesis.",
          isCorrect: true
        }
      ],

      rankUpText: "Plants don't just need light \u2014 they need the right colors of light. Now you know why space greenhouse LEDs glow purple.",

      explanation: {
        title: "Light Quality: Not All Photons Are Equal",
        body: "Plants don't just need \"enough\" light \u2014 they need the right light. Chlorophyll biosynthesis has a critical light-dependent step: the enzyme protochlorophyllide oxidoreductase converts protochlorophyllide into chlorophyllide, and this reaction specifically requires photons in the red wavelength range (around 600\u2013700nm). If those wavelengths are missing, the plant can't complete chlorophyll production, even if total light intensity seems adequate. New leaves are affected first because older leaves already built their chlorophyll; new tissue needs to manufacture it fresh.\n\nFiber optic light pipes, while clever for routing sunlight underground on Mars, can attenuate certain wavelengths depending on the glass composition and length of the cable. This is why space greenhouse designs always include supplemental LED arrays with tunable spectra.",
        funFact: "This is why many indoor farm LEDs glow purple or pink \u2014 they're combining the red (~660nm) and blue (~450nm) wavelengths plants need most. Green light mostly bounces off leaves (which is why plants look green to us), so smart growers skip it to save energy."
      }
    },

    // ── CASE 4: Orbital Station Cascade ───────────────────────────
    {
      id: "orbital",
      name: "Hayes Orbital Station",
      location: "L2 Lagrange Point",
      subtitle: "Orbital Research Station",
      ranksUp: false,
      palette: {
        bg:        "#0d0d2b",
        bgMid:     "#1a1a4e",
        accent:    "#ce93d8",
        highlight: "#f3e5f5",
        plant:     "#aed581"
      },
      sprites: {
        scene: "sprites/scene_orbital.png"
      },
      sceneWindow: {
        x: 53, y: 48, w: 135, h: 89, twinkle: true,
        sprite: {
          src: 'sprites/earthspin-sheet.png',
          frameW: 48, frameH: 48, cols: 10, totalFrames: 94,
          fps: 3, scale: 1
        }
      },
      briefing: "Urgent dispatch, Dr. Nova. The spirulina algae bioreactor at Hayes Orbital Station keeps crashing every 6\u20138 days \u2014 the culture goes cloudy, pH swings wildly, and productivity drops to near zero before slowly recovering. Dr. Vasquez is at her wit's end. Get to L2 and investigate.",

      sources: {
        crew: {
          type: "conversation",
          speaker: "Dr. Vasquez",
          personality: "stressed",
          startMood: 0,
          nodes: {
            start: {
              text: "Dr. Nova, thank goodness. The bioreactor crashed again last night \u2014 third time this month. It scrubs our CO\u2082 and makes our oxygen. If I can't stabilize it, Commander Roth is talking about evacuating non-essential crew.",
              options: [
                { label: "Walk me through what's happening.", goto: "problem_main" },
                { label: "How long has this been going on?", goto: "timeline" },
                { label: "Could the nutrient feed be contaminated?", goto: "wrong_guess_nutrients" },
                { label: "Have you checked for microbial contamination?", goto: "wrong_guess_infection" },
                { label: "Maybe it's a seasonal cycle?", goto: "pushed_too_far", requires: { flagSet: "vasquez_wrong_nutrients" } },
                { label: "Are you sure it's not contamination?", goto: "pushed_too_far", requires: { flagSet: "vasquez_wrong_infection" } },
                { label: "The microscopy shows light damage, not infection.", goto: "photooxidative_insight", requires: { clueFound: "PHOTOOXIDATIVE_DAMAGE" } },
                { label: "The setup manual says dark periods are essential.", goto: "dark_period_insight", requires: { clueFound: "DARK_PERIOD_REQUIRED" } },
                { label: "Sensors confirm 24/0 light with no independent control.", goto: "no_dark_insight", requires: { clueFound: "NO_DARK_PERIOD" } }
              ]
            },
            problem_main: {
              text: "It runs fine for about a week \u2014 healthy culture, good oxygen output, pH stable. Then suddenly the whole thing crashes. Culture goes cloudy, pH swings wild, productivity drops to nothing. A small population survives and slowly rebuilds... then crashes again. Boom-bust, over and over.",
              options: [
                { label: "When did this pattern start?", goto: "timeline" },
                { label: "What changed before the first crash?", goto: "lighting_change" },
                { label: "Walk me through the bioreactor setup.", goto: "setup" },
                { label: "Let me check the other sources.", goto: "exit_neutral" }
              ]
            },
            timeline: {
              text: "Four months of perfect operation. Then about six weeks ago, the first crash. They've been cycling ever since \u2014 roughly every 6 to 8 days. I've checked temperature, nutrients, CO\u2082 feed, pH buffering... everything I can think of.",
              options: [
                { label: "What changed six weeks ago?", goto: "lighting_change" },
                { label: "Could it be a seasonal cycle?", goto: "wrong_guess_cycle" },
                { label: "Let me investigate.", goto: "exit_neutral" }
              ]
            },
            lighting_change: {
              text: "Commander Roth adjusted the habitat lighting schedule. Went from 16/8 to 24-hour continuous light \u2014 said it would improve crew productivity. A week later, the first crash happened. But the bioreactor sits in the main hab corridor. It doesn't have its own light controls.",
              revealsClue: "LIGHTING_SCHEDULE_CHANGED",
              setsFlag: "vasquez_mentioned_roth",
              options: [
                { label: "So the bioreactor gets whatever light the crew gets?", goto: "no_independent_control" },
                { label: "Have you asked Roth to change it back?", goto: "roth_argument" },
                { label: "I need to check the sensors.", goto: "exit_neutral" }
              ]
            },
            no_independent_control: {
              text: "Exactly. When Roth changed the hab schedule, the bioreactor went to 24-hour light too. I asked for a blackout curtain \u2014 he said it would 'disrupt the crew environment.' The bioreactor needs its own controls, but I can't get approval without evidence.",
              setsFlag: "vasquez_explained_controls",
              options: [
                { label: "I'll check what the sensors show.", goto: "exit_neutral" },
                { label: "The setup manual might have light requirements.", goto: "exit_neutral" }
              ]
            },
            roth_argument: {
              text: "I tried! He says crew productivity is up 15% and he's not changing it back for 'pond scum.' His words. He doesn't understand \u2014 that 'pond scum' is scrubbing his CO\u2082 and making his oxygen.",
              moodShift: -1,
              setsFlag: "vasquez_argued_with_roth",
              options: [
                { label: "We'll need hard evidence to convince him.", goto: "evidence_needed" },
                { label: "Let me check the other systems.", goto: "exit_neutral" }
              ]
            },
            evidence_needed: {
              text: "You're right. If I can show him exactly why the bioreactor needs darkness \u2014 with data \u2014 maybe he'll listen. The setup manual should have the specifications.",
              options: [
                { label: "I'll find what we need.", goto: "exit_friendly" },
                { label: "Let me check the sensors first.", goto: "exit_neutral" }
              ]
            },
            setup: {
              text: "Standard closed-loop photobioreactor. Spirulina in nutrient media, CO\u2082 bubbled in from the hab air system. Light drives photosynthesis, culture produces oxygen and biomass. Temperature controlled, pH buffered, nutrient feed automated. It's not complicated \u2014 that's what makes this so frustrating.",
              setsFlag: "vasquez_described_setup",
              options: [
                { label: "What changed before the crashes started?", goto: "lighting_change" },
                { label: "Let me look at the sensor data.", goto: "exit_neutral" }
              ]
            },
            wrong_guess_nutrients: {
              text: "I check the nutrient feed every single day. It's steady \u2014 same formulation we've used for four months. This isn't a nutrient problem.",
              moodShift: -1,
              setsFlag: "vasquez_wrong_nutrients",
              options: [
                { label: "You're right, sorry. What do you think changed?", goto: "lighting_change" },
                { label: "I'll investigate further.", goto: "exit_neutral" }
              ]
            },
            wrong_guess_infection: {
              text: "I've checked. Multiple times. No contamination, no competing organisms. The culture is clean \u2014 it's just dying. Do you think I haven't considered the obvious?",
              moodShift: -1,
              setsFlag: "vasquez_wrong_infection",
              options: [
                { label: "I apologize. Walk me through what you've observed.", goto: "problem_main" },
                { label: "I'll look at the data myself.", goto: "exit_cold" }
              ]
            },
            wrong_guess_cycle: {
              text: "Seasonal? We're at L2. There are no seasons. There's no weather. The only thing that changes out here is whatever the crew changes.",
              moodShift: -1,
              setsFlag: "vasquez_wrong_cycle",
              options: [
                { label: "What did the crew change recently?", goto: "lighting_change" },
                { label: "I'll investigate.", goto: "exit_neutral" }
              ]
            },
            pushed_too_far: {
              text: "Are you serious right now? I already told you it's not that. I've been troubleshooting this for six weeks \u2014 do you think I haven't checked the basics? If you're just going to keep guessing things I've already ruled out\u2014",
              moodShift: -2,
              options: [
                { label: "I'm sorry \u2014 you're right, I should listen.", goto: "lighting_change" },
                { label: "Calm down, I'm trying to help.", goto: "snapped" }
              ]
            },
            photooxidative_insight: {
              text: "Photooxidative? That's light damage. So it's not infection, not nutrients \u2014 the light itself is hurting them? That... actually makes sense. The crashes started right after Roth changed the lighting.",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "Continuous light overwhelms the cells' repair systems.", goto: "repair_insight" },
                { label: "The cells need darkness to recover from light stress.", goto: "dark_needed" },
                { label: "I'm still putting the pieces together.", goto: "exit_friendly" }
              ]
            },
            repair_insight: {
              text: "Repair systems? So the light isn't just providing energy \u2014 it's also causing damage? And normally the cells have time to fix that during... during the dark period. Which they're not getting anymore.",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "Exactly. ROS accumulates faster than they can neutralize it.", goto: "ros_explanation" },
                { label: "The setup manual should confirm this.", goto: "exit_friendly" }
              ]
            },
            dark_needed: {
              text: "Of course. The dark period isn't downtime \u2014 it's when the cells do maintenance. Without it, damage accumulates until the culture collapses. Then the survivors slowly rebuild, and the cycle repeats.",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "That's exactly the pattern you're seeing.", goto: "solution_path" },
                { label: "We need to restore the dark period.", goto: "roth_solution" }
              ]
            },
            ros_explanation: {
              text: "ROS \u2014 reactive oxygen species. Free radicals from photosynthesis. I should have thought of that. Four months of perfect operation because they had a dark period. Six weeks of crashes because they don't. It's so obvious now.",
              bonusInsight: true,
              options: [
                { label: "We need to restore the dark period.", goto: "solution_path" },
                { label: "Let me confirm with the sensor data.", goto: "exit_friendly" }
              ]
            },
            dark_period_insight: {
              text: "The manual says... let me see. Dark period essential for cellular repair, protein synthesis, ROS neutralization. And we've been running 24/0 since Roth's change. I've been looking at nutrients and temperature when the answer was the light schedule all along.",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "The bioreactor needs independent light controls.", goto: "solution_path" },
                { label: "This explains the crash cycle perfectly.", goto: "solution_path" }
              ]
            },
            no_dark_insight: {
              text: "24/0 with no independent control. So every time Roth runs the hab lights around the clock, the bioreactor gets hammered. The spirulina never gets a break. That has to be the problem.",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "The culture needs 8\u201312 hours of darkness to recover.", goto: "solution_path" },
                { label: "We need to separate the bioreactor lighting.", goto: "roth_solution" }
              ]
            },
            solution_path: {
              text: "I'm requisitioning an independent lighting controller for the bioreactor bay. 16/8 cycle, isolated from the hab schedule. And I'm sending Roth the data \u2014 his crew can have their 24-hour lights, but the bioreactor gets its own rhythm.",
              moodShift: 1,
              options: [
                { label: "That should stabilize the culture.", goto: "exit_grateful" },
                { label: "Good luck with Roth.", goto: "exit_grateful" }
              ]
            },
            roth_solution: {
              text: "Not just restore it \u2014 I need independent control. If Roth changes the schedule again, the bioreactor shouldn't be affected. Separate lighting circuit, blackout housing, automated 16/8 cycle. I'll design it myself if I have to.",
              options: [
                { label: "The evidence is clear. He'll have to listen.", goto: "exit_grateful" },
                { label: "Good plan.", goto: "exit_friendly" }
              ]
            },
            annoyed: {
              text: "The bioreactor keeps crashing and I've been troubleshooting for six weeks straight. Commander Roth changed the lighting to 24-hour continuous right before it all started. That's the only lead I have. Either help me figure out why it matters or let me work.",
              revealsClue: "LIGHTING_SCHEDULE_CHANGED",
              options: [
                { label: "The light change is important \u2014 tell me more.", goto: "lighting_change" },
                { label: "I'll come back with evidence.", goto: "exit_cold" }
              ]
            },
            snapped: {
              text: "I can't do this right now! The bioreactor is crashing, Roth won't listen to me, and I've got nothing. Just \u2014 go. Check the sensors, check the manual, I don't care. Come back when you have something real.",
              revealsClue: "LIGHTING_SCHEDULE_CHANGED",
              setMood: "angry",
              locksSource: true,
              options: [
                { label: "[Leave]", goto: "exit_locked" }
              ]
            },
            locked: {
              text: "[Dr. Vasquez is hunched over the bioreactor readouts, rubbing her temples. She looks up.]\n\n...I'm sorry I snapped at you. This reactor is my responsibility and people's lives depend on it. That's not an excuse. What have you found?",
              setMood: "annoyed",
              locksSource: false,
              revealsClue: "LIGHTING_SCHEDULE_CHANGED",
              options: [
                { label: "The microscopy shows light damage, not infection.", goto: "photooxidative_insight", requires: { clueFound: "PHOTOOXIDATIVE_DAMAGE" } },
                { label: "Sensors confirm 24/0 light with no independent control.", goto: "no_dark_insight", requires: { clueFound: "NO_DARK_PERIOD" } },
                { label: "The manual says dark periods are essential.", goto: "dark_period_insight", requires: { clueFound: "DARK_PERIOD_REQUIRED" } },
                { label: "I'm still investigating.", goto: "exit_neutral" }
              ]
            },
            exit_grateful: {
              text: "Thank you, Dr. Nova. Seriously. I was starting to think I'd never figure this out. The spirulina \u2014 and the crew \u2014 owe you one.",
              moodShift: 1,
              endsConversation: true,
              exitLabel: "Good luck"
            },
            exit_friendly: {
              text: "Alright. Let me know what you find \u2014 I'll be here watching the culture density readings and trying not to panic.",
              moodShift: 1,
              endsConversation: true,
              exitLabel: "Head out"
            },
            exit_neutral: {
              text: "Fine. I'll be here.",
              endsConversation: true,
              exitLabel: "Head back"
            },
            exit_cold: {
              text: "Yeah. Sure.",
              endsConversation: true,
              exitLabel: "Walk away"
            },
            exit_locked: {
              text: "[Dr. Vasquez turns back to her screens without another word.]",
              endsConversation: true,
              exitLabel: "Leave quietly"
            }
          }
        },
        sensors: {
          type: "terminal",
          speaker: "Bioreactor Sensor Array",
          startState: "nominal",
          nodes: {
            start: {
              text: "+----------------------------------+\n|  HAYES ORBITAL BIOREACTOR ARRAY  |\n|  Status: ONLINE                  |\n+----------------------------------+\n\nAwaiting query.",
              options: [
                { label: "Display bioreactor status", goto: "bioreactor_status" },
                { label: "Display environmental readings", goto: "env_readings" },
                { label: "Display light exposure data", goto: "light_data" },
                { label: "Query lighting schedule change", goto: "schedule_query", requires: { clueFound: "LIGHTING_SCHEDULE_CHANGED" } },
                { label: "Cross-reference photoperiod specs", goto: "photoperiod_crossref", requires: { clueFound: "DARK_PERIOD_REQUIRED" } }
              ]
            },
            bioreactor_status: {
              text: "+----------------------------------+\n|  BIOREACTOR STATUS               |\n+----------------------------------+\n\nCulture: Arthrospira platensis\nPhase:   RECOVERY (post-crash)\nDensity: 0.3 g/L (nominal: 2.0)\nO2 out:  14% of rated capacity\npH:      8.9 (oscillating)\n\nWARNING: Third crash event this\ncycle. Culture rebuilding.",
              options: [
                { label: "Display environmental readings", goto: "env_readings" },
                { label: "Display crash event log", goto: "crash_log" },
                { label: "Back to main menu", goto: "start" }
              ]
            },
            env_readings: {
              text: "+----------------------------------+\n|  ENVIRONMENTAL READINGS          |\n+----------------------------------+\n\nTemp:     30.1C  (nominal)\nHumidity: 58%    (nominal)\nCO2 in:   steady (hab loop)\nNutrient: steady (auto-feed)\npH:       oscillating 7.8-10.2\n\nAll parameters nominal except pH.\npH oscillation correlates with\ncrash/recovery cycle.",
              options: [
                { label: "Display light exposure data", goto: "light_data" },
                { label: "Display crash event log", goto: "crash_log" },
                { label: "Back to main menu", goto: "start" }
              ]
            },
            light_data: {
              text: "+----------------------------------+\n|  LIGHT EXPOSURE DATA             |\n+----------------------------------+\n\nSource:   Hab corridor lighting\nSchedule: CONTINUOUS (24/0)\nPAR:      280 umol/m2/s (nominal)\n\n!! WARNING: No independent light\n   control for bioreactor bay.\n   Unit receives hab lighting\n   schedule directly.\n\nNo dark period recorded in\n42 days.",
              revealsClue: "NO_DARK_PERIOD",
              options: [
                { label: "Query lighting schedule change", goto: "schedule_query", requires: { clueFound: "LIGHTING_SCHEDULE_CHANGED" } },
                { label: "Display crash event log", goto: "crash_log" },
                { label: "Back to main menu", goto: "start" }
              ]
            },
            crash_log: {
              text: "+----------------------------------+\n|  CRASH EVENT LOG                 |\n+----------------------------------+\n\nEvent 1: Day 128 (7 days after\n         lighting schedule change)\nEvent 2: Day 135\nEvent 3: Day 142\nEvent 4: Day 149\nEvent 5: Day 156\nEvent 6: Day 163 (last night)\n\nInterval: 6-8 days consistent.\nPattern: density peaks, then\nrapid collapse within hours.",
              options: [
                { label: "Display light exposure data", goto: "light_data" },
                { label: "Display environmental readings", goto: "env_readings" },
                { label: "Back to main menu", goto: "start" }
              ]
            },
            schedule_query: {
              text: "+----------------------------------+\n|  LIGHTING SCHEDULE HISTORY       |\n+----------------------------------+\n\nDay 001-121: 16h ON / 8h OFF\n  Bioreactor: STABLE\n  Crashes: 0\n\nDay 121-now: 24h ON / 0h OFF\n  (Cmdr Roth order #4471)\n  Bioreactor: UNSTABLE\n  Crashes: 6\n\nCorrelation: crash onset aligns\nwith schedule change to 24/0.",
              bonusInsight: true,
              options: [
                { label: "Cross-reference photoperiod specs", goto: "photoperiod_crossref", requires: { clueFound: "DARK_PERIOD_REQUIRED" } },
                { label: "Back to main menu", goto: "start" }
              ]
            },
            photoperiod_crossref: {
              text: "+----------------------------------+\n|  CROSS-REFERENCE ANALYSIS        |\n+----------------------------------+\n\nManual spec:  12-16h light / day\nActual:       24h light / day\nDeviation:    +8 to +12h excess\n\nManual warns: continuous light\ncauses photooxidative stress and\nculture collapse in 1-2 weeks.\n\nActual collapse onset: 7 days.\nWithin predicted range.",
              bonusInsight: true,
              options: [
                { label: "Back to main menu", goto: "start" }
              ]
            }
          }
        },
        plants: {
          type: "examination",
          speaker: "Spirulina Bioreactor",
          nodes: {
            start: {
              text: "The bioreactor is a tall cylindrical column of green liquid, gently bubbling with CO\u2082 injection. Right now the culture looks thin and pale \u2014 still recovering from the latest crash. A microscope station is set up nearby.",
              options: [
                { label: "Examine culture under microscope", goto: "microscope" },
                { label: "Check the bioreactor housing", goto: "housing" },
                { label: "Look at the culture color", goto: "color" },
                { label: "Compare to healthy baseline", goto: "compare_healthy", requires: { flagSet: "vasquez_described_setup" } }
              ]
            },
            microscope: {
              text: "Under the microscope, spirulina filaments appear stressed. During the crash phase, cells show photooxidative damage \u2014 bleached pigments, fragmented filaments. The surviving population is slowly rebuilding, but the damage pattern is clear: this isn't infection or contamination. The cells are being destroyed by their environment.",
              revealsClue: "PHOTOOXIDATIVE_DAMAGE",
              options: [
                { label: "What does photooxidative damage look like?", goto: "damage_detail" },
                { label: "Check the bioreactor housing", goto: "housing" },
                { label: "Back to field notes", goto: "exit" }
              ]
            },
            damage_detail: {
              text: "The chlorophyll in damaged cells has been bleached \u2014 photosystems overwhelmed by excess light energy. You can see fragmented thylakoid membranes and abnormal pigment distribution. The pattern is textbook photooxidative stress: too much light, not enough recovery time.",
              bonusInsight: true,
              options: [
                { label: "Check the bioreactor housing", goto: "housing" },
                { label: "Back to field notes", goto: "exit" }
              ]
            },
            housing: {
              text: "The bioreactor sits in an open alcove along the main hab corridor. Overhead LED panels run the length of the ceiling \u2014 the same lights that illuminate the entire habitat. There's no curtain, no shade, no way to block the light. When the hab lights are on, the bioreactor is lit.",
              setsFlag: "observed_housing",
              options: [
                { label: "Examine culture under microscope", goto: "microscope" },
                { label: "Look at the culture color", goto: "color" },
                { label: "Back to field notes", goto: "exit" }
              ]
            },
            color: {
              text: "A healthy spirulina culture is deep emerald green. This one is a washed-out pale green, almost translucent in places. The cells that survived the crash are regrowing, but they haven't reached full density yet. In a few days, it will look healthy again... right before the next crash.",
              options: [
                { label: "Examine culture under microscope", goto: "microscope" },
                { label: "Check the bioreactor housing", goto: "housing" },
                { label: "Back to field notes", goto: "exit" }
              ]
            },
            compare_healthy: {
              text: "Dr. Vasquez mentioned the system ran perfectly for four months. The nutrient feed, temperature, and CO\u2082 are all identical to that period. The only environmental variable that changed is the light schedule \u2014 and the bioreactor has no way to escape it.",
              bonusInsight: true,
              options: [
                { label: "Examine culture under microscope", goto: "microscope" },
                { label: "Check the bioreactor housing", goto: "housing" },
                { label: "Back to field notes", goto: "exit" }
              ]
            },
            exit: {
              text: "You step back from the bioreactor. The pale culture bubbles quietly, rebuilding toward its next inevitable crash.",
              endsConversation: true,
              exitLabel: "Back to field notes"
            }
          }
        },
        logs: {
          type: "archive",
          speaker: "Station Technical Archive",
          nodes: {
            start: {
              text: "+----------------------------------+\n|  HAYES STATION TECHNICAL ARCHIVE |\n|  Bioreactor Documentation        |\n+----------------------------------+\n\nAvailable searches:",
              options: [
                { label: "Search: spirulina light requirements", goto: "photoperiod_entry" },
                { label: "Search: bioreactor setup specifications", goto: "setup_specs" },
                { label: "Search: continuous light effects", goto: "continuous_light", requires: { clueFound: "NO_DARK_PERIOD" } },
                { label: "Search: photooxidative stress", goto: "photooxidative_search", requires: { clueFound: "PHOTOOXIDATIVE_DAMAGE" } }
              ]
            },
            photoperiod_entry: {
              text: "+----------------------------------+\n|  BIOREACTOR SETUP MANUAL v2.4    |\n|  Section 4.2: Photoperiod        |\n+----------------------------------+\n\nOptimal spirulina photoperiod:\n  12-16 hours light\n  8-12 hours dark\n\nDark period is ESSENTIAL for:\n  - Cellular repair processes\n  - Protein synthesis\n  - Neutralizing reactive oxygen\n    species (ROS) accumulation\n\n!! WARNING: Continuous illumination\n   will cause photooxidative stress\n   and culture collapse within\n   1-2 weeks.",
              revealsClue: "DARK_PERIOD_REQUIRED",
              options: [
                { label: "Search: why is the dark period needed?", goto: "dark_period_detail" },
                { label: "Search: bioreactor setup specifications", goto: "setup_specs" },
                { label: "Close archive", goto: "exit" }
              ]
            },
            dark_period_detail: {
              text: "+----------------------------------+\n|  Section 4.2.1: Dark Period      |\n|  Biological Rationale            |\n+----------------------------------+\n\nDuring photosynthesis, light energy\ndrives carbon fixation but also\ngenerates reactive oxygen species\n(ROS) as unavoidable byproducts.\n\nDuring the dark period, cells:\n  1. Repair ROS-damaged proteins\n  2. Complete protein synthesis\n  3. Run antioxidant pathways\n  4. Rebuild photosystem components\n\nWithout darkness, ROS accumulates\nfaster than repair can compensate.\nResult: culture crash in 7-14 days.",
              bonusInsight: true,
              options: [
                { label: "Search: bioreactor setup specifications", goto: "setup_specs" },
                { label: "Close archive", goto: "exit" }
              ]
            },
            setup_specs: {
              text: "+----------------------------------+\n|  BIOREACTOR SETUP MANUAL v2.4    |\n|  Section 1.1: Installation       |\n+----------------------------------+\n\nBioreactor MUST have independent\nenvironmental controls:\n  - Dedicated light circuit\n  - Temperature regulation\n  - CO2 feed from hab loop\n\nNOTE: Do not tie bioreactor\nlighting to habitat lighting.\nBiological and crew schedules\nmay differ.",
              setsFlag: "read_setup_specs",
              options: [
                { label: "Search: spirulina light requirements", goto: "photoperiod_entry" },
                { label: "Close archive", goto: "exit" }
              ]
            },
            continuous_light: {
              text: "+----------------------------------+\n|  SEARCH: continuous light        |\n|  3 results                       |\n+----------------------------------+\n\nResult 1 - Setup Manual 4.2:\n\"Continuous illumination will cause\nphotooxidative stress and culture\ncollapse within 1-2 weeks.\"\n\nResult 2 - Maintenance Log Day 8:\n\"Scheduled dark period: 2200-0600.\nAutomated blackout confirmed.\"\n\nResult 3 - Cmdr Order #4471:\n\"Effective Day 121: all hab\nlighting to 24/0 continuous.\nNo exceptions.\"",
              bonusInsight: true,
              options: [
                { label: "Search: spirulina light requirements", goto: "photoperiod_entry" },
                { label: "Close archive", goto: "exit" }
              ]
            },
            photooxidative_search: {
              text: "+----------------------------------+\n|  SEARCH: photooxidative stress   |\n|  2 results                       |\n+----------------------------------+\n\nResult 1 - Setup Manual 4.2.1:\n\"ROS accumulation under continuous\nlight exceeds cellular repair\ncapacity. Antioxidant enzymes\n(SOD, catalase) cannot compensate\nwithout dark-period synthesis.\"\n\nResult 2 - Troubleshooting Guide:\n\"If culture shows photooxidative\ndamage, FIRST check light/dark\ncycle compliance.\"",
              bonusInsight: true,
              options: [
                { label: "Search: spirulina light requirements", goto: "photoperiod_entry" },
                { label: "Close archive", goto: "exit" }
              ]
            },
            exit: {
              text: "[Archive closed]",
              endsConversation: true,
              exitLabel: "Back to field notes"
            }
          }
        }
      },

      clues: [
        {
          action: "crew",
          label: "Talk to Crew",
          icon: "\ud83d\udc68\u200d\ud83d\ude80",
          speaker: "Dr. Vasquez",
          sprites: {
            spritesheet:     "sprites/vasquez/spritesheet.png",
            spritesheetJson: "sprites/vasquez/spritesheet.json"
          },
          text: "The bioreactor is tied into our life support loop \u2014 it scrubs CO\u2082 and produces oxygen plus food-grade spirulina. It ran perfectly for four months. Then Station Commander Roth adjusted the habitat lighting schedule from 16/8 to 24-hour continuous light for crew productivity. A week later, the first crash happened.",
          clueTag: "LIGHTING_SCHEDULE_CHANGED",
          learned: "Habitat lighting switched to 24hr continuous; crashes started shortly after."
        },
        {
          action: "sensors",
          label: "Check Sensors",
          icon: "\ud83d\udcca",
          speaker: "Bioreactor Sensor Array",
          sprites: {
            portrait:   "portrait_sensors.png",
            actionIcon: "icon_sensors.png"
          },
          text: "Bioreactor temp 30\u00b0C (nominal). pH oscillating between 7.8 and 10.2 over each crash cycle. Dissolved CO\u2082 fluctuating. Nutrient feed steady.\n\n\u26a0\ufe0f Light exposure: continuous (24/0) \u2014 bioreactor is in main hab corridor, no independent light control.",
          clueTag: "NO_DARK_PERIOD",
          learned: "Bioreactor gets 24hr light with no dark period; no independent controls."
        },
        {
          action: "plants",
          label: "Examine Culture",
          icon: "\ud83c\udf31",
          speaker: "Spirulina Bioreactor",
          sprites: {
            portrait:   "portrait_bioreactor.png",
            actionIcon: "icon_plants.png"
          },
          text: "Under microscope: spirulina filaments appear stressed. During \"crash\" phase, cells show signs of photooxidative damage \u2014 bleached pigments, fragmented filaments. Between crashes, a small surviving population slowly recovers and rebuilds density before crashing again. Classic boom-bust pattern.",
          clueTag: "PHOTOOXIDATIVE_DAMAGE",
          learned: "Algae show damage from light stress, not infection or contamination."
        },
        {
          action: "logs",
          label: "Review Logs",
          icon: "\ud83d\udccb",
          speaker: "Bioreactor Setup Manual",
          sprites: {
            portrait:   "portrait_logs.png",
            actionIcon: "icon_logs.png"
          },
          text: "Bioreactor setup manual: \"Optimal spirulina photoperiod: 12\u201316 hours light, 8\u201312 hours dark. Dark period is essential for cellular repair, protein synthesis, and preventing reactive oxygen species (ROS) accumulation.\"\n\n\u26a0\ufe0f WARNING: Continuous illumination will cause photooxidative stress and culture collapse within 1\u20132 weeks.",
          clueTag: "DARK_PERIOD_REQUIRED",
          learned: "Manual warns: continuous light kills the culture. Dark period is essential."
        }
      ],

      diagnoses: [
        {
          id: "nutrients",
          label: "The nutrient feed has been contaminated.",
          isCorrect: false,
          hint: "Nutrient feed sensors show steady delivery. The crash pattern is cyclical and coincides with a specific change aboard the station."
        },
        {
          id: "light",
          label: "Continuous 24hr lighting is destroying the algae \u2014 the dark period is essential for cellular repair.",
          isCorrect: true
        },
        {
          id: "co2",
          label: "CO\u2082 supply has become inconsistent.",
          isCorrect: false,
          hint: "CO\u2082 fluctuations are a symptom of the crash, not the cause. The culture's CO\u2082 uptake drops when the cells are damaged."
        },
        {
          id: "infection",
          label: "A competing microorganism has infected the reactor.",
          isCorrect: false,
          hint: "Microscopy shows photooxidative damage, not infection. The filaments are being stressed by their environment, not attacked."
        }
      ],

      rankUpText: "Even in space, biology needs rest. You proved that darkness isn't downtime \u2014 it's when cells do their most critical repairs.",

      explanation: {
        title: "The Dark Side of Light: Why Plants Need Night",
        body: "Photosynthesis is only half the story. During the light period, photosystems capture energy and produce sugars \u2014 but they also generate reactive oxygen species (ROS) as a byproduct, which damage cellular components. During the dark period, cells run essential repair processes, complete protein synthesis, and neutralize accumulated ROS. Without this recovery time, damage builds up faster than repairs can handle. The culture crashes, a small resistant population survives, regrows... and crashes again.\n\nThis principle extends beyond algae. Most plants need a dark period for proper growth \u2014 it's when they convert sugars into structural materials, regulate hormone cycles, and carry out maintenance. The lesson for space habitat design: biological systems and crew convenience sometimes conflict, and life support equipment needs independent environmental controls.",
        funFact: "The circadian clock is so important to plants that Arabidopsis seedlings grown under continuous light in space experiments showed epigenetic changes \u2014 their gene expression patterns shifted to \"force\" an internal rhythm even without external dark cues."
      }
    },

    // ── CASE 5: Europa Outpost ────────────────────────────────────
    {
      id: "europa",
      name: "Europa Outpost",
      location: "Sub-Surface Bunker",
      subtitle: "Europa (Jupiter's Moon)",
      palette: {
        bg:        "#0a1628",
        bgMid:     "#152238",
        accent:    "#4dd0e1",
        highlight: "#e0f7fa",
        plant:     "#c5e1a5"
      },
      sprites: {
        scene: "sprites/scene_europa.png"
      },
      sceneFx: { type: 'bubbles', mask: 'sprites/scene_europa.mask.png' },
      briefing: "Final mission, Dr. Nova. Europa outpost reports total crop failure. Wheat seedlings germinate normally, grow 2\u20133cm, then wilt and die within days. Multiple planting attempts have failed identically. Commander Torres needs answers \u2014 the outpost's food supply depends on it.",

      sources: {
        crew: {
          type: "conversation",
          speaker: "Commander Torres",
          personality: "stoic",
          startMood: 0,
          nodes: {
            start: {
              text: "[Commander Torres stands by the seedling trays, arms crossed. She barely glances up as you enter.]\n\nDr. Nova. You've been briefed?",
              options: [
                { label: "Tell me what's happening.", goto: "problem_main" },
                { label: "How many attempts so far?", goto: "attempts" },
                { label: "What are the growing conditions?", goto: "conditions" },
                { label: "The radiation readings are elevated.", goto: "radiation_reading", requires: { clueFound: "HIGH_RADIATION" } },
                { label: "The seedlings show DNA damage patterns.", goto: "dna_connection", requires: { clueFound: "DNA_DAMAGE_PATTERN" } },
                { label: "The shielding assessment was never completed.", goto: "shielding_issue", requires: { clueFound: "SHIELDING_INSUFFICIENT" } },
                { label: "Could low gravity be affecting root development?", goto: "wrong_guess_gravity" },
                { label: "Maybe the water is contaminated by subsurface minerals.", goto: "wrong_guess_water" },
                { label: "Could the lights be too intense?", goto: "wrong_guess_light" }
              ]
            },
            problem_main: {
              text: "Every batch. Same result. Seeds germinate fine. Seedlings grow two, three centimeters. Then brown spots appear on the leaves. Within days, they're dead. We've lost four full plantings.",
              revealsClue: "CONSISTENT_FAILURE",
              setsFlag: "torres_described_failure",
              options: [
                { label: "What do the brown spots look like?", goto: "spot_details" },
                { label: "How many attempts so far?", goto: "attempts" },
                { label: "I'll investigate.", goto: "exit_neutral" }
              ]
            },
            spot_details: {
              text: "Random. Not along the veins, not on the edges. Just scattered across the leaf surface. The growing tips go soft \u2014 like the cells forget how to organize. I've seen frost damage, I've seen nutrient deficiency. This doesn't look like either.",
              setsFlag: "torres_mentioned_spots",
              options: [
                { label: "How many attempts so far?", goto: "attempts" },
                { label: "What are the growing conditions?", goto: "conditions" },
                { label: "I'll look at the seedlings myself.", goto: "exit_neutral" }
              ]
            },
            attempts: {
              text: "Four plantings. Different seed stock each time. Third attempt we changed nutrient solution. Fourth attempt we tried different trays, different shelf positions. Identical failure pattern every time.",
              setsFlag: "torres_described_attempts",
              options: [
                { label: "What do the brown spots look like?", goto: "spot_details" },
                { label: "What are the growing conditions?", goto: "conditions" },
                { label: "That rules out a lot of variables.", goto: "systematic" },
                { label: "I'll investigate.", goto: "exit_neutral" }
              ]
            },
            systematic: {
              text: "That's what I thought. It's not the seeds. It's not the nutrients. It's not the trays. It's something about this location that's killing them.",
              options: [
                { label: "What are the growing conditions?", goto: "conditions" },
                { label: "I'll check the environment.", goto: "exit_neutral" }
              ]
            },
            conditions: {
              text: "Standard setup. Full-spectrum LEDs, 16/8 cycle. Temperature 21 degrees. Humidity 60 percent. CO\u2082 supplemented to 1000ppm. Nutrients by the book. Everything reads nominal.",
              setsFlag: "torres_described_conditions",
              options: [
                { label: "If everything reads nominal, the problem is something you're not measuring.", goto: "not_measuring" },
                { label: "I'll check the sensors myself.", goto: "exit_neutral" }
              ]
            },
            not_measuring: {
              text: "Agreed. That's why you're here.",
              options: [
                { label: "Tell me about the outpost's location.", goto: "location_info" },
                { label: "I'll start investigating.", goto: "exit_neutral" }
              ]
            },
            location_info: {
              text: "Sub-surface bunker. Three meters of ice overhead plus polyethylene structural panels. We're deep enough to block most of what Jupiter throws at us. Most.",
              setsFlag: "torres_mentioned_shielding",
              options: [
                { label: "'Most' \u2014 not all?", goto: "shielding_doubt" },
                { label: "I'll check the construction logs.", goto: "exit_neutral" }
              ]
            },
            shielding_doubt: {
              text: "The primary cosmic radiation, yes. The secondary cascades \u2014 neutrons generated when primaries hit the ice and rock around us \u2014 that's harder to stop. Engineering said the residual dose would be within tolerance. But tolerance for what? People. Not necessarily plants.",
              bonusInsight: true,
              options: [
                { label: "Seedlings might be more vulnerable than adults.", goto: "vulnerability" },
                { label: "I need to check the radiation data.", goto: "exit_neutral" }
              ]
            },
            vulnerability: {
              text: "Seedlings are all growing tips. Rapidly dividing cells. If there's something damaging DNA during replication... that would explain why they germinate fine but fall apart once they start real growth.",
              bonusInsight: true,
              options: [
                { label: "I'll check the radiation monitors.", goto: "exit_neutral" },
                { label: "I'll examine the seedlings under magnification.", goto: "exit_neutral" }
              ]
            },
            radiation_reading: {
              text: "53 millisieverts per day. That's above human occupational limits. We're shielded enough for short-duration crew rotation, but those seedlings are in it 24/7 with no protection beyond what the room provides.",
              bonusInsight: true,
              options: [
                { label: "The seedlings show DNA damage consistent with radiation.", goto: "radiation_plus_dna", requires: { clueFound: "DNA_DAMAGE_PATTERN" } },
                { label: "The shielding was never tested for biological tolerance.", goto: "radiation_plus_shielding", requires: { clueFound: "SHIELDING_INSUFFICIENT" } },
                { label: "I need more evidence.", goto: "exit_neutral" }
              ]
            },
            dna_connection: {
              text: "DNA damage. In the growing tips. That's why the spots are random \u2014 it's not a systemic nutrient issue, it's individual cells failing at division. The damage happens wherever cells are actively replicating.",
              bonusInsight: true,
              options: [
                { label: "The radiation here is 53 mSv per day.", goto: "dna_plus_radiation", requires: { clueFound: "HIGH_RADIATION" } },
                { label: "The shielding assessment was never finished.", goto: "dna_plus_shielding", requires: { clueFound: "SHIELDING_INSUFFICIENT" } },
                { label: "I'll keep investigating.", goto: "exit_neutral" }
              ]
            },
            shielding_issue: {
              text: "Pending. They listed it as pending. Four months of crew operations and no one followed up on whether the biological shielding was adequate. Because the crew was fine. But the crops aren't crew.",
              bonusInsight: true,
              setsFlag: "torres_discussed_shielding",
              options: [
                { label: "The radiation reads 53 mSv per day in here.", goto: "shielding_plus_radiation", requires: { clueFound: "HIGH_RADIATION" } },
                { label: "The seedlings show DNA replication damage.", goto: "shielding_plus_dna", requires: { clueFound: "DNA_DAMAGE_PATTERN" } },
                { label: "I'll gather more data.", goto: "exit_neutral" }
              ]
            },
            radiation_plus_dna: {
              text: "High radiation. DNA damage in dividing cells. That's the mechanism. The secondary cascades are hitting the seedlings right where they're most vulnerable \u2014 the meristems, where every cell is copying its DNA.",
              bonusInsight: true,
              options: [
                { label: "The shielding was designed for crew, not crops.", goto: "full_picture", requires: { clueFound: "SHIELDING_INSUFFICIENT" } },
                { label: "Additional shielding around the grow chamber could help.", goto: "solution_discuss" },
                { label: "I'll check the construction specs.", goto: "exit_neutral" }
              ]
            },
            dna_plus_radiation: {
              text: "53 mSv per day, and cells replicating with damaged DNA. Adults tolerate it because most of their cells aren't dividing. Seedlings are nothing but dividing cells. The dose that's acceptable for crew is lethal for crops.",
              bonusInsight: true,
              options: [
                { label: "The shielding was never assessed for plants.", goto: "full_picture", requires: { clueFound: "SHIELDING_INSUFFICIENT" } },
                { label: "Water walls or regolith packing could reduce the dose.", goto: "solution_discuss" },
                { label: "I'll look at the construction logs.", goto: "exit_neutral" }
              ]
            },
            radiation_plus_shielding: {
              text: "Designed for crew. Assessed for crew. Adequate for crew. Nobody asked whether 53 mSv per day would kill wheat seedlings because nobody thought to ask.",
              options: [
                { label: "The seedlings show DNA damage in rapidly dividing cells.", goto: "full_picture", requires: { clueFound: "DNA_DAMAGE_PATTERN" } },
                { label: "Seedlings are more vulnerable than mature plants.", goto: "solution_discuss" },
                { label: "I'll examine the plants.", goto: "exit_neutral" }
              ]
            },
            shielding_plus_radiation: {
              text: "53 mSv in a facility where the biological shielding was never assessed. That number is above human occupational limits. For rapidly dividing plant cells, it could be catastrophic.",
              options: [
                { label: "The seedlings confirm it \u2014 DNA damage in every growing tip.", goto: "full_picture", requires: { clueFound: "DNA_DAMAGE_PATTERN" } },
                { label: "We need additional shielding for the grow chamber.", goto: "solution_discuss" },
                { label: "I'll check the plants.", goto: "exit_neutral" }
              ]
            },
            shielding_plus_dna: {
              text: "Untested shielding. DNA replication errors. The engineering team designed this outpost to keep people alive, not to grow food. Different requirements.",
              options: [
                { label: "The radiation monitor confirms it \u2014 53 mSv per day.", goto: "full_picture", requires: { clueFound: "HIGH_RADIATION" } },
                { label: "The grow chamber needs its own shielding.", goto: "solution_discuss" },
                { label: "I'll check the sensors.", goto: "exit_neutral" }
              ]
            },
            dna_plus_shielding: {
              text: "DNA damage plus an incomplete shielding assessment. The construction team flagged it as pending and moved on. Now we're seeing exactly the biological effects they should have tested for.",
              options: [
                { label: "Radiation sensors show 53 mSv per day.", goto: "full_picture", requires: { clueFound: "HIGH_RADIATION" } },
                { label: "We need better shielding for the grow chamber.", goto: "solution_discuss" },
                { label: "I'll check the radiation data.", goto: "exit_neutral" }
              ]
            },
            full_picture: {
              text: "Secondary particle cascades. 53 mSv per day. Shielding designed for humans, not assessed for plants. DNA damage in every rapidly dividing cell. The outpost can keep people alive but it can't grow food. Not without additional shielding.",
              bonusInsight: true,
              options: [
                { label: "Water walls around the grow chamber would help.", goto: "solution_discuss" },
                { label: "Radiation-hardened crop varieties might survive.", goto: "solution_discuss" },
                { label: "I have what I need for the diagnosis.", goto: "exit_neutral" }
              ]
            },
            solution_discuss: {
              text: "Water walls. Regolith packing. Move the grow chamber to the most shielded section. And in the long term, radiation-tolerant crop varieties. I'll draft the engineering request. At least now we know what we're fighting.",
              options: [
                { label: "Good luck, Commander.", goto: "exit_stoic" },
                { label: "I'll file my diagnosis.", goto: "exit_neutral" }
              ]
            },
            wrong_guess_gravity: {
              text: "We're at 0.13g. Low, but the roots develop fine. They germinate, they grow initial roots. The failure happens after establishment. Gravity isn't changing between day three and day seven.",
              moodShift: -1,
              setsFlag: "torres_wrong_gravity",
              options: [
                { label: "Fair point. What else could it be?", goto: "problem_main" },
                { label: "I'll investigate further.", goto: "exit_neutral" }
              ]
            },
            wrong_guess_water: {
              text: "Water's been tested. pH 6.5, nutrient levels nominal, no detectable contaminants. We're using filtered meltwater from the ice layer. Fourth planting we used completely fresh solution. Same result.",
              moodShift: -1,
              setsFlag: "torres_wrong_water",
              options: [
                { label: "What about the other environmental factors?", goto: "conditions" },
                { label: "I'll look at the data.", goto: "exit_neutral" }
              ]
            },
            wrong_guess_light: {
              text: "Standard LEDs, 16/8 cycle. Same specs as ISS agricultural modules. Same intensity. The seedlings germinate normally under these lights. If the light were wrong, they'd fail from the start.",
              moodShift: -1,
              setsFlag: "torres_wrong_light",
              options: [
                { label: "So the problem starts after germination.", goto: "systematic" },
                { label: "I'll check the other systems.", goto: "exit_neutral" }
              ]
            },
            annoyed: {
              text: "Doctor. I've already addressed that. The outpost's food supply is at stake and we're going in circles. Ask me something I haven't already answered, or go investigate.",
              revealsClue: "CONSISTENT_FAILURE",
              options: [
                { label: "You're right. I'll focus on the evidence.", goto: "exit_neutral" },
                { label: "The radiation readings are elevated.", goto: "radiation_reading", requires: { clueFound: "HIGH_RADIATION" } },
                { label: "The seedlings show DNA damage.", goto: "dna_connection", requires: { clueFound: "DNA_DAMAGE_PATTERN" } },
                { label: "The shielding assessment was never completed.", goto: "shielding_issue", requires: { clueFound: "SHIELDING_INSUFFICIENT" } }
              ]
            },
            exit_stoic: {
              text: "Luck has nothing to do with it. But thanks.",
              endsConversation: true,
              exitLabel: "Head out"
            },
            exit_neutral: {
              text: "I'll be here.",
              endsConversation: true,
              exitLabel: "Head back"
            },
            exit_cold: {
              text: "[Torres nods once and turns back to the seedling trays.]",
              endsConversation: true,
              exitLabel: "Leave"
            }
          }
        },
        sensors: {
          type: "terminal",
          speaker: "Europa Outpost Sensor Array",
          startState: "nominal",
          nodes: {
            start: {
              text: "+----------------------------------+\n|  EUROPA OUTPOST SENSOR ARRAY     |\n|  Status: ONLINE                  |\n+----------------------------------+\n\nAwaiting query.",
              options: [
                { label: "Display environmental readings", goto: "env_readings" },
                { label: "Display radiation monitoring", goto: "radiation_detail" },
                { label: "Display growth chamber conditions", goto: "growth_chamber" },
                { label: "Query: radiation effects on cellular division", goto: "cellular_query", requires: { clueFound: "DNA_DAMAGE_PATTERN" } },
                { label: "Cross-reference: shielding efficacy", goto: "shielding_crossref", requires: { clueFound: "SHIELDING_INSUFFICIENT" } }
              ]
            },
            env_readings: {
              text: "+----------------------------------+\n|  ENVIRONMENTAL READINGS          |\n+----------------------------------+\n\nTemp:     21.0C  (nominal)\nHumidity: 60%    (nominal)\nCO2:      1000ppm (supplemented)\nWater pH: 6.5    (nominal)\nNutrient: optimal (auto-feed)\nLight:    full-spectrum LED 16/8\n\nAll parameters within tolerance.",
              options: [
                { label: "Display radiation monitoring", goto: "radiation_detail" },
                { label: "Display growth chamber conditions", goto: "growth_chamber" },
                { label: "Back to main menu", goto: "start" }
              ]
            },
            radiation_detail: {
              text: "+----------------------------------+\n|  RADIATION MONITORING            |\n+----------------------------------+\n\nAmbient dose rate: 53.2 mSv/day\nStatus:  !! ABOVE THRESHOLD !!\n\nBreakdown:\n  Primary cosmic:    2.1 mSv/day\n  (shielded by 3m ice + panels)\n  Secondary cascade: 51.1 mSv/day\n  (neutrons from ice/rock)\n\nHuman crew limit:  50 mSv/year\nCurrent annual eq: 19,418 mSv/yr\n\nNote: Crew rotation limits\nexposure. Stationary biological\nsystems receive continuous dose.",
              revealsClue: "HIGH_RADIATION",
              options: [
                { label: "Query: radiation effects on cellular division", goto: "cellular_query", requires: { clueFound: "DNA_DAMAGE_PATTERN" } },
                { label: "Display growth chamber conditions", goto: "growth_chamber" },
                { label: "Back to main menu", goto: "start" }
              ]
            },
            growth_chamber: {
              text: "+----------------------------------+\n|  GROWTH CHAMBER CONDITIONS       |\n+----------------------------------+\n\nPlanting cycle:   5 (current)\nSeedling status:  Day 4\nGermination rate: 94% (normal)\nCurrent height:   1.8cm avg\nLeaf condition:   spots forming\n\nHistorical failure point:\n  Day 5-8 across all plantings.\n  Onset of visible damage\n  correlates with active cell\n  division in meristematic tissue.",
              options: [
                { label: "Display radiation monitoring", goto: "radiation_detail" },
                { label: "Display environmental readings", goto: "env_readings" },
                { label: "Back to main menu", goto: "start" }
              ]
            },
            cellular_query: {
              text: "+----------------------------------+\n|  QUERY: RADIATION + CELL DIV     |\n+----------------------------------+\n\nRadiation-induced DNA damage is\nproportional to replication rate.\n\nMeristematic cells (root tips,\nshoot tips) divide every 12-24h.\nEach division = exposure window\nfor strand breaks.\n\nAt 53 mSv/day, estimated DNA\ndouble-strand breaks per cell:\n  Dividing cells:  ~0.8/day\n  Quiescent cells: ~0.1/day\n\nSeedlings are 80%+ meristematic\ntissue. Mature plants: <5%.",
              bonusInsight: true,
              options: [
                { label: "Cross-reference: shielding efficacy", goto: "shielding_crossref", requires: { clueFound: "SHIELDING_INSUFFICIENT" } },
                { label: "Back to main menu", goto: "start" }
              ]
            },
            shielding_crossref: {
              text: "+----------------------------------+\n|  SHIELDING EFFICACY ANALYSIS     |\n+----------------------------------+\n\nPrimary radiation reduction: 94%\nSecondary cascade reduction: 12%\n\nDesign standard: human crew\n  (rotating, limited exposure)\nBiological assessment: INCOMPLETE\n\nFor continuous plant exposure:\n  Required reduction: >99%\n  Actual reduction:    41%\n  Deficit:             58%\n\nRecommendation: additional\nshielding required for any\nlong-duration biological system.",
              bonusInsight: true,
              options: [
                { label: "Back to main menu", goto: "start" }
              ]
            }
          }
        },
        plants: {
          type: "examination",
          speaker: "Wheat Seedling Tray",
          nodes: {
            start: {
              text: "Rows of small seedling trays sit under full-spectrum LEDs. Most of the seedlings are only a couple of centimeters tall. Several show brown spots on their leaves. A magnification station is set up nearby.",
              options: [
                { label: "Examine seedlings under magnification", goto: "microscope" },
                { label: "Check the brown spots", goto: "brown_spots" },
                { label: "Examine root systems", goto: "roots" },
                { label: "Compare to expected growth at this radiation level", goto: "radiation_comparison", requires: { clueFound: "HIGH_RADIATION" } }
              ]
            },
            microscope: {
              text: "Under magnification, the growing tips tell the story. Cells in the meristems \u2014 the actively dividing tissue at root tips and shoot tips \u2014 are disorganized. Some cells have divided unevenly. Others contain fragmented nuclei. The damage is random, scattered, consistent with DNA replication errors rather than any systemic deficiency.",
              revealsClue: "DNA_DAMAGE_PATTERN",
              options: [
                { label: "What would cause random DNA errors?", goto: "dna_detail" },
                { label: "Check the brown spots", goto: "brown_spots" },
                { label: "Back to field notes", goto: "exit" }
              ]
            },
            dna_detail: {
              text: "The pattern is specific: damage concentrated in rapidly dividing tissue, random distribution across individual cells, no pathogen signature, no nutrient pattern. Something is disrupting DNA replication at the molecular level \u2014 hitting individual cells at random during their most vulnerable phase: copying their genome.",
              bonusInsight: true,
              options: [
                { label: "Examine root systems", goto: "roots" },
                { label: "Back to field notes", goto: "exit" }
              ]
            },
            brown_spots: {
              text: "The brown spots are necrotic \u2014 dead tissue. They're scattered randomly across the leaf surfaces, not following veins or edges. Each spot is a small cluster of cells that died during or shortly after division. The randomness rules out nutrient deficiency (which follows vein patterns) and pathogen attack (which spreads from infection points).",
              setsFlag: "examined_spots",
              options: [
                { label: "Examine seedlings under magnification", goto: "microscope" },
                { label: "Examine root systems", goto: "roots" },
                { label: "Back to field notes", goto: "exit" }
              ]
            },
            roots: {
              text: "The roots have developed \u2014 seedlings aren't failing to establish. But the root tips show the same disorganization as the shoot tips. Cells are dividing irregularly, with visible abnormalities under magnification. Whatever is damaging the seedlings is affecting all meristematic tissue equally.",
              options: [
                { label: "Examine seedlings under magnification", goto: "microscope" },
                { label: "Check the brown spots", goto: "brown_spots" },
                { label: "Back to field notes", goto: "exit" }
              ]
            },
            radiation_comparison: {
              text: "At 53 mSv per day, a seedling composed almost entirely of rapidly dividing meristematic cells would accumulate significant DNA damage within days. The timing matches: germination succeeds (minimal cell division needed), initial growth begins, then active meristematic growth triggers visible damage by day 5-8. The radiation dose that's manageable for a rotating human crew is devastating for stationary, rapidly dividing plant tissue.",
              bonusInsight: true,
              options: [
                { label: "Examine seedlings under magnification", goto: "microscope" },
                { label: "Back to field notes", goto: "exit" }
              ]
            },
            exit: {
              text: "You step back from the seedling trays. Under the bright LEDs, the tiny wheat shoots look healthy enough \u2014 for now. In a few days, the brown spots will spread.",
              endsConversation: true,
              exitLabel: "Back to field notes"
            }
          }
        },
        logs: {
          type: "archive",
          speaker: "Outpost Construction Archive",
          nodes: {
            start: {
              text: "+----------------------------------+\n|  EUROPA OUTPOST                  |\n|  Construction Archive            |\n+----------------------------------+\n\nAvailable searches:",
              options: [
                { label: "Search: radiation shielding specifications", goto: "construction_log" },
                { label: "Search: outpost location selection", goto: "site_selection" },
                { label: "Search: radiation dose data", goto: "radiation_search", requires: { clueFound: "HIGH_RADIATION" } },
                { label: "Search: biological effects of radiation", goto: "dna_damage_search", requires: { clueFound: "DNA_DAMAGE_PATTERN" } }
              ]
            },
            construction_log: {
              text: "+----------------------------------+\n|  CONSTRUCTION SPEC: SHIELDING    |\n+----------------------------------+\n\nRadiation shielding:\n  3m ice overburden\n  15cm polyethylene panels\n  Est. primary reduction: 94%\n\n!! NOTE: Secondary neutron cascade\n   from Jupiter magnetosphere\n   interaction with surrounding\n   ice/rock may elevate residual\n   dose.\n\n   Biological shielding assessment:\n   PENDING - awaiting crop trial\n   results.",
              revealsClue: "SHIELDING_INSUFFICIENT",
              options: [
                { label: "Search: outpost location selection", goto: "site_selection" },
                { label: "Search: biological shielding requirements", goto: "bio_shielding" },
                { label: "Close archive", goto: "exit" }
              ]
            },
            site_selection: {
              text: "+----------------------------------+\n|  SITE SELECTION REPORT           |\n+----------------------------------+\n\nEuropa subsurface site selected\nfor:\n  - Liquid water access (ice melt)\n  - Stable temperature (tidal)\n  - Structural ice for shielding\n\nKnown risks:\n  - Jupiter radiation belts\n    (highest in solar system)\n  - Secondary particle generation\n    in surrounding material\n  - Limited shielding options\n    beyond ice and regolith\n\nMitigation: depth + polyethylene.\nAssessment: adequate for human\ncrew on rotation schedules.",
              options: [
                { label: "Search: radiation shielding specifications", goto: "construction_log" },
                { label: "Close archive", goto: "exit" }
              ]
            },
            bio_shielding: {
              text: "+----------------------------------+\n|  BIOLOGICAL SHIELDING REQS       |\n+----------------------------------+\n\nHuman crew:\n  Annual limit: 50 mSv/year\n  Rotation: 180 days max\n  Status: WITHIN LIMITS (marginal)\n\nPlant systems:\n  Tolerance varies by growth stage\n  Seedlings: HIGHLY SENSITIVE\n  (meristematic tissue vulnerable)\n  Mature plants: MODERATE tolerance\n\n  Recommended max for seedlings:\n  < 1 mSv/day continuous\n  Current measured: 53 mSv/day\n\n  !! SHIELDING INADEQUATE FOR\n     PLANT CULTIVATION !!",
              bonusInsight: true,
              options: [
                { label: "Search: outpost location selection", goto: "site_selection" },
                { label: "Close archive", goto: "exit" }
              ]
            },
            radiation_search: {
              text: "+----------------------------------+\n|  SEARCH: radiation dose data     |\n|  3 results                       |\n+----------------------------------+\n\nResult 1 - Construction Spec:\n\"Est. primary reduction: 94%.\nSecondary cascade: not fully\ncharacterized.\"\n\nResult 2 - Crew Medical Log:\n\"All personnel within acceptable\ndose limits per rotation schedule.\"\n\nResult 3 - Environmental Monitor:\n\"Ambient: 53.2 mSv/day.\nPrimary: 2.1. Secondary: 51.1.\nSecondary cascade is dominant\nradiation source in outpost.\"",
              bonusInsight: true,
              options: [
                { label: "Search: biological effects of radiation", goto: "dna_damage_search", requires: { clueFound: "DNA_DAMAGE_PATTERN" } },
                { label: "Search: biological shielding requirements", goto: "bio_shielding" },
                { label: "Close archive", goto: "exit" }
              ]
            },
            dna_damage_search: {
              text: "+----------------------------------+\n|  SEARCH: biological effects      |\n|  2 results                       |\n+----------------------------------+\n\nResult 1 - Radiobiology Ref:\n\"Ionizing radiation causes DNA\ndouble-strand breaks. Damage rate\nproportional to dose and cell\ndivision rate. Meristematic tissue\n(actively dividing) is 8-10x more\nradiosensitive than quiescent.\"\n\nResult 2 - Ag Module Guidelines:\n\"For radiation >10 mSv/day,\nadditional shielding required for\ncrop cultivation. Water walls\n(20cm) reduce secondary neutrons\nby ~60%.\"",
              bonusInsight: true,
              options: [
                { label: "Search: biological shielding requirements", goto: "bio_shielding" },
                { label: "Close archive", goto: "exit" }
              ]
            },
            exit: {
              text: "[Archive closed]",
              endsConversation: true,
              exitLabel: "Back to field notes"
            }
          }
        }
      },

      clues: [
        {
          action: "crew",
          label: "Talk to Crew",
          icon: "\ud83d\udc68\u200d\ud83d\ude80",
          speaker: "Commander Torres",
          sprites: {
            spritesheet:     "sprites/torres/spritesheet.png",
            spritesheetJson: "sprites/torres/spritesheet.json",
            pingPong:        true
          },
          text: "Every batch does the same thing. They sprout fine, get a couple centimeters tall, then just... collapse. The leaves get these weird brown spots, then the whole seedling goes limp. We've tried different seed stock, different nutrient mixes, even different trays. Same result every time.",
          clueTag: "CONSISTENT_FAILURE",
          learned: "Multiple attempts with different variables all fail identically at the same stage."
        },
        {
          action: "sensors",
          label: "Check Sensors",
          icon: "\ud83d\udcca",
          speaker: "Europa Outpost Sensors",
          sprites: {
            portrait:   "portrait_sensors.png",
            actionIcon: "icon_sensors.png"
          },
          text: "Nutrients optimal. Water pH 6.5. Temp 21\u00b0C. Humidity 60%. Light: full-spectrum LEDs, 16/8 cycle. CO\u2082 1000ppm.\n\n\u2622\ufe0f Radiation monitor: 53 mSv/day. [WARNING: ABOVE THRESHOLD]\nNote: Europa surface radiation heavily shielded by ice layer. Residual exposure from secondary particle cascades in surrounding rock.",
          clueTag: "HIGH_RADIATION",
          learned: "Radiation levels are 53 mSv/day \u2014 flagged above safe threshold."
        },
        {
          action: "plants",
          label: "Examine Plants",
          icon: "\ud83c\udf31",
          speaker: "Wheat Seedling Tray",
          sprites: {
            portrait:   "portrait_europa.png",
            actionIcon: "icon_plants.png"
          },
          text: "Seedlings show characteristic damage: brown necrotic spots scattered randomly on leaves (not following vein patterns). Growing tips appear disorganized under magnification \u2014 cells dividing irregularly. Root tips show similar disorganization. Damage consistent with DNA replication errors in rapidly dividing tissue.",
          clueTag: "DNA_DAMAGE_PATTERN",
          learned: "Damage targets rapidly dividing cells \u2014 consistent with radiation-induced DNA errors."
        },
        {
          action: "logs",
          label: "Review Logs",
          icon: "\ud83d\udccb",
          speaker: "Construction Log Archive",
          sprites: {
            portrait:   "portrait_logs.png",
            actionIcon: "icon_logs.png"
          },
          text: "Outpost construction log: \"Radiation shielding: 3m ice overburden + 15cm polyethylene structural panels. Estimated shielding reduction: 94% of primary cosmic radiation.\"\n\n\u26a0\ufe0f Note: Secondary neutron cascade from Jupiter's magnetosphere interaction with surrounding ice/rock may elevate residual dose. Biological shielding assessment: PENDING \u2014 awaiting crop trial results.",
          clueTag: "SHIELDING_INSUFFICIENT",
          learned: "Shielding blocks primary radiation but secondary particles get through. Assessment never completed."
        }
      ],

      diagnoses: [
        {
          id: "gravity",
          label: "Europa's low gravity is preventing root development.",
          isCorrect: false,
          hint: "Europa has ~0.13g, which is low but nonzero. The roots are actually developing \u2014 the problem is they're being damaged after forming."
        },
        {
          id: "minerals",
          label: "Subsurface minerals are contaminating the water supply.",
          isCorrect: false,
          hint: "Water pH and nutrient levels are normal. The damage pattern doesn't match chemical contamination."
        },
        {
          id: "light",
          label: "LED light intensity is too high for seedlings.",
          isCorrect: false,
          hint: "The light setup is standard and identical to systems that work on the ISS and Moon. Seedlings germinate fine initially under these same lights."
        },
        {
          id: "radiation",
          label: "Radiation levels are too high \u2014 secondary particle cascades are causing DNA damage in rapidly dividing seedling cells.",
          isCorrect: true
        }
      ],

      rankUpText: "The final frontier's toughest enemy is invisible. You've learned that shielding crops from cosmic radiation may be humanity's greatest farming challenge yet.",

      explanation: {
        title: "Cosmic Radiation: The Invisible Enemy of Space Farming",
        body: "Earth's magnetic field and thick atmosphere shield surface life from most cosmic radiation. The ISS and lunar bases get some protection from proximity to Earth's magnetosphere. But Europa orbits within Jupiter's intense radiation belts \u2014 the most powerful in the solar system. Even beneath Europa's ice crust, secondary particle cascades (neutrons and other particles generated when primary radiation hits rock and ice) can create a persistent low-level radiation field.\n\nSeedlings are especially vulnerable because radiation damages DNA, and young plants have huge numbers of rapidly dividing cells at their root tips and shoot tips. A mature plant can tolerate more damage because most of its cells aren't actively dividing. Solutions include additional shielding (water walls, regolith packing), selecting radiation-tolerant crop varieties, shorter-cycle crops, and strategic placement of grow chambers in the most shielded areas.",
        funFact: "Tardigrades \u2014 the famously indestructible micro-animals \u2014 survive extreme radiation partly through a unique protein called Dsup (Damage Suppressor) that physically wraps around DNA to shield it. Scientists have experimentally transferred the Dsup gene into plant cells, significantly boosting their radiation tolerance. Future space crops might carry tardigrade genes."
      }
    },

    // ── CASE 6: First Contact Protocol (BONUS) ──────────────────────
    {
      id: "alien1",
      name: "First Contact Protocol",
      location: "Zhel'ora Botanical Vessel",
      subtitle: "Docked at L2 Station Hayes",
      isBonus: true,
      ranksUp: false,
      palette: {
        bg:        "#1a0a2e",
        bgMid:     "#2d1f4e",
        accent:    "#4ecdc4",
        highlight: "#f7d794",
        plant:     "#7bed9f"
      },
      sprites: {
        scene:     "sprites/scene_alien1.png",
        sceneAlt:  "sprites/scene_alien2.png"
      },
      sceneWindow: { x: 8, y: 104, w: 60, h: 88 },
      sceneReveal: true,
      connectionScreen: true,
      briefing: "\u2550\u2550\u2550 PRIORITY ALPHA \u2014 SAA HEADQUARTERS \u2550\u2550\u2550\n\nDr. Nova, you're aware of the alien botanical vessel that docked at Hayes Station three days ago for first contact protocols.\n\nWe've just received a formal request from their liaison. Their primary food crop is failing. They don't know why.\n\nThey've been monitoring our agricultural communications for some time and specifically requested SAA assistance. They believe we have expertise in \"hostile environment cultivation\" that might help.\n\nThis is unprecedented \u2014 an alien species asking us for farming advice!? Don't let them down. And don't let us down either.\n\n\u2014 Director Chen, SAA",

      // Alien-themed action labels
      actionLabels: {
        crew:    "Consult Liaison",
        sensors: "Interface Array",
        plants:  "Inspect Cultivar",
        logs:    "Parse Records"
      },

      sources: {
        // ── Zel'keth (Alien Liaison) ──────────────────────────────────
        crew: {
          type: "conversation",
          speaker: "Zel'keth",
          personality: "curious",
          startMood: 0,
          nodes: {
            start: {
              text: "Greetings-welcome, Dr. Nova of the Solar Agricultural Authority. This unit is designated [TRANSLATOR APPROXIMATION: Zel'keth].\n\nThe three-who-are-one have entered cessation-of-function. This began... [TRANSLATOR: calculating time units] ...approximately three of your day-cycles after we accepted docking-invitation with your station.\n\nWe have examined our own systems. Atmosphere is nominal. Light is nominal. Temperature is nominal. We do not understand.\n\nYour species has expertise in growing life where it should not grow. We have observed this. We ask for your [TRANSLATOR: eyes? perspective? outside thinking?].",
              options: [
                { label: "Tell me about the three-who-are-one.", goto: "symbiosis_detail" },
                { label: "What happened three days ago?", goto: "timeline" },
                { label: "Tell me about your ship.", goto: "ship_background" },
                { label: "What are these 'scrubbers' I found in the sensor data?", goto: "scrubbers_question", requires: { clueFound: "HUMAN_SCRUBBERS_ACTIVE" } },
                { label: "The network's signal-antennae are completely inert.", goto: "network_inert", requires: { clueFound: "NETWORK_DORMANT" } },
                { label: "Your records say the network shuts down if its signals are removed.", goto: "voc_revelation", requires: { clueFound: "VOC_SIGNALING" } },
                { label: "I think I know what's causing this.", goto: "premature_guess" },
                { label: "Could your ship's systems have degraded during the journey?", goto: "wrong_journey" },
                { label: "I'll look around first.", goto: "exit_neutral" }
              ]
            },
            symbiosis_detail: {
              text: "Ah! You wish to understand the [TRANSLATOR: family? organism-collective? living-unity?]. I am pleased.\n\nThe three-who-are-one is not one organism. It is three, grown together since before memory:\n\n\u2022 The canopy \u2014 crystalline fronds that drink your 'light' and produce [TRANSLATOR: sugars? energy-food?]\n\u2022 The roots \u2014 deep tendrils that process minerals and produce [TRANSLATOR: amino acids? body-building-compounds?]\n\u2022 The network \u2014 the web between them. It carries, it coordinates, it speaks.\n\nWithout the network, the canopy and roots are... [TRANSLATOR SEARCHING: deaf? disconnected? alone?]. They produce, but nothing is shared. Nothing is requested. They work without purpose.",
              revealsClue: "SYMBIOSIS_BROKEN",
              moodShift: 1,
              setsFlag: "zelketh_explained_symbiosis",
              options: [
                { label: "What does the network use to communicate?", goto: "network_communication" },
                { label: "On Earth, we have something similar \u2014 mycorrhizal networks.", goto: "earth_parallel", moodDelta: 2 },
                { label: "What happened three days ago?", goto: "timeline" },
                { label: "I'll examine the cultivar myself.", goto: "exit_neutral" }
              ]
            },
            network_communication: {
              text: "The network speaks through [TRANSLATOR: volatile harmonics? air-carried-words? scent-language?]. It releases compounds into the atmosphere \u2014 tiny molecules that carry instructions.\n\n'Send sugar here.' 'Need minerals there.' 'Time to grow.'\n\nWhen the network is healthy, the air is filled with its [TRANSLATOR: voice? song? conversation?]. But now... the air is silent. The network has stopped speaking. We do not know why it has chosen silence.",
              setsFlag: "zelketh_described_signals",
              options: [
                { label: "So these compounds float through the air?", goto: "airborne_signals" },
                { label: "What happened three days ago?", goto: "timeline" },
                { label: "I should check the atmospheric readings.", goto: "exit_neutral" }
              ]
            },
            airborne_signals: {
              text: "Yes! The [TRANSLATOR: voice-molecules? signal-compounds?] travel through the atmosphere. This is how the three-who-are-one have always communicated. The air carries their words.\n\n[Zel'keth shifts color \u2014 a ripple of amber curiosity]\n\nYour species communicates through air vibrations, yes? Sound? The three-who-are-one communicate through air chemistry. Different method, same principle. The air must be... [TRANSLATOR: clear? open? unfiltered?] ...for the conversation to happen.",
              moodShift: 1,
              options: [
                { label: "Unfiltered \u2014 that's an interesting word choice.", goto: "unfiltered_hint" },
                { label: "What happened three days ago?", goto: "timeline" },
                { label: "I need to check the atmosphere data.", goto: "exit_neutral" }
              ]
            },
            unfiltered_hint: {
              text: "[Zel'keth's colors pulse with slight confusion]\n\nIs it? I am unsure why the translator selected that word. The atmosphere aboard the Zhel'ora has always been [TRANSLATOR: clean? suitable? correct?] for the three-who-are-one.\n\nPerhaps... hmm. I had not considered whether the atmosphere has changed since docking. Our instruments show nominal readings for Zhel'ii biology. But your instruments might measure different things than ours, yes?",
              setsFlag: "zelketh_unfiltered_hint",
              options: [
                { label: "Different instruments measuring different things \u2014 exactly.", goto: "different_perspective" },
                { label: "What happened three days ago?", goto: "timeline" },
                { label: "I'll check your atmospheric data against ours.", goto: "exit_neutral" }
              ]
            },
            different_perspective: {
              text: "[Zel'keth's skin flushes teal \u2014 the color of revelation]\n\nAh. You are suggesting that something in the atmosphere has changed that our instruments do not detect, but yours might?\n\nThis is... [TRANSLATOR: humbling? educational?]. We assumed the fault was within our own systems. We did not think to examine the space between our systems and yours.\n\nPlease, Dr. Nova. Look where we cannot look.",
              moodShift: 1,
              options: [
                { label: "I'll check the sensor interface.", goto: "exit_neutral" },
                { label: "Tell me about your ship first.", goto: "ship_background" }
              ]
            },
            timeline: {
              text: "Three of your day-cycles. The Zhel'ora arrived at your Station Hayes and we performed [TRANSLATOR: docking-ritual? connection-protocol? joining-of-vessels?]. Your people were most welcoming.\n\nThe first day-cycle, all was well. The three-who-are-one flourished.\n\nThe second day-cycle, the network's activity decreased. We thought perhaps it was adjusting to the new environment.\n\nBy the third day-cycle, the network had gone fully dormant. The canopy dimmed. The roots slowed.\n\nWe have been unable to revive it.",
              setsFlag: "zelketh_described_timeline",
              options: [
                { label: "What exactly happens during docking?", goto: "docking_detail" },
                { label: "Tell me about the three-who-are-one.", goto: "symbiosis_detail" },
                { label: "I'll investigate the timing.", goto: "exit_neutral" }
              ]
            },
            docking_detail: {
              text: "Standard [TRANSLATOR: joining-protocol? ship-marriage?]. Your station extended a docking bridge. Atmospheric seals were established. The air between our vessels was... [TRANSLATOR: shared? exchanged? merged?].\n\nYour engineers activated various systems \u2014 I observed machines engaging along the connection. Life support adjustments, I believe? Your people were very thorough.\n\n[Zel'keth pauses, colors shifting to uncertain amber]\n\nI confess I did not pay close attention to the technical details of your docking systems. I was more interested in meeting your botanists.",
              setsFlag: "zelketh_described_docking",
              options: [
                { label: "Those machines \u2014 they were atmospheric scrubbers.", goto: "scrubbers_explain", requires: { clueFound: "HUMAN_SCRUBBERS_ACTIVE" } },
                { label: "Atmospheric exchange could be significant.", goto: "atmo_exchange_thought" },
                { label: "I'll check what systems activated during docking.", goto: "exit_neutral" }
              ]
            },
            scrubbers_explain: {
              text: "[Zel'keth's colors shift rapidly \u2014 alarm, then confusion, then understanding]\n\nAtmospheric scrubbers. Machines that clean your air. And they activated automatically when our vessels connected.\n\nThese machines \u2014 they remove compounds they do not recognize? Compounds that are not in their... [TRANSLATOR: approved list? safety database?]?\n\nThe network's signaling compounds would not be in a human safety database. Your scrubbers would classify them as...\n\n[Long pause. Colors drain to pale.]\n\n...contaminants?",
              moodShift: -1,
              setsFlag: "zelketh_scrubbers_explained",
              options: [
                { label: "Yes. Your network's signals are being filtered as contaminants.", goto: "scrubbers_reveal" },
                { label: "I need to confirm the details. Let me check the interface.", goto: "exit_neutral" }
              ]
            },
            atmo_exchange_thought: {
              text: "[Zel'keth tilts their head \u2014 a gesture that seems universal]\n\nYou think the atmosphere exchange is relevant? But our atmosphere readings are nominal. Everything that our organisms need is present.\n\nUnless... you are suggesting that something was present before docking that is no longer present? Something our instruments are not designed to detect?\n\n[Colors shift to intrigued cyan]\n\nYour species thinks in interesting directions, Dr. Nova.",
              moodShift: 1,
              options: [
                { label: "I need to compare atmospheric data from before and after docking.", goto: "exit_neutral" },
                { label: "Tell me about the three-who-are-one.", goto: "symbiosis_detail" }
              ]
            },
            ship_background: {
              text: "The Zhel'ora is a [TRANSLATOR: living-vessel? grown-ship? botanical-ark?]. It has carried the three-who-are-one across the space between stars for... [TRANSLATOR: calculating] ...many of your generations.\n\nThe ship itself is partially alive \u2014 the walls breathe, the corridors pulse. The three-who-are-one are not merely cargo. They are the heart of the vessel.\n\nWe are the Zhel'ii. We tend the three-who-are-one as your species tends... [TRANSLATOR SEARCHING: farms? gardens? children?]. They sustain us. We sustain them. This is the [TRANSLATOR: harmony? balance? mutual-life?].",
              moodShift: 1,
              setsFlag: "zelketh_ship_background",
              options: [
                { label: "A living ship \u2014 fascinating. How does the atmosphere work?", goto: "ship_atmosphere" },
                { label: "Why did you come to our system?", goto: "why_visit" },
                { label: "I'll start investigating the crop failure.", goto: "exit_neutral" }
              ]
            },
            ship_atmosphere: {
              text: "The Zhel'ora maintains its own atmosphere through the three-who-are-one themselves. The canopy produces breathable compounds, the roots filter waste, the network balances everything.\n\nIt is a [TRANSLATOR: closed loop? self-sustaining cycle? breathing circle?]. The air aboard our vessel has been stable for the entire journey. Nothing enters, nothing leaves.\n\n[Zel'keth pauses]\n\nNothing entered or left... until we docked. Now the atmosphere is shared with your station. Your engineers assured us this was standard procedure.",
              setsFlag: "zelketh_shared_atmosphere",
              options: [
                { label: "Standard procedure \u2014 but maybe not for your biology.", goto: "not_standard_for_them" },
                { label: "What happened three days ago?", goto: "timeline" },
                { label: "I'll check the atmospheric exchange systems.", goto: "exit_neutral" }
              ]
            },
            not_standard_for_them: {
              text: "[Zel'keth's colors darken with concern]\n\nYou are suggesting that what is standard for human vessels may not be standard for ours?\n\nWe accepted your docking protocols because we trusted your expertise. If something in those protocols is affecting the three-who-are-one...\n\n[TRANSLATOR: distress? worry? diplomatic-concern?]\n\n...please, Dr. Nova. Find the cause. We do not wish to assign blame. We wish to understand.",
              options: [
                { label: "I'll find the answer. No blame \u2014 just science.", goto: "exit_positive" },
                { label: "What are these scrubbers I found in the data?", goto: "scrubbers_question", requires: { clueFound: "HUMAN_SCRUBBERS_ACTIVE" } }
              ]
            },
            why_visit: {
              text: "We have traveled long to reach your system. The Zhel'ii are [TRANSLATOR: seekers? wanderers? knowledge-collectors?]. We observe species who cultivate life, and we learn.\n\nYour species impressed us. You grow food in the void of space, on barren rocks, under crushing radiation. You are stubborn about life in a way we [TRANSLATOR: admire? respect? find endearing?].\n\nWhen our own cultivation began failing, we thought: if any species understands hostile-environment-cultivation, it is the humans.\n\n[Zel'keth's colors warm to amber-gold]\n\nWe were not wrong to ask.",
              moodShift: 1,
              setsFlag: "zelketh_explained_visit",
              options: [
                { label: "We'll do our best. Tell me about the failure.", goto: "symbiosis_detail" },
                { label: "I'll start investigating.", goto: "exit_neutral" }
              ]
            },
            earth_parallel: {
              text: "[Zel'keth's entire form PULSES with vibrant teal \u2014 unmistakable excitement]\n\nYou have network organisms on your world?! The [TRANSLATOR: myco-rhizal? fungal-web? underground-speakers?]!\n\nWe have studied your botanical transmissions! The one your scientist Simard documented \u2014 trees sharing resources through fungal connections. 'Mother trees' supporting their offspring through the network!\n\n[TRANSLATOR: joy? kinship? validation?]\n\nThe three-who-are-one and your 'wood wide web' \u2014 they are [TRANSLATOR: cousins? echoes? parallel solutions to the same problem?]. Life finds the same answers, even between stars!",
              moodShift: 2,
              setsFlag: "zelketh_knows_earth_parallel",
              options: [
                { label: "Exactly \u2014 chemical communication networks. Universal biology.", goto: "universal_biology" },
                { label: "If your network works like ours, I might know what to look for.", goto: "exit_positive" },
                { label: "What happened three days ago?", goto: "timeline" }
              ]
            },
            universal_biology: {
              text: "Universal biology! Yes! [TRANSLATOR: perfect phrase? exactly this?]\n\nThe three-who-are-one communicate through volatile compounds in the air. Your mycorrhizal networks communicate through compounds in the soil. Air or soil \u2014 the principle is identical. Chemical words carrying instructions between organisms.\n\n[Zel'keth's colors settle to a warm, steady glow]\n\nDr. Nova, if you understand how Earth networks fail, you may understand how ours has failed. What silences a chemical conversation?\n\nSomething removing the words from the air, perhaps?",
              moodShift: 1,
              options: [
                { label: "Removing the words from the air \u2014 that's exactly what I need to check.", goto: "exit_positive" },
                { label: "What could remove those compounds?", goto: "what_removes" }
              ]
            },
            what_removes: {
              text: "[Zel'keth shifts to puzzled amber]\n\nOn our world? Very little. The compounds persist in the atmosphere naturally. The network has never needed to worry about its signals being... [TRANSLATOR: consumed? filtered? stolen?].\n\nBut we are not on our world. We are docked at your station. And your station has systems we do not fully understand.\n\n[Long pause. Colors cycle through uncertainty.]\n\nDr. Nova... is something aboard your station removing the network's signals?",
              options: [
                { label: "I think that's exactly what's happening. Let me confirm.", goto: "exit_positive" },
                { label: "I need to check the atmospheric processing systems.", goto: "exit_neutral" }
              ]
            },
            scrubbers_question: {
              text: "[Zel'keth's colors shift to confused gray-amber]\n\n'Scrubbers?' I am unfamiliar with this [TRANSLATOR: concept? device? word?].\n\nYour sensor interface mentioned atmospheric scrubbers that activated during docking. These are machines that... clean the air? Remove unwanted compounds?\n\n[Colors darken with dawning realization]\n\nDr. Nova. What compounds are these scrubbers removing? Do they... do they distinguish between 'unwanted' compounds and... [TRANSLATOR: necessary? vital? the-voice-of-the-network?]",
              moodShift: -1,
              portraitOverride: "portrait_alien_confused.png",
              setsFlag: "zelketh_heard_about_scrubbers",
              options: [
                { label: "They filter anything they don't recognize. Including biological signals.", goto: "scrubbers_reveal" },
                { label: "I need to confirm what exactly they're filtering.", goto: "exit_neutral" }
              ]
            },
            scrubbers_reveal: {
              text: "[Zel'keth's skin goes pale \u2014 almost translucent]\n\nThe scrubbers are removing the network's [TRANSLATOR: voice? words? songs?] from the air. They are treating the signals as... contaminants?\n\nThe network senses that its signals are not persisting in the atmosphere. So it believes the environment is hostile. It goes dormant to conserve energy. A safety response.\n\n[Colors slowly return, shifting through waves of understanding]\n\nYour technology was trying to help. Clean air. Safe conditions. But to the three-who-are-one, 'clean' air is... silent air. Dead air.\n\nYou did not know. How could you know?",
              moodShift: 1,
              setsFlag: "zelketh_understands_cause",
              options: [
                { label: "We didn't know. But now we can fix it.", goto: "ready_to_fix" },
                { label: "I'm sorry \u2014 this was our fault.", goto: "no_blame" }
              ]
            },
            ready_to_fix: {
              text: "[Zel'keth's colors surge with hope \u2014 bright teal and amber]\n\nFix it? You can restore the network's voice?\n\nIf the scrubbers stop removing the compounds... the network would sense its own signals in the air again. It would realize the environment is safe. It would... wake up?\n\n[TRANSLATOR: hope? desperate-optimism? please-say-yes?]\n\nDr. Nova, if you can do this \u2014 if you can tell the network it is not alone \u2014 the three-who-are-one will sing again.",
              options: [
                { label: "We disable the scrubbers for the docking section. The network wakes up.", goto: "exit_positive" }
              ]
            },
            no_blame: {
              text: "[Zel'keth's colors warm to deep, steady amber]\n\nFault? No, Dr. Nova. There is no fault in good intentions applied without full understanding. Your scrubbers were protecting your people. You could not know they were silencing ours.\n\nThis is why species must talk to each other. This is why we came seeking your [TRANSLATOR: eyes? perspective? outside thinking?].\n\nYou saw what we could not see. That is not fault. That is [TRANSLATOR: gift? service? exactly what we asked for?].",
              moodShift: 1,
              options: [
                { label: "Then let's fix it. We disable the scrubbers for the docking section.", goto: "exit_positive" }
              ]
            },
            network_inert: {
              text: "[Zel'keth's colors dim with worry]\n\nYou observed the signal-structures directly? The [TRANSLATOR: antennae? voice-organs? broadcast-tips?] on the network threads?\n\nWhen the network is healthy, those structures are constantly active \u2014 producing the compounds that coordinate the symbiosis. If they are completely inert, the network has entered full dormancy.\n\nThis is a survival response. The network only shuts down entirely when it determines that signal production is... [TRANSLATOR: pointless? wasted? unheard?]. When the signals are not persisting in the environment.\n\nBut why would the signals not persist? The atmosphere is\u2014\n\n[Zel'keth stops. Colors shift rapidly.]\n\n...is the atmosphere truly unchanged since docking?",
              moodShift: -1,
              setsFlag: "zelketh_questioned_atmosphere",
              options: [
                { label: "That's exactly the right question.", goto: "right_question" },
                { label: "I need to check the atmospheric processing logs.", goto: "exit_neutral" }
              ]
            },
            right_question: {
              text: "[Zel'keth's colors pulse with anxious energy]\n\nWe have been examining our own systems for three days. Atmosphere nominal. Light nominal. Everything nominal for Zhel'ii biology.\n\nBut we only measure what we know to measure. If something is being removed from the atmosphere that our instruments do not track...\n\n[TRANSLATOR: dread? realization? paradigm-shift?]\n\nDr. Nova, what are your docking systems doing to our air?",
              options: [
                { label: "Your air is fine for breathing. But the network's signals are being filtered out.", goto: "scrubbers_reveal", requires: { clueFound: "HUMAN_SCRUBBERS_ACTIVE" } },
                { label: "I need to check the interface array for details.", goto: "exit_neutral" }
              ]
            },
            voc_revelation: {
              text: "[Zel'keth goes very still. All color drains momentarily, then returns in a slow wave of understanding.]\n\nThe records say this? That if the [TRANSLATOR: voice-compounds? signal-molecules?] are removed from the air faster than the network produces them... the network enters dormancy?\n\nAnd your station has machines that remove unfamiliar compounds from the shared atmosphere...\n\n[Long silence. Colors cycle through shock, understanding, and something that might be relief.]\n\nDr. Nova. Your species has been accidentally silencing the three-who-are-one. Your clean-air machines are removing their words.\n\nYou did not know. We did not know. But now we both know.",
              moodShift: 1,
              setsFlag: "zelketh_full_understanding",
              options: [
                { label: "Now we fix it. Disable the scrubbers for the docking section.", goto: "exit_positive" },
                { label: "I'm sorry this happened.", goto: "no_blame" }
              ]
            },
            wrong_journey: {
              text: "[Zel'keth's colors shift to confused gray]\n\nDegraded? The Zhel'ora has sustained the three-who-are-one across vast distances for [TRANSLATOR: many generations]. Our systems are... [TRANSLATOR STRUGGLING: ancient? proven? older than your species?].\n\nThe failure began three days after docking, not three days into our journey. The timing suggests the cause is recent, not accumulated.\n\n[Colors return to neutral]\n\nI do not think the answer lies within our vessel, Dr. Nova. Perhaps look at what changed when our vessels joined?",
              moodShift: -1,
              portraitOverride: "portrait_alien_confused.png",
              options: [
                { label: "You're right \u2014 the timing points to the docking event.", goto: "timeline" },
                { label: "I'll investigate further.", goto: "exit_neutral" }
              ]
            },
            premature_guess: {
              text: "[Zel'keth's colors cycle with cautious interest]\n\nYou believe you already know? You have barely examined anything, Dr. Nova.\n\nI appreciate your [TRANSLATOR: eagerness? confidence? haste?], but the three-who-are-one deserve a thorough investigation. Their lives depend on accuracy, not speed.\n\nPerhaps examine the cultivar, the sensor readings, and our records before reaching conclusions?",
              moodShift: -1,
              options: [
                { label: "You're right. I'll investigate properly.", goto: "exit_neutral" },
                { label: "Tell me about the three-who-are-one first.", goto: "symbiosis_detail" }
              ]
            },
            exit_neutral: {
              text: "[Zel'keth's translator hums softly]\n\nI will be here when you wish to consult further, Dr. Nova. The Zhel'ora is open to you.",
              endsConversation: true,
              exitLabel: "Head back",
              options: []
            },
            exit_positive: {
              text: "[Zel'keth's colors warm to hopeful amber-teal]\n\nThank you, Dr. Nova. The three-who-are-one await your findings. I believe you will find the answer.\n\nWe chose well, asking for human eyes.",
              endsConversation: true,
              exitLabel: "Head back",
              moodShift: 1,
              options: []
            }
          }
        },

        // ── Interface Array (Alien Biomonitors) ───────────────────────
        sensors: {
          type: "terminal",
          speaker: "Zhel'ora Biological Status Array",
          personality: "stoic",
          startMood: 0,
          nodes: {
            start: {
              text: "\u2550\u2550\u2550 ZHEL'ORA BIO STATUS ARRAY \u2550\u2550\u2550\n\nSYSTEM: Alien biomonitor interface. Translation matrix active.\n\nAvailable queries:\n\u2022 Organism status\n\u2022 Atmospheric composition\n\u2022 Docking system logs\n\u2022 Historical data",
              options: [
                { label: "Query: Organism status", goto: "organism_status" },
                { label: "Query: Atmospheric composition", goto: "atmosphere" },
                { label: "Query: Docking system logs", goto: "docking_logs" },
                { label: "Query: What changed at docking?", goto: "docking_changes", requires: { nodeVisited: "crew.timeline" } },
                { label: "Query: What compounds are being filtered?", goto: "filtered_compounds", requires: { clueFound: "VOC_SIGNALING" } },
                { label: "Exit interface", goto: "exit_neutral" }
              ]
            },
            organism_status: {
              text: "\u2550\u2550\u2550 ORGANISM STATUS REPORT \u2550\u2550\u2550\n\nCanopy Organism: PHOTOSYNTHESIS ACTIVE\n  \u2514 Efficiency: 34% (nominal: 89%)\n  \u2514 Sugar output: REDUCED\n  \u2514 Bioluminescence: DIM\n\nRoot Organism: CHEMOSYNTHESIS ACTIVE\n  \u2514 Efficiency: 41% (nominal: 92%)\n  \u2514 Amino acid output: REDUCED\n  \u2514 Motility: SLUGGISH\n\nNetwork Organism: \u2588\u2588 DORMANT \u2588\u2588\n  \u2514 Signal activity: NONE\n  \u2514 Nutrient transfer: SUSPENDED\n  \u2514 Last detected signal: 72.4 hours ago\n\n\u26a0 WARNING: Symbiosis coordination offline.",
              setsFlag: "saw_organism_status",
              options: [
                { label: "Query: Atmospheric composition", goto: "atmosphere" },
                { label: "Query: Docking system logs", goto: "docking_logs" },
                { label: "72.4 hours \u2014 that's almost exactly when docking occurred.", goto: "timing_match" },
                { label: "Exit interface", goto: "exit_neutral" }
              ]
            },
            timing_match: {
              text: "\u2550\u2550\u2550 CORRELATION ANALYSIS \u2550\u2550\u2550\n\nDocking event timestamp: 72.1 hours ago\nLast network signal:     72.4 hours ago\nVariance: 0.3 hours\n\n\u26a0 CORRELATION: Network dormancy onset aligns with docking event to within measurement error.\n\nNote: Correlation does not confirm causation. However, no other significant system changes occurred within this timeframe.",
              setsFlag: "timing_correlation_found",
              options: [
                { label: "Query: What systems activated during docking?", goto: "docking_logs" },
                { label: "Query: Atmospheric composition", goto: "atmosphere" },
                { label: "Exit interface", goto: "exit_neutral" }
              ]
            },
            atmosphere: {
              text: "\u2550\u2550\u2550 ATMOSPHERIC COMPOSITION \u2550\u2550\u2550\n\nZhel'ii Primary Components: NOMINAL\n  \u2514 Breathable mix: \u2713\n  \u2514 Temperature: \u2713\n  \u2514 Humidity: \u2713\n  \u2514 Pressure: \u2713\n\nExternal Exchange: ACTIVE (Human docking port)\nAtmospheric Processing: HUMAN-SIDE FILTRATION ENGAGED\n\nNote: Human atmospheric scrubbers removing compounds flagged as contaminants. Compound list not available \u2014 human system database.\n\nTrace VOC Profile: SIGNIFICANTLY REDUCED since docking\nPre-docking VOC count: 847 distinct compounds\nCurrent VOC count: 12 distinct compounds",
              revealsClue: "HUMAN_SCRUBBERS_ACTIVE",
              options: [
                { label: "847 compounds reduced to 12 \u2014 the scrubbers are filtering almost everything!", goto: "voc_reduction" },
                { label: "Query: Organism status", goto: "organism_status" },
                { label: "Query: Docking system logs", goto: "docking_logs" },
                { label: "Exit interface", goto: "exit_neutral" }
              ]
            },
            voc_reduction: {
              text: "\u2550\u2550\u2550 VOC PROFILE ANALYSIS \u2550\u2550\u2550\n\nPre-docking: 847 volatile organic compounds detected\n  \u2514 Network signaling compounds: ~340 (40%)\n  \u2514 Metabolic byproducts: ~290 (34%)\n  \u2514 Environmental markers: ~217 (26%)\n\nPost-docking: 12 volatile organic compounds detected\n  \u2514 Network signaling compounds: 0 (0%)\n  \u2514 Metabolic byproducts: 8 (67%)\n  \u2514 Environmental markers: 4 (33%)\n\n\u2588\u2588 ALL NETWORK SIGNALING COMPOUNDS ABSENT \u2588\u2588\n\nHuman-side scrubbers are filtering compounds not recognized in their safety database. Alien biological signals are classified as 'unknown organic contaminants.'",
              setsFlag: "saw_voc_reduction",
              options: [
                { label: "The scrubbers are treating the network's signals as contaminants.", goto: "scrubbers_confirmation" },
                { label: "Query: Organism status", goto: "organism_status" },
                { label: "Exit interface", goto: "exit_neutral" }
              ]
            },
            scrubbers_confirmation: {
              text: "\u2550\u2550\u2550 ASSESSMENT \u2550\u2550\u2550\n\nAFFIRMATIVE. Human atmospheric scrubbers are removing 100% of network signaling compounds.\n\nThe scrubbers' safety database does not contain Zhel'ii biological signatures. All unrecognized organic volatiles are classified as contaminants and filtered.\n\nResult: Network organism cannot detect its own signals in the ambient atmosphere. Standard dormancy-safety response engaged.\n\nRecommendation: Disable or reprogram human-side scrubbers for docking section.",
              options: [
                { label: "Query: Docking system logs", goto: "docking_logs" },
                { label: "Exit interface", goto: "exit_neutral" }
              ]
            },
            docking_logs: {
              text: "\u2550\u2550\u2550 DOCKING EVENT LOG \u2550\u2550\u2550\n\nTimestamp: 72.1 hours ago\n\nSequence:\n 1. Docking bridge extended (human-side)\n 2. Atmospheric seals established\n 3. Pressure equalization \u2014 COMPLETE\n 4. Atmospheric exchange \u2014 INITIATED\n 5. Human life support adjustments \u2014 ENGAGED\n    \u2514 Air scrubbers: ACTIVATED\n    \u2514 Filtration mode: STANDARD CONTAMINANT REMOVAL\n    \u2514 Filter database: HUMAN-STANDARD\n 6. Zhel'ora systems: NO CHANGES\n\n\u26a0 Note: Human scrubber activation was automatic. No manual override or alien-biology exception was configured.",
              setsFlag: "saw_docking_logs",
              options: [
                { label: "Query: Atmospheric composition", goto: "atmosphere" },
                { label: "Query: Organism status", goto: "organism_status" },
                { label: "Exit interface", goto: "exit_neutral" }
              ]
            },
            docking_changes: {
              text: "\u2550\u2550\u2550 DOCKING DELTA ANALYSIS \u2550\u2550\u2550\n\nChanges at docking event:\n\nBEFORE DOCKING:\n  \u2022 Closed atmosphere\n  \u2022 No external filtration\n  \u2022 847 VOC compounds\n  \u2022 Network: ACTIVE\n  \u2022 Canopy: 89% efficiency\n  \u2022 Roots: 92% efficiency\n\nAFTER DOCKING:\n  \u2022 Shared atmosphere\n  \u2022 Human scrubbers ACTIVE\n  \u2022 12 VOC compounds\n  \u2022 Network: DORMANT\n  \u2022 Canopy: 34% efficiency\n  \u2022 Roots: 41% efficiency\n\nSingle largest environmental change: Activation of human-side atmospheric scrubbers.",
              options: [
                { label: "Query: Atmospheric composition", goto: "atmosphere" },
                { label: "Query: What compounds are being filtered?", goto: "filtered_compounds", requires: { clueFound: "VOC_SIGNALING" } },
                { label: "Exit interface", goto: "exit_neutral" }
              ]
            },
            filtered_compounds: {
              text: "\u2550\u2550\u2550 FILTERED COMPOUND ANALYSIS \u2550\u2550\u2550\n\nCross-referencing Zhel'ii botanical archives with human scrubber activity...\n\nThe following CRITICAL compounds are being removed:\n\n \u2022 NUTRIENT-REQUEST signals (roots \u2192 canopy)\n \u2022 NUTRIENT-DELIVERY signals (canopy \u2192 roots)\n \u2022 GROWTH-SYNC signals (network \u2192 both)\n \u2022 THREAT-RESPONSE signals (any \u2192 all)\n \u2022 GERMINATION-CASCADE compound\n\nAll classified by human systems as:\n'UNKNOWN ORGANIC CONTAMINANT \u2014 REMOVE'\n\n\u2588\u2588 THE ENTIRE COMMUNICATION SYSTEM IS BEING FILTERED AS WASTE \u2588\u2588",
              options: [
                { label: "Query: Organism status", goto: "organism_status" },
                { label: "Exit interface", goto: "exit_neutral" }
              ]
            },
            exit_neutral: {
              text: "\u2550\u2550\u2550 SESSION SUSPENDED \u2550\u2550\u2550\n\nInterface available for further queries.",
              endsConversation: true,
              exitLabel: "Disconnect",
              options: []
            }
          }
        },

        // ── Inspect Cultivar (Alien Plants) ───────────────────────────
        plants: {
          type: "conversation",
          speaker: "Zhel'ora Cultivar Bay",
          personality: "stoic",
          startMood: 0,
          nodes: {
            start: {
              text: "You approach the symbiont growth chamber. The cultivar fills the room \u2014 unlike anything in Earth botany.\n\nCrystalline fronds emerge from a substrate that pulses with faint bioluminescence. Below the surface, root tendrils move sluggishly, cycling through motions without purpose.\n\nGossamer threads connect everything \u2014 the network organism. They're gray and still.\n\nWhat would you like to examine more closely?",
              options: [
                { label: "Examine the canopy organism (crystalline fronds)", goto: "canopy" },
                { label: "Examine the root organism", goto: "roots" },
                { label: "Examine the network threads", goto: "network" },
                { label: "Touch the cultivar", goto: "touch_it" },
                { label: "Look for the signal-producing structures", goto: "signal_structures", requires: { nodeVisited: "crew.network_communication" } },
                { label: "Smell the air near the cultivar", goto: "smell_air" },
                { label: "Step back", goto: "exit_neutral" }
              ]
            },
            canopy: {
              text: "The canopy organism's fronds are crystalline \u2014 more mineral than organic, at least by Earth standards. Each frond is translucent, with internal structures that refract light into soft rainbows.\n\nRight now they're pale. Their usual glow is dimmed to a faint shimmer. They're still photosynthesizing \u2014 you can see the faint light-capture reactions \u2014 but at a fraction of normal capacity.\n\nThe fronds are producing sugars, but with no network to distribute them, the sugars are accumulating at the frond tips. Tiny crystal droplets \u2014 wasted production.",
              setsFlag: "examined_canopy",
              options: [
                { label: "Examine the root organism", goto: "roots" },
                { label: "Examine the network threads", goto: "network" },
                { label: "The canopy is producing but nothing is being distributed.", goto: "distribution_problem" },
                { label: "Step back", goto: "exit_neutral" }
              ]
            },
            roots: {
              text: "The root tendrils are visible through the translucent substrate \u2014 long, sinuous forms that pulse with faint pink-magenta bioluminescence. They're alive and active, but their movements are purposeless. Cycling through motions like a machine running idle.\n\nNormally the roots produce amino acids on demand from the network. Without coordination, they're producing compounds at random intervals \u2014 some needed, most not.\n\nIt's like watching workers on an assembly line with no foreman and no instructions. Everyone's busy. Nothing useful is happening.",
              setsFlag: "examined_roots",
              options: [
                { label: "Examine the canopy organism", goto: "canopy" },
                { label: "Examine the network threads", goto: "network" },
                { label: "Both producers are working but uncoordinated.", goto: "distribution_problem" },
                { label: "Step back", goto: "exit_neutral" }
              ]
            },
            network: {
              text: "The network organism \u2014 the coordinator. Gossamer threads spread between canopy and roots like a mycelium web, but above-ground and visible.\n\nThe threads are gray and still. On a healthy network, you'd see bioluminescent pulses traveling along the connections \u2014 signals being carried, instructions being delivered. Now there's nothing. Complete silence.\n\nYou notice tiny structures along the threads, almost like antennae or broadcast tips. Hundreds of them, evenly spaced. Every single one is inert.\n\nThese must be the signal-producing structures \u2014 the organs that release volatile compounds into the air.",
              revealsClue: "NETWORK_DORMANT",
              options: [
                { label: "The antennae are all shut down \u2014 the network isn't even trying to signal.", goto: "antennae_detail" },
                { label: "Examine the canopy organism", goto: "canopy" },
                { label: "Examine the root organism", goto: "roots" },
                { label: "Smell the air near the network", goto: "smell_air" },
                { label: "Step back", goto: "exit_neutral" }
              ]
            },
            antennae_detail: {
              text: "You examine the broadcast structures under magnification. Each one is a tiny organic nozzle \u2014 designed to release specific compounds into the air. The mechanism is elegant: different nozzle shapes produce different signal molecules.\n\nBut they're all sealed shut. Not damaged \u2014 deliberately closed. This is a controlled shutdown, not a failure.\n\nThe network chose to stop signaling. Why would an organism voluntarily go silent?\n\nIn Earth biology, you've seen this pattern: organisms conserve resources when they detect that their signals aren't being received. If the network's compounds aren't persisting in the atmosphere, it would assume the environment is hostile and enter dormancy.",
              setsFlag: "network_deliberately_silent",
              options: [
                { label: "Something is removing the signals from the air.", goto: "removal_insight" },
                { label: "Examine the canopy organism", goto: "canopy" },
                { label: "Examine the root organism", goto: "roots" },
                { label: "Step back", goto: "exit_neutral" }
              ]
            },
            removal_insight: {
              text: "If the network's signals are being removed from the atmosphere as fast as \u2014 or faster than \u2014 they're produced, the network would detect that its compounds aren't accumulating. Its feedback loop is broken.\n\nProduce signal \u2192 check for signal in air \u2192 signal absent \u2192 conclude: environment hostile \u2192 enter dormancy.\n\nSomething in this environment is scrubbing the air clean of the network's communication compounds. But what? The Zhel'ora's own atmosphere should be stable...\n\n...unless the atmosphere is no longer just the Zhel'ora's. Since docking, it's shared with the human station.",
              setsFlag: "plant_deduced_scrubbing",
              options: [
                { label: "I need to check the atmospheric processing systems.", goto: "exit_neutral" },
                { label: "Smell the air near the cultivar", goto: "smell_air" }
              ]
            },
            distribution_problem: {
              text: "Exactly. The canopy and roots are both functional \u2014 they haven't failed. They've been orphaned. Each one is working independently, producing output that nobody collects and following no instructions.\n\nThe network is the coordinator. Without it, the symbiosis is just three organisms standing next to each other. Alive, but not connected. Not a system.\n\nThe question isn't 'why are the organisms failing?' The question is 'why did the network shut down?'",
              options: [
                { label: "Examine the network threads", goto: "network" },
                { label: "I need to find out what silenced the network.", goto: "exit_neutral" }
              ]
            },
            signal_structures: {
              text: "Now that you know what to look for, the signal-producing structures are obvious. Hundreds of tiny nozzle-like organs arranged along every network thread \u2014 the 'antennae' that release volatile compounds into the air.\n\nEvery single one is sealed shut. The network has deliberately stopped broadcasting.\n\nOn Earth, mycorrhizal fungi reduce activity when soil conditions are unfavorable. Same principle: don't waste energy signaling into an environment that isn't carrying your signals.\n\nThe network thinks its signals aren't being heard. And it's right \u2014 something is removing them from the air before they can reach their targets.",
              revealsClue: "NETWORK_DORMANT",
              options: [
                { label: "I need to find what's removing the signals.", goto: "exit_neutral" },
                { label: "Smell the air", goto: "smell_air" }
              ]
            },
            smell_air: {
              text: "You lean close to the cultivar and inhale carefully.\n\nNothing. The air smells... clean. Sterile, even. Like a hospital corridor.\n\nThat's wrong. A living ecosystem this dense should have a scent signature \u2014 metabolic byproducts, volatile compounds, the chemical conversation of living things. Earth greenhouses smell green, earthy, alive.\n\nThis room should smell of alien biology. Instead, it smells of nothing.\n\nThe air is being scrubbed clean.",
              setsFlag: "noticed_sterile_air",
              options: [
                { label: "Examine the network threads", goto: "network" },
                { label: "Something is filtering the air. I need to check the sensors.", goto: "exit_neutral" }
              ]
            },
            touch_it: {
              text: "You reach out and gently touch one of the crystalline fronds.\n\nIt's warm \u2014 body temperature, almost. The surface is smooth but with a faint texture, like touching glass that's been lightly frosted. Under your fingertip, you feel a faint vibration \u2014 the frond is still alive, still metabolizing, still hoping for instructions that aren't coming.\n\nBehind you, Zel'keth's translator crackles:\n\n\"Ah! You employ tactile investigation! Fascinating. On my world, touching the cultivar without harmonic calibration would result in [TRANSLATOR ERROR: concept untranslatable \u2014 possible meanings: 'mild electric shock', 'social embarrassment', 'crop offense']. Please continue. I am documenting.\"",
              moodShift: 1,
              setsFlag: "touched_cultivar",
              options: [
                { label: "Examine the network threads", goto: "network" },
                { label: "Examine the canopy organism", goto: "canopy" },
                { label: "Examine the root organism", goto: "roots" },
                { label: "Step back", goto: "exit_neutral" }
              ]
            },
            exit_neutral: {
              text: "You step back from the cultivar bay. The three-who-are-one sit in silence \u2014 alive but disconnected, waiting for a voice that can't reach them.",
              endsConversation: true,
              exitLabel: "Step back",
              options: []
            }
          }
        },

        // ── Parse Records (Alien Botanical Archive) ───────────────────
        logs: {
          type: "archive",
          speaker: "Zhel'ii Botanical Archive",
          personality: "stoic",
          startMood: 0,
          nodes: {
            start: {
              text: "[TRANSLATION MATRIX ACTIVE]\n[ACCESSING: Zhel'ii Botanical Archive \u2014 Hayes Station Relay]\n\n\u2550\u2550\u2550 ARCHIVE CATEGORIES \u2550\u2550\u2550\n\n\u2022 The Three-Who-Are-One: Biology\n\u2022 Network Organism: Communication\n\u2022 Cultivation History\n\u2022 Earth Parallels (Cross-Referenced)\n\u2022 Docking Protocols",
              options: [
                { label: "Search: The Three-Who-Are-One biology", goto: "biology" },
                { label: "Search: Network communication", goto: "network_comm" },
                { label: "Search: Cultivation history", goto: "history" },
                { label: "Search: Earth parallels", goto: "earth_parallels" },
                { label: "Search: Docking protocols", goto: "docking_protocols" },
                { label: "Search: Atmospheric sensitivity", goto: "atmo_sensitivity", requires: { clueFound: "HUMAN_SCRUBBERS_ACTIVE" } },
                { label: "Search: Network dormancy", goto: "network_dormancy", requires: { clueFound: "NETWORK_DORMANT" } },
                { label: "Close archive", goto: "exit_neutral" }
              ]
            },
            biology: {
              text: "[TRANSLATION MATRIX ACTIVE]\n\n\u2550\u2550\u2550 THE THREE-WHO-ARE-ONE: OVERVIEW \u2550\u2550\u2550\n\nA three-organism obligate symbiosis evolved on the Zhel'ii homeworld.\n\nOrganism 1 \u2014 CANOPY (Photosynthesizer)\n  \u2514 Crystalline fronds capture light energy\n  \u2514 Produces sugars and energy compounds\n  \u2514 Efficiency depends on network coordination\n\nOrganism 2 \u2014 ROOT (Chemosynthesizer)\n  \u2514 Deep tendrils process minerals\n  \u2514 Produces amino acids and structural compounds\n  \u2514 Efficiency depends on network coordination\n\nOrganism 3 \u2014 NETWORK (Coordinator)\n  \u2514 Mycelium-like web connecting canopy and roots\n  \u2514 Coordinates nutrient exchange via chemical signals\n  \u2514 Regulates growth timing and resource allocation\n\nNote: No single organism can survive indefinitely without the others. The symbiosis is obligate \u2014 separation is fatal within [TRANSLATOR: 30-40 day-cycles].",
              setsFlag: "read_biology",
              options: [
                { label: "Search: Network communication", goto: "network_comm" },
                { label: "Search: Earth parallels", goto: "earth_parallels" },
                { label: "Close archive", goto: "exit_neutral" }
              ]
            },
            network_comm: {
              text: "[TRANSLATION MATRIX ACTIVE]\n\n\u2550\u2550\u2550 THE THREE-WHO-ARE-ONE: COORDINATION BIOLOGY \u2550\u2550\u2550\n\nThe network organism coordinates the symbiosis through volatile harmonic compounds \u2014 gaseous molecules that carry information between organisms.\n\nSignal types include:\n \u2022 NUTRIENT REQUEST (roots \u2192 canopy)\n \u2022 NUTRIENT DELIVERY (canopy \u2192 roots)\n \u2022 GROWTH SYNCHRONIZATION (network \u2192 both)\n \u2022 THREAT RESPONSE (any \u2192 all)\n\nThe network is sensitive to atmospheric composition. It ceases signal production when harmonic compounds are not detected in the ambient environment \u2014 a safety measure to prevent wasted energy.\n\n\u2588\u2588 If compounds are removed faster than they are \u2588\u2588\n\u2588\u2588 produced, the network enters dormancy.         \u2588\u2588\n\nDormancy is reversible. If compounds are allowed to accumulate in the atmosphere again, the network will detect its own signals and resume activity within [TRANSLATOR: 1-2 day-cycles].",
              revealsClue: "VOC_SIGNALING",
              options: [
                { label: "Search: The Three-Who-Are-One biology", goto: "biology" },
                { label: "Search: Network dormancy triggers", goto: "network_dormancy" },
                { label: "Search: Earth parallels", goto: "earth_parallels" },
                { label: "Close archive", goto: "exit_neutral" }
              ]
            },
            history: {
              text: "[TRANSLATION MATRIX ACTIVE]\n\n\u2550\u2550\u2550 CULTIVATION HISTORY \u2550\u2550\u2550\n\nThe three-who-are-one have been cultivated by the Zhel'ii for [TRANSLATOR: untranslatable timespan \u2014 estimate: thousands of generations].\n\nThe symbiosis has never failed during interstellar transit. The Zhel'ora's closed atmospheric system has always maintained the conditions necessary for the network's signaling.\n\nPrior cultivation failures in Zhel'ii records:\n \u2022 Atmospheric contamination events: 3\n \u2022 Resolution: Restore atmospheric purity\n \u2022 Time to recovery after restoration: 1-2 cycles\n\nNote: All prior failures involved introduction of foreign atmospheric compounds that interfered with network signaling. No failure has ever occurred due to signal compound REMOVAL \u2014 this scenario is unprecedented in Zhel'ii records.",
              setsFlag: "read_history",
              options: [
                { label: "Search: Network communication", goto: "network_comm" },
                { label: "Search: Docking protocols", goto: "docking_protocols" },
                { label: "Close archive", goto: "exit_neutral" }
              ]
            },
            earth_parallels: {
              text: "[TRANSLATOR NOTE: Human botanical records contain relevant parallels]\n\n\u2550\u2550\u2550 EARTH PARALLEL: MYCORRHIZAL NETWORKS \u2550\u2550\u2550\n\nEarth forests utilize similar chemical communication networks. Human scientist Suzanne Simard documented 'mycorrhizal networks' connecting trees underground. These networks:\n\n \u2022 Transfer nutrients between organisms\n \u2022 Carry chemical warning signals\n \u2022 Allow 'mother trees' to support offspring\n\nHumans call this phenomenon the 'wood wide web.'\n\nThe three-who-are-one operate on similar principles, but above-ground via atmospheric volatiles rather than underground via fungal threads.\n\n\u2550\u2550\u2550 KEY DIFFERENCE \u2550\u2550\u2550\n\nEarth mycorrhizal signals travel through soil (protected). Zhel'ii network signals travel through atmosphere (exposed). Atmospheric signals are vulnerable to any process that alters air composition.\n\n[TRANSLATOR: This vulnerability had no practical consequence until the atmosphere was shared with another species' technology.]",
              setsFlag: "read_earth_parallels",
              options: [
                { label: "Search: Network communication", goto: "network_comm" },
                { label: "Search: The Three-Who-Are-One biology", goto: "biology" },
                { label: "Close archive", goto: "exit_neutral" }
              ]
            },
            docking_protocols: {
              text: "[TRANSLATION MATRIX ACTIVE]\n\n\u2550\u2550\u2550 DOCKING PROTOCOL RECORD \u2550\u2550\u2550\n\nDocking with Human Station Hayes followed human-standard protocols.\n\nZhel'ii assessment:\n \u2022 Structural connection: Satisfactory\n \u2022 Atmospheric seal: Satisfactory\n \u2022 Atmospheric exchange: INITIATED BY HUMAN SYSTEMS\n\nNote from Zhel'ii engineering:\n'The human vessel activated atmospheric processing equipment during docking. We were informed this was standard procedure for all docking events. We did not request modifications to this procedure.'\n\n'Our atmospheric monitoring shows all readings nominal for Zhel'ii biology. However, our instruments are calibrated for primary atmospheric components. We do not routinely monitor trace volatile organic compounds as a separate category.'\n\n\u26a0 'Trace VOC monitoring was not performed. Any changes to trace compound levels would not have been detected by Zhel'ii instruments.'",
              setsFlag: "read_docking_protocols",
              options: [
                { label: "Search: Atmospheric sensitivity", goto: "atmo_sensitivity", requires: { clueFound: "HUMAN_SCRUBBERS_ACTIVE" } },
                { label: "Search: Network communication", goto: "network_comm" },
                { label: "Close archive", goto: "exit_neutral" }
              ]
            },
            atmo_sensitivity: {
              text: "[TRANSLATION MATRIX ACTIVE]\n\n\u2550\u2550\u2550 ATMOSPHERIC SENSITIVITY: NETWORK ORGANISM \u2550\u2550\u2550\n\nThe network organism monitors its own signal persistence as a feedback mechanism.\n\nProcess:\n 1. Network produces signal compound\n 2. Compound diffuses through atmosphere\n 3. Network detects compound at receiving nodes\n 4. IF compound detected \u2192 environment safe \u2192 continue signaling\n 5. IF compound NOT detected \u2192 environment hostile \u2192 enter dormancy\n\nDormancy trigger threshold:\nIf signal compounds are removed from the atmosphere within [TRANSLATOR: minutes? short-time-units?] of production, the network interprets this as a hostile environment and ceases all signaling to conserve resources.\n\nThis is a survival adaptation: do not waste energy broadcasting signals that cannot be received.\n\n\u2588\u2588 An external filtration system removing compounds \u2588\u2588\n\u2588\u2588 would trigger this response immediately.          \u2588\u2588",
              setsFlag: "read_atmo_sensitivity",
              options: [
                { label: "Search: Network dormancy", goto: "network_dormancy" },
                { label: "Search: Earth parallels", goto: "earth_parallels" },
                { label: "Close archive", goto: "exit_neutral" }
              ]
            },
            network_dormancy: {
              text: "[TRANSLATION MATRIX ACTIVE]\n\n\u2550\u2550\u2550 NETWORK DORMANCY: CAUSES & REVERSAL \u2550\u2550\u2550\n\nCauses of Network Dormancy:\n \u2022 Atmospheric contamination (foreign compounds interfere with signals)\n \u2022 Signal compound removal (compounds removed faster than produced)\n \u2022 Extreme temperature deviation\n \u2022 Physical damage to >60% of network mass\n\nReversal:\n \u2022 Remove the triggering condition\n \u2022 Allow signal compounds to accumulate in atmosphere\n \u2022 Network detects signals within 1-2 cycles\n \u2022 Full recovery within 3-5 cycles\n\n\u2550\u2550\u2550 CRITICAL NOTE \u2550\u2550\u2550\n\nThe network does not require external stimulation to restart. It continuously attempts micro-broadcasts during dormancy. If even one micro-broadcast persists in the atmosphere long enough to be detected at the receiving end, the network will interpret this as 'environment safe' and begin resuming activity.\n\nThe solution to dormancy is always environmental, never medical.",
              setsFlag: "read_dormancy_reversal",
              options: [
                { label: "Search: Atmospheric sensitivity", goto: "atmo_sensitivity", requires: { clueFound: "HUMAN_SCRUBBERS_ACTIVE" } },
                { label: "Search: Network communication", goto: "network_comm" },
                { label: "Close archive", goto: "exit_neutral" }
              ]
            },
            exit_neutral: {
              text: "[ARCHIVE SESSION CLOSED]\n[TRANSLATION MATRIX STANDBY]",
              endsConversation: true,
              exitLabel: "Close archive",
              options: []
            }
          }
        }
      },

      clues: [
        {
          action: "crew",
          label: "Consult Liaison",
          icon: "\ud83d\udc7d",
          speaker: "Zel'keth",
          sprites: {
            alienPortrait: "portrait_alien_neutral.png",
            alienIcon:     "portrait_alien.png"
          },
          text: "The three-who-are-one have entered cessation-of-function. The canopy produces, the roots produce, but the network does not carry. The harmony is broken. This began approximately three day-cycles after docking with the human station.",
          clueTag: "SYMBIOSIS_BROKEN",
          learned: "The three-organism symbiosis has lost coordination. Network organism is dormant. Started three days after docking."
        },
        {
          action: "sensors",
          label: "Interface Array",
          icon: "\ud83d\udd2e",
          speaker: "Zhel'ora Biological Status Array",
          sprites: {
            portrait:   "portrait_alien_sensors.png",
            actionIcon: "icon_alien_sensors.png"
          },
          text: "Atmospheric composition nominal for Zhel'ii biology. External Exchange: ACTIVE (Human docking port). Atmospheric Processing: HUMAN-SIDE FILTRATION ENGAGED. Human atmospheric scrubbers removing compounds flagged as contaminants. Trace VOC count dropped from 847 to 12 since docking.",
          clueTag: "HUMAN_SCRUBBERS_ACTIVE",
          learned: "Human-side scrubbers are actively filtering the shared atmosphere \u2014 nearly all volatile compounds removed."
        },
        {
          action: "plants",
          label: "Inspect Cultivar",
          icon: "\ud83c\udf3f",
          speaker: "Zhel'ora Cultivar Bay",
          sprites: {
            portrait:   "portrait_alien_plants.png",
            actionIcon: "icon_alien_plants.png"
          },
          text: "The network threads are gray and still. Tiny signal-producing structures (antennae) along the threads are all sealed shut \u2014 deliberately closed. This is a controlled dormancy shutdown, not damage. The network chose to stop signaling when its compounds weren't persisting in the atmosphere.",
          clueTag: "NETWORK_DORMANT",
          learned: "The network organism has deliberately shut down signal production \u2014 a dormancy response to signals not persisting in the air."
        },
        {
          action: "logs",
          label: "Parse Records",
          icon: "\ud83d\udc8e",
          speaker: "Zhel'ii Botanical Archive",
          sprites: {
            portrait:   "portrait_alien_logs.png",
            actionIcon: "icon_alien_logs.png"
          },
          text: "The network communicates via volatile compounds in the atmosphere. If those compounds are removed faster than produced, the network enters dormancy as a safety measure. Dormancy is reversible \u2014 allow compounds to accumulate and the network will resume within 1-2 cycles.",
          clueTag: "VOC_SIGNALING",
          learned: "The network communicates via atmospheric volatile compounds. Removing them triggers dormancy. The solution is environmental."
        }
      ],

      diagnoses: [
        {
          id: "scrubbers",
          label: "Human atmospheric scrubbers are filtering out the network's signaling compounds, causing dormancy.",
          isCorrect: true
        },
        {
          id: "physical_damage",
          label: "The docking maneuver physically damaged the network organism.",
          isCorrect: false,
          hint: "The cultivar shows no physical damage. The network threads are intact \u2014 they've deliberately shut down, not been injured."
        },
        {
          id: "atmosphere_drift",
          label: "The alien atmosphere has drifted during the long interstellar journey.",
          isCorrect: false,
          hint: "The biomonitors show atmosphere is nominal for Zhel'ii biology. The issue started specifically after docking, not during transit."
        },
        {
          id: "incompatible",
          label: "The symbiont organisms have become incompatible with each other after prolonged isolation.",
          isCorrect: false,
          hint: "The organisms worked fine until docking \u2014 the three-who-are-one haven't changed. Their environment has."
        }
      ],

      rankUpText: "You saw what they couldn't see \u2014 that our own technology was the problem. The first rule of xenobotany: never assume your 'clean' is their 'healthy.'",

      resolution: {
        sceneTransition: true,
        text: "[ATMOSPHERIC SCRUBBERS DISABLED FOR DOCKING SECTION]\n\nYou watch as the network organism stirs. The gray threads flush with color \u2014 soft bioluminescent pulses traveling along the mycelium-like connections. Within minutes, the canopy fronds brighten. The root tendrils move with purpose.\n\nThe three-who-are-one are speaking again.",
        zelkethGratitude: "Dr. Nova. You have restored the harmony. The three-who-are-one will continue. We will not perish in the dark between stars.\n\nYour species sees in ways we do not. You found what we could not find because it was... [TRANSLATOR STRUGGLING: invisible? assumed? part of the background?]. It was your technology. We did not think to look there.\n\nWe wish to offer a gift. A genesis pod \u2014 a seed-beginning of the three-who-are-one. If you can make it flourish in your care, it would be... [TRANSLATOR APPROXIMATION: a great honor? proof of connection? diplomatic milestone?]\n\nWe give this freely. But know that genesis pods are... delicate. They require specific conditions to awaken. We believe you will discover them.",
        acceptPod: "SAA PRIORITY UPDATE:\n\nThe genesis pod has been transferred to the new SAA Xenobiology Lab aboard Hayes Station. This is humanity's first alien biological sample intended for cultivation.\n\nDr. Nova, make it grow."
      },

      explanation: {
        title: "The Wood Wide Web of Space",
        body: "On Earth, forests are connected by vast underground networks of mycorrhizal fungi \u2014 sometimes called the 'wood wide web.' These networks carry nutrients between trees, send chemical warnings about pest attacks, and even let mature 'mother trees' support struggling seedlings. The forest isn't a collection of individuals; it's a superorganism connected by fungal threads and chemical signals.\n\nThe Zhel'ii cultivar works the same way, but more intimately. Three organisms that evolved together now function as one, coordinated by volatile chemical signals \u2014 molecules that drift through the air carrying instructions: 'Send sugar here.' 'Need minerals there.' 'Time to grow.'\n\nWhen the human station's atmospheric scrubbers went to work, they did exactly what they're designed to do: remove unfamiliar compounds from the air. Unfortunately, those 'contaminants' were the cultivar's entire communication system. The network, sensing that its signals weren't persisting in the environment, assumed something was wrong and shut down \u2014 a safety dormancy to conserve resources.\n\nThe fix is simple: create an isolated atmospheric zone without human scrubbing, or program the scrubbers to allow the specific compounds through. The network will sense its own signals in the air again and reactivate.",
        funFact: "On Earth, some plants can 'hear' through mycorrhizal networks. When one tree is attacked by insects, it sends chemical signals through the fungi to warn its neighbors \u2014 and those neighbors start producing defensive compounds before the insects even arrive. The forest has its own internet, and it's been running for 400 million years."
      }
    },

    // ── CASE 6b: The Gift (BONUS) ───────────────────────────────────
    {
      id: "alien2",
      name: "The Gift",
      location: "SAA Xenobiology Lab",
      subtitle: "L2 Station Hayes \u2014 Secure Cultivation Wing",
      isBonus: true,
      isFinalBonus: true,
      palette: {
        bg:        "#0d0d2b",
        bgMid:     "#1a1a4e",
        accent:    "#f7d794",
        highlight: "#4ecdc4",
        plant:     "#ffeaa7"
      },
      sprites: {
        scene:     "sprites/scene_xenobio1.png",
        sceneAlt:  "sprites/scene_xenobio2.png",
        sceneAltFx: "amberPulse"
      },
      briefing: "The genesis pod has been secured in the SAA Xenobiology Lab. We've recreated every measurable condition from the Zhel'ora \u2014 atmosphere, light spectrum, temperature, humidity. The scrubbers are off.\n\nThe pod won't germinate.\n\nZel'keth assures us it's viable, but they don't seem to understand why it isn't responding either. Their exact words: 'We place genesis pods near the mature growth. That is how it is done. We had not considered why.'\n\nDr. Nova, humanity's first alien biological sample is sitting inert in a lab. Figure out what it needs.",

      actionLabels: {
        crew:    "Consult Liaison",
        sensors: "Scan Biomonitors",
        plants:  "Examine Specimen",
        logs:    "Decode Archives"
      },

      sources: {
        // ── Zel'keth via Comms ────────────────────────────────────────
        crew: {
          type: "conversation",
          speaker: "Zel'keth (via comms)",
          personality: "curious",
          startMood: 0,
          nodes: {
            start: {
              text: "[COMMS LINK: Zhel'ora Botanical Vessel]\n\nDr. Nova! The genesis pod does not awaken? This is... [TRANSLATOR: puzzling? concerning?]\n\nYou have replicated the atmosphere? The light? The warmth? And yet it sleeps.\n\nWhat is the word... [TRANSLATOR SEARCHING: tradition? instinct? unconscious knowledge?]",
              options: [
                { label: "Why near established growth specifically?", goto: "proximity_detail" },
                { label: "Could the mature network be sending something to the pod?", goto: "network_signal_idea" },
                { label: "Have you ever germinated a pod away from mature growth?", goto: "isolated_germination" },
                { label: "Our atmosphere is 'too clean' \u2014 no trace VOCs detected.", goto: "too_clean", requires: { clueFound: "MISSING_VOCS" } },
                { label: "The pod is waiting for a specific germination trigger.", goto: "trigger_discussion", requires: { clueFound: "WAITING_FOR_TRIGGER" } },
                { label: "Your archives mention a 'germination cascade compound.'", goto: "compound_discussion", requires: { clueFound: "GERMINATION_COMPOUND" } },
                { label: "Maybe the pod was damaged during transfer.", goto: "wrong_damage" },
                { label: "I'll keep investigating.", goto: "exit_neutral" }
              ]
            },
            proximity_detail: {
              text: "[Zel'keth's colors shift through thoughtful amber]\n\nWhy near established growth? I... this is [TRANSLATOR: embarrassing? humbling?]. We have always done this. It is taught to every tender of the three-who-are-one. 'Place the genesis pod within the canopy's reach.'\n\nBut the reason? The mechanism? I confess I do not know. It is [TRANSLATOR: tradition? inherited knowledge? something-we-never-questioned?].\n\nOn our world, there is always mature growth nearby. The question of 'what if there isn't?' has never needed answering.\n\nUntil now.",
              revealsClue: "PROXIMITY_REQUIRED",
              moodShift: 1,
              setsFlag: "zelketh_admitted_ignorance",
              options: [
                { label: "What does 'within the canopy's reach' mean exactly?", goto: "canopy_reach" },
                { label: "Could the mature network be sending a chemical signal?", goto: "network_signal_idea" },
                { label: "I'll check the archives for more detail.", goto: "exit_neutral" }
              ]
            },
            canopy_reach: {
              text: "Within the canopy's reach... [Zel'keth considers, colors cycling]\n\nPhysically, genesis pods are placed within [TRANSLATOR: calculating] perhaps 2-3 of your meters from the nearest mature growth. Close enough to be within the atmosphere that the network maintains.\n\nThe atmosphere that the network maintains...\n\n[Colors shift to intrigued teal]\n\nDr. Nova, you have given me a thought. The mature network fills the air with its signals \u2014 its volatile compounds. Genesis pods placed nearby would be immersed in those compounds.\n\nIs it possible that the pod needs to [TRANSLATOR: hear? smell? detect?] the network's signals to awaken?",
              moodShift: 1,
              portraitOverride: "portrait_alien_intrigued.png",
              setsFlag: "zelketh_canopy_insight",
              options: [
                { label: "That's exactly what I'm thinking \u2014 the pod needs a chemical 'wake-up call.'", goto: "wake_up_call" },
                { label: "I need to check if there's a specific compound involved.", goto: "exit_neutral" }
              ]
            },
            wake_up_call: {
              text: "[Zel'keth's entire form glows with excited teal]\n\nA wake-up call! A chemical signal that says 'you are not alone \u2014 begin growing \u2014 we will support you!'\n\nOf course! The genesis pod would not waste its one chance at germination without confirmation that a support network exists. Evolution would select for this \u2014 pods that germinate in isolation die. Pods that wait for the network survive.\n\n[TRANSLATOR: revelation? eureka? the-moment-of-understanding?]\n\nBut Dr. Nova \u2014 you have no mature network in your laboratory. The pod is waiting for a signal that will never come. Unless...",
              moodShift: 1,
              portraitOverride: "portrait_alien_intrigued.png",
              options: [
                { label: "Unless we bring the signal to the pod.", goto: "solution_hint" },
                { label: "I need to identify the specific compound first.", goto: "exit_neutral" }
              ]
            },
            solution_hint: {
              text: "[Zel'keth's colors pulse with hope and excitement]\n\nBring the signal to the pod! Yes! But how?\n\nThe mature three-who-are-one aboard the Zhel'ora produce the signal constantly as part of their normal activity. If we could get the signal to your laboratory...\n\n[Colors settle into thoughtful amber]\n\nThere are possibilities, Dr. Nova. I will think on this. Perhaps you should examine what your instruments and archives can tell us about the specific compound. Then we can determine the best approach.\n\nThe three-who-are-one on my ship are healthy again, thanks to you. Perhaps they can help their offspring, even at a distance.",
              setsFlag: "zelketh_willing_to_help",
              options: [
                { label: "I'll identify the compound. Then we'll figure out delivery.", goto: "exit_positive" },
                { label: "Could your ship dock closer to the lab?", goto: "proximity_option_early" }
              ]
            },
            proximity_option_early: {
              text: "[Zel'keth's colors brighten]\n\nDock closer? The Zhel'ora could relocate to the xenobiology port if your station permits. The mature network's signals might reach the pod through the station structure.\n\nIt would be the simplest solution \u2014 no extraction, no synthesis. Just... proximity. The way it has always been done.\n\n[TRANSLATOR: elegance? simplicity? the beauty of the obvious?]\n\nBut we should confirm that the pod truly needs this signal before making arrangements. Your archives may have the answer.",
              moodShift: 1,
              options: [
                { label: "Good thinking. Let me verify in the archives first.", goto: "exit_positive" }
              ]
            },
            network_signal_idea: {
              text: "[Zel'keth pauses, colors cycling through deep thought]\n\nThe mature network sending something... Yes. The mature three-who-are-one constantly produce volatile compounds \u2014 their communication system. Any genesis pod placed nearby would be bathed in those compounds.\n\nWe never isolated which compound triggers germination because we never needed to. There was always a mature network present.\n\nYour species has a concept... [TRANSLATOR SEARCHING: 'mother tree?' 'nurse log?'] \u2014 an established organism that supports new growth. The three-who-are-one may require the same relationship. A new pod needs to hear the voice of the family before it will awaken.",
              moodShift: 1,
              setsFlag: "zelketh_mother_tree_concept",
              options: [
                { label: "Mother trees \u2014 exactly. Seedlings need the network to survive.", goto: "earth_parallel_6b" },
                { label: "I need to find the specific trigger compound.", goto: "exit_neutral" }
              ]
            },
            earth_parallel_6b: {
              text: "[Zel'keth's colors glow with warm recognition]\n\nAgain the parallel! Your Earth seedlings depend on the [TRANSLATOR: myco-rhizal? fungal-web?] network to survive their first months. Without connection to established organisms, they struggle and often die.\n\nThe genesis pod is the same. It will not commit to germination \u2014 its one irreversible act \u2014 without confirmation that a support system exists.\n\n[Colors shift to grateful gold]\n\nDr. Nova, your understanding of your own world's biology is teaching us about ours. This is... [TRANSLATOR: beautiful? humbling? exactly why we came?].",
              moodShift: 2,
              portraitOverride: "portrait_alien_grateful.png",
              options: [
                { label: "Let me find the specific compound. Then we solve this.", goto: "exit_positive" },
                { label: "I'll check the archives.", goto: "exit_neutral" }
              ]
            },
            isolated_germination: {
              text: "[Zel'keth's colors dim with uncertainty]\n\nGerminated in isolation? No. Never. This has never been attempted, as far as I know.\n\nWhy would it be? There is always mature growth available. Genesis pods are precious \u2014 you would not risk one by placing it somewhere without the support of established three-who-are-one.\n\n[Colors shift to puzzled gray]\n\nYour question implies that isolation itself might be the problem. That without nearby mature growth, the pod cannot or will not germinate.\n\nThis is... a possibility I had not considered. We assumed the pod simply needed the right physical conditions. Perhaps it needs something more... [TRANSLATOR: social? biological? relational?].",
              setsFlag: "zelketh_isolation_insight",
              options: [
                { label: "Could the mature network be sending a chemical trigger?", goto: "network_signal_idea" },
                { label: "I'll investigate what's different about isolated conditions.", goto: "exit_neutral" }
              ]
            },
            too_clean: {
              text: "[Zel'keth's colors shift rapidly \u2014 recognition]\n\nToo clean! Again! Your instruments detect no trace volatile compounds in the laboratory air?\n\nWhen we solved the scrubber problem, we restored the network's voice aboard the Zhel'ora. But your laboratory was always silent \u2014 it never had a network's voice to begin with.\n\nThe pod is in a room with perfect atmosphere for Zhel'ii biology... but without the chemical conversation that says 'life is here, it is safe to grow.'\n\n[TRANSLATOR: irony? parallel? we have learned this lesson before?]\n\nClean air. Again, clean air is the problem. Not what is present \u2014 what is absent.",
              moodShift: 1,
              setsFlag: "zelketh_clean_air_again",
              options: [
                { label: "Same lesson, different angle. We need to add compounds, not remove them.", goto: "add_compounds" },
                { label: "I need to identify the specific germination compound.", goto: "exit_neutral" }
              ]
            },
            add_compounds: {
              text: "[Zel'keth's colors warm with enthusiasm]\n\nAdd the voice instead of removing the silence! Yes!\n\nThe mature network aboard the Zhel'ora produces hundreds of compounds. Among them must be the specific signal that tells a genesis pod 'begin.' If we can identify it, we can provide it.\n\nOr... [colors shift to thoughtful amber] ...we could simply bring the pod close enough to the Zhel'ora's network that it can hear the voice directly. The way it would happen naturally.\n\nMultiple solutions, Dr. Nova. Your species is good at finding multiple solutions.",
              options: [
                { label: "Let me check the archives for the specific compound.", goto: "exit_positive" }
              ]
            },
            trigger_discussion: {
              text: "[Zel'keth tilts their head]\n\nA specific germination trigger? You believe the pod is actively waiting for a signal?\n\nThis makes sense with what we know. On our world, seeds that germinate in poor conditions die. Seeds that wait for confirmation of good conditions survive. Evolution would select for a trigger requirement.\n\n[Colors cycle through understanding]\n\nOn Earth, some seeds wait for fire. Some wait for cold. Some wait for digestion by animals. The genesis pod waits for... the voice of the family?\n\nDr. Nova, you understand alien biology better than we understand our own agricultural traditions.",
              moodShift: 1,
              options: [
                { label: "The archives might tell us what compound triggers germination.", goto: "exit_neutral" },
                { label: "Your mature network produces the trigger naturally \u2014 we just need to get it to the pod.", goto: "solution_hint" }
              ]
            },
            compound_discussion: {
              text: "[Zel'keth's colors flash with excitement]\n\nThe archives contain this information? A specific germination-cascade compound?\n\nLet me understand: the mature network produces this compound as part of its normal signaling. Genesis pods placed nearby detect it and interpret it as 'a support network exists \u2014 begin germination.'\n\nThis is brilliant evolutionary design! The pod does not risk germination unless it can verify that a network will be there to support the young symbiosis.\n\n[Colors settle to determined teal]\n\nDr. Nova, we know the compound. We know the mechanism. Now \u2014 how do we provide it? I see several possibilities...",
              moodShift: 1,
              setsFlag: "zelketh_knows_compound",
              options: [
                { label: "Could your ship dock closer so the signal reaches the pod?", goto: "solution_proximity" },
                { label: "Could we extract a sample of the compound from your network?", goto: "solution_extract" },
                { label: "We could synthesize it \u2014 we have the chemical formula.", goto: "solution_synthesize", requires: { clueFound: "GERMINATION_COMPOUND" } },
                { label: "I need to think about the best approach.", goto: "exit_neutral" }
              ]
            },
            solution_proximity: {
              text: "[Zel'keth's colors brighten immediately]\n\nYes! The Zhel'ora could relocate to the xenobiology docking port. The mature network's signals would pass through the station walls \u2014 not perfectly, but enough.\n\nSimple! Elegant! Very human thinking.\n\n[TRANSLATOR: admiration? delight? this-is-why-we-asked-for-help?]\n\nThe mature three-who-are-one would do what they have always done \u2014 send the signal that says 'you are not alone.' And the genesis pod would hear it, and awaken.\n\nNo extraction. No synthesis. Just... proximity. The way it has always been done, with a small adjustment for the distance between our species.",
              moodShift: 1,
              setsFlag: "discussed_proximity_solution",
              options: [
                { label: "Let's do it. Signal the Zhel'ora to reposition.", goto: "exit_positive" },
                { label: "What about extracting the compound instead?", goto: "solution_extract" }
              ]
            },
            solution_extract: {
              text: "[Zel'keth considers, colors cycling through thought]\n\nA sample of the germination compound... yes, a small extraction would not harm the collective. The mature network produces far more than it needs.\n\nWe can provide a [TRANSLATOR: bottle? vial? seed-of-communication?] of the compound. Your scientists may study it, synthesize more when needed.\n\nThis approach is... [TRANSLATOR: pragmatic? practical? less poetic but effective?]. It gives you independence. You would not need the Zhel'ora nearby for future germination attempts.\n\nIs independence what you want, Dr. Nova? Or connection?",
              moodShift: 0,
              setsFlag: "discussed_extract_solution",
              options: [
                { label: "Let's try proximity first \u2014 connection sounds right.", goto: "solution_proximity" },
                { label: "We could also synthesize it ourselves \u2014 we have the formula.", goto: "solution_synthesize", requires: { clueFound: "GERMINATION_COMPOUND" } },
                { label: "I need to think about this.", goto: "exit_neutral" }
              ]
            },
            solution_synthesize: {
              text: "[Zel'keth goes very still. Colors shift through complex patterns \u2014 awe? concern? admiration?]\n\nYour species can create the voice of the network? [TRANSLATOR: astonishment? admiration? slight concern?]\n\nThis is... impressive. The three-who-are-one would accept a synthesized signal. Biology does not distinguish between a natural compound and an identical synthetic one.\n\nBut please \u2014 verify the formulation carefully. A wrong note in the germination signal could produce... [TRANSLATOR STRUGGLING: malformation? discord? bad music?]. The pod trusts this signal completely.\n\n[Colors settle to respectful amber]\n\nYour species masters chemistry as we master cultivation. Different strengths. Perhaps that is also why this works.",
              moodShift: 1,
              setsFlag: "discussed_synthesize_solution",
              options: [
                { label: "We'll be careful. The pod will hear the right signal.", goto: "exit_positive" },
                { label: "Maybe proximity is safer \u2014 let your network do it naturally.", goto: "solution_proximity" }
              ]
            },
            wrong_damage: {
              text: "[Zel'keth's colors shift to confused gray]\n\nDamaged during transfer? We were most careful. The genesis pod was transported in a [TRANSLATOR: stasis cradle? protection sphere? careful container?].\n\nYour biomonitors show no damage, yes? The pod is intact. It is not dead or broken \u2014 it is dormant. Waiting.\n\nThe question is not 'what is wrong with the pod?' The question is 'what is the pod waiting for?'\n\n[Colors return to neutral]\n\nPerhaps examine it more closely, Dr. Nova. Or consult the archives. The answer may be in knowledge we take for granted.",
              moodShift: -1,
              portraitOverride: "portrait_alien_confused.png",
              options: [
                { label: "You're right \u2014 it's waiting for something. I'll investigate.", goto: "exit_neutral" }
              ]
            },
            exit_neutral: {
              text: "[Zel'keth's translator hums]\n\nI am here on the comms channel whenever you need, Dr. Nova. The genesis pod is precious to us. And now, to you as well.\n\n[TRANSLATOR: patience? hope? shared investment?]",
              endsConversation: true,
              exitLabel: "Close comms",
              options: []
            },
            exit_positive: {
              text: "[Zel'keth's colors warm to grateful gold]\n\nYou are close, Dr. Nova. I can feel it. The genesis pod will awaken. The three-who-are-one will grow in human care.\n\nThis will be [TRANSLATOR: historic? wonderful? proof-of-connection?].",
              endsConversation: true,
              exitLabel: "Close comms",
              moodShift: 1,
              portraitOverride: "portrait_alien_grateful.png",
              options: []
            }
          }
        },

        // ── Scan Biomonitors (Human Lab Equipment) ────────────────────
        sensors: {
          type: "terminal",
          speaker: "SAA Xenobiology Lab Biomonitors",
          personality: "stoic",
          startMood: 0,
          nodes: {
            start: {
              text: "\u2550\u2550\u2550 SAA XENOBIOLOGY LAB \u2014 MONITORING CONSOLE \u2550\u2550\u2550\n\nSystems online. Genesis pod containment active.\nAtmospheric scrubbers: DISABLED (per Case 6 findings)\n\nAvailable scans:\n\u2022 Pod status\n\u2022 Atmospheric analysis\n\u2022 Environmental comparison\n\u2022 Historical readings",
              options: [
                { label: "Scan: Pod status", goto: "pod_status" },
                { label: "Scan: Atmospheric analysis", goto: "atmosphere" },
                { label: "Scan: Environmental comparison with Zhel'ora", goto: "comparison" },
                { label: "Scan: What's different near mature growth?", goto: "mature_growth_diff", requires: { clueFound: "PROXIMITY_REQUIRED" } },
                { label: "Scan: Can we replicate the germination compound?", goto: "replicate_compound", requires: { clueFound: "GERMINATION_COMPOUND" } },
                { label: "Exit console", goto: "exit_neutral" }
              ]
            },
            pod_status: {
              text: "\u2550\u2550\u2550 GENESIS POD STATUS \u2550\u2550\u2550\n\nPhysical Integrity: 100% \u2014 NO DAMAGE\nInternal Temperature: 18.4\u00b0C (optimal)\nMembrane Permeability: NORMAL\nInternal Activity: NONE\nGermination Progress: 0%\n\nThree Internal Chambers:\n \u2022 Chamber 1 (Canopy precursor): PRIMED, inactive\n \u2022 Chamber 2 (Root precursor): PRIMED, inactive\n \u2022 Chamber 3 (Network precursor): PRIMED, inactive\n\nAll three chambers show crystalline structures ready\nto unfold. Biological material is viable and responsive\nto micro-stimuli in lab tests.\n\nAssessment: Pod is NOT dead. Pod is WAITING.\nGermination trigger: UNDETECTED.",
              setsFlag: "saw_pod_status",
              options: [
                { label: "Scan: Atmospheric analysis", goto: "atmosphere" },
                { label: "Scan: Environmental comparison", goto: "comparison" },
                { label: "What kind of micro-stimuli responses?", goto: "micro_stimuli" },
                { label: "Exit console", goto: "exit_neutral" }
              ]
            },
            micro_stimuli: {
              text: "\u2550\u2550\u2550 MICRO-STIMULI RESPONSE DATA \u2550\u2550\u2550\n\nThe pod's outer membrane shows receptor sites that\nrespond to specific chemical signatures:\n\n \u2022 Light wavelengths: RESPONSIVE (confirms viability)\n \u2022 Temperature changes: RESPONSIVE (confirms viability)\n \u2022 Atmospheric pressure: RESPONSIVE (confirms viability)\n \u2022 Complex organic volatiles: RECEPTOR SITES ACTIVE\n   \u2514 Receptor type: HIGHLY SPECIFIC\n   \u2514 Target compound: UNKNOWN (not in human database)\n   \u2514 Receptor density: EXTREMELY HIGH\n   \u2514 Position: Concentrated on pod surface facing outward\n\n\u26a0 The pod has many more chemical receptors than\n  environmental receptors. It is optimized for\n  detecting a specific volatile compound.\n\nThis compound is NOT present in the lab atmosphere.",
              setsFlag: "pod_has_chemical_receptors",
              options: [
                { label: "Scan: Atmospheric analysis", goto: "atmosphere" },
                { label: "Scan: Environmental comparison", goto: "comparison" },
                { label: "Exit console", goto: "exit_neutral" }
              ]
            },
            atmosphere: {
              text: "\u2550\u2550\u2550 LAB ATMOSPHERIC ANALYSIS \u2550\u2550\u2550\n\nAtmospheric Match to Zhel'ora: 99.7%\n\n Component          \u2502 Lab    \u2502 Zhel'ora \u2502 Match\n \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n Primary gas mix    \u2502 \u2713      \u2502 \u2713        \u2502 100%\n Temperature        \u2502 18.4\u00b0C \u2502 18.2\u00b0C   \u2502 99.9%\n Humidity           \u2502 71%    \u2502 72%      \u2502 98.6%\n Light spectrum     \u2502 MATCHED\u2502 \u2014        \u2502 99.1%\n Pressure           \u2502 MATCHED\u2502 \u2014        \u2502 100%\n Trace VOC profile  \u2502 MINIMAL\u2502 COMPLEX  \u2502 1.4%\n\n\u26a0 ANOMALY: Trace VOC match is 1.4%\n\nLab atmosphere matches Zhel'ora in all primary\nparameters. The only significant difference is\ntrace volatile organic compounds.\n\nZhel'ora cultivation area: 847+ distinct VOCs\nLab atmosphere: 12 residual compounds\n\nThe lab atmosphere is 'clean' \u2014 no complex organics.",
              revealsClue: "MISSING_VOCS",
              options: [
                { label: "99.7% match but missing almost all volatile compounds.", goto: "voc_gap" },
                { label: "Scan: Pod status", goto: "pod_status" },
                { label: "Scan: Environmental comparison", goto: "comparison" },
                { label: "Exit console", goto: "exit_neutral" }
              ]
            },
            voc_gap: {
              text: "\u2550\u2550\u2550 VOC GAP ANALYSIS \u2550\u2550\u2550\n\nThe 847+ compounds present in the Zhel'ora's\ncultivation area include:\n\n \u2022 Network signaling compounds: ~340\n \u2022 Metabolic byproducts: ~290\n \u2022 Environmental/growth markers: ~217\n\nOur lab has NONE of these because we built a\nclean-room environment from scratch. We matched\nthe primary atmospheric components but never\nintroduced the trace compounds that a living\necosystem naturally produces.\n\nWe recreated the Zhel'ora's air.\nWe did NOT recreate the Zhel'ora's ecosystem.\n\nThe difference between a sterile room and a\nliving environment is the chemical conversation\nhappening in the background.",
              setsFlag: "understood_voc_gap",
              options: [
                { label: "Scan: Can we identify the specific germination trigger?", goto: "trigger_search" },
                { label: "Scan: Environmental comparison", goto: "comparison" },
                { label: "Exit console", goto: "exit_neutral" }
              ]
            },
            trigger_search: {
              text: "\u2550\u2550\u2550 GERMINATION TRIGGER SEARCH \u2550\u2550\u2550\n\nCross-referencing pod receptor data with known\nZhel'ora volatile compound profiles...\n\nThe pod's high-density chemical receptors are\ncalibrated for a SPECIFIC compound \u2014 not the\ngeneral VOC mix.\n\nCompound class: Complex organic volatile\nMolecular weight: HEAVY (unusual for a volatile)\nPersistence: SHORT-LIVED in open atmosphere\nSource: Likely produced by network organism\n         during normal signaling activity\n\nThis compound is NOT in the human chemistry\ndatabase. Formula unavailable from sensor data\nalone.\n\nRecommendation: Check Zhel'ii botanical archives\nfor germination-specific compound data.",
              options: [
                { label: "Scan: Pod status", goto: "pod_status" },
                { label: "Exit console", goto: "exit_neutral" }
              ]
            },
            comparison: {
              text: "\u2550\u2550\u2550 ENVIRONMENTAL COMPARISON \u2550\u2550\u2550\n\n Lab (Current)          \u2502 Zhel'ora (Cultivation Bay)\n \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n Clean atmosphere       \u2502 Living atmosphere\n No organisms present   \u2502 Mature three-who-are-one\n 12 trace compounds     \u2502 847+ trace compounds\n Sterile surfaces       \u2502 Biofilm-coated surfaces\n Static environment     \u2502 Dynamic chemical exchange\n Pod status: DORMANT    \u2502 (no pod present)\n\nKey differences:\n1. No mature network organism to produce signals\n2. No volatile compound ecosystem\n3. No chemical 'context' for the pod\n\nThe lab is physically correct but biologically empty.\nIt's a house with no family inside.",
              setsFlag: "saw_comparison",
              options: [
                { label: "Scan: Atmospheric analysis", goto: "atmosphere" },
                { label: "Scan: Pod status", goto: "pod_status" },
                { label: "Exit console", goto: "exit_neutral" }
              ]
            },
            mature_growth_diff: {
              text: "\u2550\u2550\u2550 MATURE GROWTH PROXIMITY ANALYSIS \u2550\u2550\u2550\n\nComparing atmosphere at varying distances from\nmature three-who-are-one aboard Zhel'ora:\n\n Distance \u2502 VOC Conc. \u2502 Germination Compound*\n \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n 0-1m     \u2502 HIGH      \u2502 DETECTABLE\n 1-3m     \u2502 MODERATE  \u2502 DETECTABLE\n 3-5m     \u2502 LOW       \u2502 TRACE\n 5-10m    \u2502 MINIMAL   \u2502 UNDETECTABLE\n >10m     \u2502 NONE      \u2502 ABSENT\n\n* Compound identified in Zhel'ii archives\n  as 'germination-cascade trigger'\n\nThe germination compound is SHORT-LIVED and\ndoes not persist far from its source. A genesis\npod must be within ~3m of an active network to\ndetect it.\n\nOur lab is approximately 40m from the Zhel'ora's\ncultivation bay through station corridors.",
              setsFlag: "saw_proximity_data",
              options: [
                { label: "40m is too far. We need to get the signal closer.", goto: "distance_problem" },
                { label: "Scan: Can we replicate the compound?", goto: "replicate_compound", requires: { clueFound: "GERMINATION_COMPOUND" } },
                { label: "Exit console", goto: "exit_neutral" }
              ]
            },
            distance_problem: {
              text: "\u2550\u2550\u2550 DISTANCE ASSESSMENT \u2550\u2550\u2550\n\nCurrent configuration: Pod 40m from nearest\nmature network through station corridors.\n\nOptions for reducing distance:\n\n A) Relocate Zhel'ora to xenobiology docking port\n    \u2514 Distance: ~2m through station hull\n    \u2514 Feasibility: HIGH (requires station approval)\n    \u2514 Compound could penetrate through hull vents\n\n B) Transport pod to Zhel'ora cultivation bay\n    \u2514 Distance: 0m (direct proximity)\n    \u2514 Feasibility: MODERATE (containment concerns)\n\n C) Extract compound and apply directly\n    \u2514 Requires compound identification and extraction\n    \u2514 Feasibility: MODERATE\n\n D) Synthesize compound\n    \u2514 Requires exact chemical formula\n    \u2514 Feasibility: UNKNOWN (formula not in human DB)",
              options: [
                { label: "Scan: Pod status", goto: "pod_status" },
                { label: "Exit console", goto: "exit_neutral" }
              ]
            },
            replicate_compound: {
              text: "\u2550\u2550\u2550 COMPOUND REPLICATION ANALYSIS \u2550\u2550\u2550\n\nGermination-cascade compound (from Zhel'ii archives):\n\n Molecular weight: 847 amu\n Stability: LOW (degrades within minutes in open air)\n Complexity: HIGH (multi-ring organic structure)\n\nSynthesis feasibility:\n \u2514 Chemical formula: AVAILABLE (from archives)\n \u2514 Lab equipment: SUFFICIENT\n \u2514 Synthesis time: ~4 hours\n \u2514 Confidence: 94% match achievable\n\n\u26a0 Note: 94% molecular match may be sufficient.\n  Biological systems often accept near-matches\n  for signaling compounds. However, the archives\n  warn about formulation accuracy.\n\nAlternative: Direct extraction from mature network\n \u2514 Compound would be 100% biologically authentic\n \u2514 Requires Zhel'ii cooperation (likely granted)",
              options: [
                { label: "Scan: Pod status", goto: "pod_status" },
                { label: "Exit console", goto: "exit_neutral" }
              ]
            },
            exit_neutral: {
              text: "\u2550\u2550\u2550 CONSOLE STANDBY \u2550\u2550\u2550\n\nMonitoring continues. Pod status unchanged.",
              endsConversation: true,
              exitLabel: "Disconnect",
              options: []
            }
          }
        },

        // ── Examine Specimen (Genesis Pod) ────────────────────────────
        plants: {
          type: "conversation",
          speaker: "Genesis Pod \u2014 Isolation Chamber",
          personality: "stoic",
          startMood: 0,
          nodes: {
            start: {
              text: "The genesis pod sits in the center of the isolation chamber \u2014 an iridescent sphere about the size of a grapefruit. The chamber's soft lighting makes the pod shimmer with shifting colors: amber, teal, violet.\n\nThree internal chambers are visible through the translucent outer membrane, each containing the precursor of one symbiont organism.\n\nThe pod is beautiful. And completely inert.\n\nWhat would you like to examine?",
              options: [
                { label: "Examine the three internal chambers", goto: "chambers" },
                { label: "Examine the outer membrane", goto: "membrane" },
                { label: "Look for receptor structures", goto: "receptors" },
                { label: "Compare to Earth seed dormancy", goto: "earth_comparison" },
                { label: "Try talking to it", goto: "talk_to_pod" },
                { label: "Step back", goto: "exit_neutral" }
              ]
            },
            chambers: {
              text: "Three chambers, three organisms-in-waiting:\n\n\u2022 CHAMBER 1 (upper): Crystalline structures folded tight like origami \u2014 the canopy precursor. Tiny facets catch the light. Ready to unfold into photosynthetic fronds.\n\n\u2022 CHAMBER 2 (lower): Coiled tendrils, pink-tinged, compressed like springs \u2014 the root precursor. You can see the potential energy stored in those coils. Ready to dig.\n\n\u2022 CHAMBER 3 (center): A dense knot of gossamer filaments \u2014 the network precursor. The coordinator. The voice. Currently silent.\n\nAll three are primed. Viable. Full of potential energy. They're not dead. They're not damaged. They're coiled and ready, waiting for the signal to begin.",
              setsFlag: "examined_chambers",
              options: [
                { label: "Examine the outer membrane", goto: "membrane" },
                { label: "Look for receptor structures", goto: "receptors" },
                { label: "What signal are they waiting for?", goto: "what_signal" },
                { label: "Step back", goto: "exit_neutral" }
              ]
            },
            what_signal: {
              text: "That's the question, isn't it?\n\nYou've seen this pattern before in Earth biology. Seeds that won't germinate without a specific trigger:\n\n\u2022 Fire-dependent seeds (like some eucalyptus) wait for heat from bushfire\n\u2022 Cold-stratification seeds wait for winter to pass\n\u2022 Scarification seeds wait to be digested by animals\n\u2022 Smoke-responsive seeds detect chemical compounds from fire\n\nEach evolved the requirement because it guarantees germination only in favorable conditions. A eucalyptus seed that germinates without fire would sprout in shade and die.\n\nWhat condition would guarantee survival for a symbiotic organism that depends on a network? The presence of an existing network.",
              revealsClue: "WAITING_FOR_TRIGGER",
              options: [
                { label: "The pod needs to detect a nearby network. A chemical signal.", goto: "chemical_trigger" },
                { label: "Examine the outer membrane", goto: "membrane" },
                { label: "Step back", goto: "exit_neutral" }
              ]
            },
            chemical_trigger: {
              text: "A chemical signal from a mature network \u2014 a 'germination cascade compound' that says: 'You are not alone. A support network exists here. Begin growing.'\n\nThe pod would detect this compound through its outer membrane receptors. Once confirmed, the irreversible germination process begins.\n\nWithout the signal, the pod waits. It could wait indefinitely \u2014 centuries, perhaps. A survival mechanism that ensures pods only germinate where they'll be supported.\n\nIn your lab, the atmosphere is perfect. The temperature is perfect. But there is no network. No voice saying 'it's safe.' The pod hears only silence.",
              setsFlag: "understood_chemical_trigger",
              options: [
                { label: "Look at the pod's receptor structures", goto: "receptors" },
                { label: "We need to provide the signal somehow.", goto: "exit_neutral" }
              ]
            },
            membrane: {
              text: "The outer membrane is a masterpiece of biological engineering. Translucent, iridescent, and covered in structures too small to see clearly without magnification.\n\nUnder the lab's microscope attachment, the surface resolves into a dense forest of molecular receptors \u2014 protein structures embedded in the membrane, each one shaped to receive a specific molecule.\n\nThere are two types:\n\n\u2022 ENVIRONMENTAL receptors (sparse): Detect light, temperature, pressure. These are reporting 'conditions favorable.'\n\n\u2022 CHEMICAL receptors (dense): Shaped for a complex organic molecule. Thousands of them, covering the outer surface. All currently unoccupied. All waiting.\n\nThe pod has orders of magnitude more chemical receptors than environmental ones. Whatever this chemical signal is, detecting it is the pod's primary function while dormant.",
              setsFlag: "examined_membrane",
              options: [
                { label: "Look at the chemical receptors more closely", goto: "receptors" },
                { label: "Examine the three internal chambers", goto: "chambers" },
                { label: "Compare to Earth seed dormancy", goto: "earth_comparison" },
                { label: "Step back", goto: "exit_neutral" }
              ]
            },
            receptors: {
              text: "Under high magnification, the chemical receptors are extraordinary. Each one is a lock waiting for its key \u2014 a protein cradle shaped for a single specific molecule.\n\nThe receptor shape suggests a large, complex organic volatile \u2014 unusual for an airborne compound. Most atmospheric signals are small, simple molecules. This one is hefty. That explains why it doesn't travel far and degrades quickly.\n\nThe receptor density tells you everything: this isn't a secondary sensor. This is the primary germination gate. No signal, no germination. Period.\n\nThe compound these receptors are waiting for is almost certainly produced by the mature network organism during normal activity. A signal that naturally fills the air near established growth. A signal that says 'family is here.'",
              revealsClue: "WAITING_FOR_TRIGGER",
              setsFlag: "examined_receptors",
              options: [
                { label: "Examine the three internal chambers", goto: "chambers" },
                { label: "Compare to Earth seed dormancy", goto: "earth_comparison" },
                { label: "I need to find this compound in the archives.", goto: "exit_neutral" }
              ]
            },
            earth_comparison: {
              text: "You run through your training \u2014 Earth analogues for conditional germination:\n\n\u2022 Striga seeds (witchweed) won't germinate until they detect strigolactones \u2014 a chemical exuded by host plant roots. This ensures the parasitic seed only sprouts when a host is within reach.\n\n\u2022 Orchid seeds are dust-tiny and carry no nutrients. They MUST connect to a mycorrhizal fungus within days of germination or die. Many orchid species won't germinate without detecting fungal compounds first.\n\n\u2022 Some legume seeds won't germinate without detecting rhizobium bacteria \u2014 their nitrogen-fixing partners.\n\nThe pattern is clear: organisms that depend on symbiotic partners evolve germination triggers linked to those partners' presence.\n\nThe genesis pod depends on the network organism. It won't germinate without detecting the network's presence through a chemical signal.",
              setsFlag: "earth_seed_comparison",
              options: [
                { label: "Examine the outer membrane", goto: "membrane" },
                { label: "Examine the three internal chambers", goto: "chambers" },
                { label: "I need to identify the specific compound.", goto: "exit_neutral" }
              ]
            },
            talk_to_pod: {
              text: "You lean close to the isolation chamber.\n\n\"Hello in there.\"\n\nThe pod does not respond. It does not glow, pulse, shift, or acknowledge your presence in any way.\n\nOf course it doesn't. It's not listening for sound waves. It's listening for a specific molecule \u2014 a chemical whisper from a family it's never met.\n\nSomewhere in the back of your mind, you hear Zel'keth's translator: 'A child awakens only when it hears the voice of the family.'\n\nYou're speaking the wrong language.",
              setsFlag: "talked_to_pod",
              options: [
                { label: "Examine the outer membrane", goto: "membrane" },
                { label: "Look for receptor structures", goto: "receptors" },
                { label: "Compare to Earth seed dormancy", goto: "earth_comparison" },
                { label: "Step back", goto: "exit_neutral" }
              ]
            },
            exit_neutral: {
              text: "You step back from the isolation chamber. The genesis pod sits in its perfect environment, perfectly inert. Waiting for a voice it cannot hear.",
              endsConversation: true,
              exitLabel: "Step back",
              options: []
            }
          }
        },

        // ── Decode Archives (Zhel'ii Botanical Data) ──────────────────
        logs: {
          type: "archive",
          speaker: "Zhel'ii Botanical Archive \u2014 Translated",
          personality: "stoic",
          startMood: 0,
          nodes: {
            start: {
              text: "[TRANSLATION MATRIX ACTIVE]\n[ACCESSING: Zhel'ii Botanical Archive \u2014 Genesis Pod Protocols]\n\n\u2550\u2550\u2550 ARCHIVE CATEGORIES \u2550\u2550\u2550\n\n\u2022 Genesis Pod: Cultivation Protocol\n\u2022 Genesis Pod: Germination Biology\n\u2022 Network Organism: Signal Chemistry\n\u2022 Earth Parallels (Cross-Referenced)",
              options: [
                { label: "Search: Cultivation protocol", goto: "cultivation" },
                { label: "Search: Germination biology", goto: "germination" },
                { label: "Search: Signal chemistry", goto: "signal_chemistry" },
                { label: "Search: Earth parallels", goto: "earth_parallels" },
                { label: "Search: Germination triggers", goto: "triggers", requires: { clueFound: "WAITING_FOR_TRIGGER" } },
                { label: "Search: Proximity requirements", goto: "proximity_search", requires: { clueFound: "PROXIMITY_REQUIRED" } },
                { label: "Close archive", goto: "exit_neutral" }
              ]
            },
            cultivation: {
              text: "[TRANSLATION MATRIX ACTIVE]\n\n\u2550\u2550\u2550 GENESIS POD CULTIVATION PROTOCOL \u2550\u2550\u2550\n\nPlacement: Within harmonic range of established growth\nTimeline: Awakening occurs within 2-4 cycles of placement\nSubstrate: Any mineral-rich medium\nAtmosphere: Standard for Zhel'ii biology\nLight: Not required for germination (required after)\nTemperature: 15-22\u00b0C (your units)\n\nCRITICAL: Genesis pods must be placed near mature\nthree-who-are-one. Distance should not exceed\n[TRANSLATOR: 3 of your meters? arm-lengths?].\n\nReason: [See: Germination Biology]\n\nNote: Pods that are not placed near mature growth\nremain dormant indefinitely. No known failure \u2014\nthis is simply how cultivation has always been\nperformed.",
              setsFlag: "read_cultivation",
              options: [
                { label: "Search: Germination biology", goto: "germination" },
                { label: "Search: Signal chemistry", goto: "signal_chemistry" },
                { label: "Close archive", goto: "exit_neutral" }
              ]
            },
            germination: {
              text: "[TRANSLATION MATRIX ACTIVE]\n\n\u2550\u2550\u2550 GENESIS POD: GERMINATION BIOLOGY \u2550\u2550\u2550\n\nGermination is triggered by detection of a specific\ncompound produced by the mature network organism\nduring normal signaling activity.\n\nThis compound \u2014 designated [UNTRANSLATABLE: chemical\nformula provided below] \u2014 serves as a biological\nconfirmation signal: 'An established network exists\nnearby. Begin germination.'\n\nEvolutionary purpose: Prevents germination in\nisolation, where the young symbiosis would have no\nnetwork support and would perish.\n\n'A child awakens only when it hears the voice\nof the family.'\n\n\u2550\u2550\u2550 COMPOUND DESIGNATION \u2550\u2550\u2550\n[TRANSLATOR: Rendering chemical formula in human notation]\nC\u2084\u2087H\u2086\u2083N\u2085O\u2088S\u2082\nMolecular weight: 862.15 amu\nStability: Degrades in open atmosphere within minutes\nSource: Network organism signaling cascade (byproduct)",
              revealsClue: "GERMINATION_COMPOUND",
              options: [
                { label: "Search: Signal chemistry", goto: "signal_chemistry" },
                { label: "Search: Earth parallels", goto: "earth_parallels" },
                { label: "Search: Cultivation protocol", goto: "cultivation" },
                { label: "Close archive", goto: "exit_neutral" }
              ]
            },
            signal_chemistry: {
              text: "[TRANSLATION MATRIX ACTIVE]\n\n\u2550\u2550\u2550 NETWORK ORGANISM: SIGNAL CHEMISTRY \u2550\u2550\u2550\n\nThe mature network produces 340+ distinct volatile\ncompounds during normal operation. These include:\n\n \u2022 Nutrient coordination signals (primary)\n \u2022 Growth timing signals (secondary)\n \u2022 Threat response signals (emergency)\n \u2022 Environmental status broadcasts (ambient)\n \u2022 Germination-cascade compound (incidental)\n\nThe germination-cascade compound is not deliberately\nproduced for genesis pods. It is a natural byproduct\nof the network's signaling activity \u2014 always present\nin the air near healthy growth.\n\nThis means:\n \u2192 No mature network = no compound = no germination\n \u2192 Compound cannot be stockpiled (degrades too quickly)\n \u2192 Detection range: ~3m from network source\n \u2192 The pod must be NEAR a living, active network\n   OR receive the compound from another source",
              setsFlag: "read_signal_chemistry",
              options: [
                { label: "Search: Germination biology", goto: "germination" },
                { label: "Search: Earth parallels", goto: "earth_parallels" },
                { label: "Close archive", goto: "exit_neutral" }
              ]
            },
            triggers: {
              text: "[TRANSLATION MATRIX ACTIVE]\n\n\u2550\u2550\u2550 GERMINATION TRIGGERS: DETAILED MECHANISM \u2550\u2550\u2550\n\nGermination sequence:\n\n 1. Pod membrane receptors detect germination compound\n 2. Receptor activation triggers internal signaling\n 3. Internal membranes between chambers dissolve\n 4. Network precursor activates FIRST\n 5. Network establishes connections to canopy and root\n 6. Canopy unfolds (light capture begins)\n 7. Root extends (mineral processing begins)\n 8. Full symbiosis functional within 4-6 cycles\n\n\u26a0 CRITICAL: Step 1 is irreversible gating step.\n  Without the compound, no subsequent steps occur.\n  The pod is biologically incapable of spontaneous\n  germination.\n\n\u2550\u2550\u2550 SCHOLARLY ANNOTATION \u2550\u2550\u2550\n\n'This ensures pods only germinate where a support\n network exists. Isolated pods remain dormant\n indefinitely \u2014 a survival adaptation preventing\n germination in hostile conditions.'\n\n'A child awakens only when it hears the voice\n of the family.'",
              setsFlag: "read_trigger_mechanism",
              options: [
                { label: "Search: Germination biology", goto: "germination" },
                { label: "Search: Signal chemistry", goto: "signal_chemistry" },
                { label: "Close archive", goto: "exit_neutral" }
              ]
            },
            proximity_search: {
              text: "[TRANSLATION MATRIX ACTIVE]\n\n\u2550\u2550\u2550 PROXIMITY REQUIREMENTS \u2550\u2550\u2550\n\nHistorical cultivation data:\n\nAll recorded genesis pod germinations occurred within\n[TRANSLATOR: 1-3 of your meters] of mature growth.\n\nNo record exists of germination beyond this range.\nNo record exists of isolated germination.\n\nProximity ensures:\n 1. Germination compound reaches pod receptors\n 2. Young network can connect to mature network\n    immediately after emergence\n 3. Nutrient support available from first moment\n\n\u2550\u2550\u2550 HISTORIAN'S NOTE \u2550\u2550\u2550\n\n'We have never questioned why proximity is required.\nIt is [TRANSLATOR: tradition? natural law? obvious?].\nThe scholarly annotation was added by a researcher\nwho wondered what would happen if a pod were placed\nfar from any mature growth. The answer, it seems,\nis: nothing happens. The pod waits forever.'\n\n'We did not imagine a scenario where this knowledge\nwould be needed. Until now.'",
              setsFlag: "read_proximity_requirements",
              options: [
                { label: "Search: Germination biology", goto: "germination" },
                { label: "Search: Signal chemistry", goto: "signal_chemistry" },
                { label: "Close archive", goto: "exit_neutral" }
              ]
            },
            earth_parallels: {
              text: "[TRANSLATOR NOTE: Human botanical records contain relevant parallels]\n\n\u2550\u2550\u2550 EARTH PARALLEL: GERMINATION DEPENDENCIES \u2550\u2550\u2550\n\nEarth seeds exhibit similar germination dependencies:\n\n \u2022 Some require fire (nutrients from ash)\n \u2022 Some require animal digestion (transport guarantee)\n \u2022 Some require cold periods (winter verification)\n \u2022 Some require specific fungi (symbiont presence)\n \u2022 Some require host plant chemicals (parasitic seeds)\n\nThe genesis pod's requirement for 'network voice'\nparallels how some Earth seedlings depend on\nestablished mycorrhizal networks to survive their\nfirst months.\n\n\u2550\u2550\u2550 KEY PARALLEL \u2550\u2550\u2550\n\nEcologist Suzanne Simard discovered that Douglas fir\n'mother trees' can recognize their own offspring and\nsend them more resources through mycorrhizal networks\nthan they send to stranger seedlings.\n\nTrees have families. And they play favorites.\n\nThe three-who-are-one have families too. The genesis\npod is waiting to hear from its family before it\ncommits to life.",
              setsFlag: "read_earth_parallels_6b",
              options: [
                { label: "Search: Germination biology", goto: "germination" },
                { label: "Search: Cultivation protocol", goto: "cultivation" },
                { label: "Close archive", goto: "exit_neutral" }
              ]
            },
            exit_neutral: {
              text: "[ARCHIVE SESSION CLOSED]\n[TRANSLATION MATRIX STANDBY]",
              endsConversation: true,
              exitLabel: "Close archive",
              options: []
            }
          }
        }
      },

      clues: [
        {
          action: "crew",
          label: "Consult Liaison",
          icon: "\ud83d\udc7d",
          speaker: "Zel'keth (via comms)",
          sprites: {
            alienPortrait: "portrait_alien_neutral.png",
            alienIcon:     "portrait_alien.png"
          },
          text: "Genesis pods are always placed near established growth \u2014 'It is simply how it is done.' Zel'keth realizes they never questioned why. The mature three-who-are-one may provide something the pod needs that they've taken for granted.",
          clueTag: "PROXIMITY_REQUIRED",
          learned: "Genesis pods are always placed near mature growth. The aliens don't fully understand why \u2014 it's instinct."
        },
        {
          action: "sensors",
          label: "Scan Biomonitors",
          icon: "\ud83d\udd2e",
          speaker: "SAA Xenobiology Lab Biomonitors",
          sprites: {
            portrait:   "portrait_sensors.png",
            actionIcon: "icon_sensors.png"
          },
          text: "Lab atmosphere matches Zhel'ora at 99.7% for primary components, but trace VOC match is only 1.4%. The lab has 12 residual compounds vs. 847+ aboard the alien ship. Our atmosphere is 'clean' \u2014 too clean. Missing the chemical conversation of a living ecosystem.",
          clueTag: "MISSING_VOCS",
          learned: "Lab atmosphere is missing nearly all volatile compounds \u2014 it matches the air but not the living ecosystem."
        },
        {
          action: "plants",
          label: "Examine Specimen",
          icon: "\ud83c\udf3f",
          speaker: "Genesis Pod \u2014 Isolation Chamber",
          sprites: {
            portrait:   "portrait_bioreactor.png",
            actionIcon: "icon_alien_plants.png"
          },
          text: "The pod is primed and viable but waiting for a specific chemical trigger. Dense receptor sites on the membrane are shaped for a complex organic volatile. Like Earth seeds that require fire or animal digestion \u2014 dormancy broken only by a specific environmental signal.",
          clueTag: "WAITING_FOR_TRIGGER",
          learned: "The pod is waiting for a specific chemical trigger \u2014 like Earth seeds that need fire or cold to germinate."
        },
        {
          action: "logs",
          label: "Decode Archives",
          icon: "\ud83d\udc8e",
          speaker: "Zhel'ii Botanical Archive \u2014 Translated",
          sprites: {
            portrait:   "portrait_alien_logs.png",
            actionIcon: "icon_alien_logs.png"
          },
          text: "The mature network produces a germination-cascade compound (C\u2084\u2087H\u2086\u2083N\u2085O\u2088S\u2082) during normal signaling \u2014 a byproduct that tells nearby pods 'a support network exists, begin germination.' Without this compound, pods remain dormant indefinitely. 'A child awakens only when it hears the voice of the family.'",
          clueTag: "GERMINATION_COMPOUND",
          learned: "A specific compound from the mature network triggers germination. Pods won't germinate without 'hearing' an established network."
        }
      ],

      diagnoses: [
        {
          id: "germination_compound",
          label: "The pod needs a 'germination compound' from a mature network \u2014 it won't awaken without the chemical signal that a support network exists.",
          isCorrect: true
        },
        {
          id: "wrong_light",
          label: "The lab's artificial light is missing a critical wavelength for germination.",
          isCorrect: false,
          hint: "The biomonitors show light spectrum is matched at 99.1%. The pod has far more chemical receptors than light receptors \u2014 it's waiting for a molecule, not a wavelength."
        },
        {
          id: "transfer_damage",
          label: "The pod was damaged during transfer from the alien ship.",
          isCorrect: false,
          hint: "Physical integrity reads 100%. The pod is not dead or damaged \u2014 all three chambers are primed and viable. It's dormant, not broken."
        },
        {
          id: "human_microbes",
          label: "Human-origin microorganisms are inhibiting germination.",
          isCorrect: false,
          hint: "The isolation chamber is sterile. There's nothing interfering with the pod \u2014 there's something missing from its environment."
        }
      ],

      solutionChoice: {
        prompt: "You know what the pod needs. How will you provide it?",
        options: [
          {
            id: "proximity",
            label: "Ask Zel'keth to dock the Zhel'ora closer \u2014 let the mature network's signal reach the pod naturally.",
            bonusPoints: 10,
            bonusLabel: "Diplomatic Solution",
            response: "Zel'keth: \"Ah! Yes, the [TRANSLATOR: network voice] would reach it through the station walls if we dock at the xenobiology port. We did not think to offer this. Simple! Elegant! Very human thinking.\"\n\n[Within hours, the pod begins to glow. The three-who-are-one are waking up.]"
          },
          {
            id: "extract",
            label: "Request a sample of the germination compound from the Zhel'ora's mature network.",
            bonusPoints: 0,
            bonusLabel: null,
            response: "Zel'keth: \"A small sample would not harm the collective. We can provide a [TRANSLATOR: bottle? vial? seed of communication?] of the compound. Your scientists may synthesize more when needed.\"\n\n[The extracted compound is applied. The pod's receptors activate. Germination begins.]"
          },
          {
            id: "synthesize",
            label: "Synthesize the germination compound \u2014 we have the chemical formula.",
            bonusPoints: 10,
            bonusLabel: "Scientific Achievement",
            requires: { clueFound: "GERMINATION_COMPOUND" },
            response: "Zel'keth: \"Your species can create the voice of the network? [TRANSLATOR: astonishment? admiration? slight concern?] This is... impressive. But please \u2014 verify the formulation carefully.\"\n\n[After careful synthesis and verification, the compound is applied. The pod responds. Life stirs within.]"
          }
        ]
      },

      rankUpText: "From silenced networks to awakened seeds \u2014 you've learned that life doesn't begin alone. Every organism needs to hear the voice of its family.",

      explanation: {
        title: "Mother Trees and First Words",
        body: "In Earth's forests, seedlings don't survive alone. They connect to mycorrhizal networks \u2014 fungal threads that link trees together \u2014 and receive support from established 'mother trees.' A seedling growing near its parent receives sugars, nutrients, and even chemical signals through the network. Remove the network, and seedling survival plummets.\n\nEvolution has made many seeds cautious. Some won't germinate without fire (ensuring nutrients from ash). Some need animal digestion (ensuring transport to new territory). Some require cold stratification (ensuring winter has passed). And some, like the Zhel'ii genesis pod, need to 'hear' that a support network exists before committing to growth.\n\nThe mature network's signaling compounds include a specific molecule that triggers germination \u2014 a chemical 'all clear' that says: 'You are not alone. Begin growing. We will support you.'\n\nWithout that signal, the genesis pod remains in suspended animation, possibly for centuries. A survival mechanism becomes a barrier \u2014 unless someone provides the voice it needs to hear.",
        funFact: "Ecologist Suzanne Simard discovered that Douglas fir 'mother trees' can recognize their own offspring and send them more resources through mycorrhizal networks than they send to stranger seedlings. Trees have families, and they play favorites."
      },

      victory: {
        podAwakening: "The genesis pod pulses with light. Slowly, the three internal chambers unseal. Crystalline fronds unfold \u2014 no larger than your fingernail, but unmistakably alive. Root tendrils extend, seeking purchase in the growth medium you've prepared. And beneath the surface, the first delicate threads of a new network begin to spread.\n\nThe three-who-are-one.\n\nGrowing in human care for the first time in history.",
        zelkethClosing: "Dr. Nova. You have done a thing we did not believe possible. The three-who-are-one live far from home, in the care of another species.\n\nYou are now [TRANSLATOR STRUGGLING: network-parent? harmony-keeper? adopted family?] to this new life.\n\nWhen we depart, a part of our world remains with yours.\n\nThis is... [TRANSLATOR: good? right? as it should be?]\n\nMay your species and ours speak again. Through the children of the three-who-are-one, we are now connected.\n\nThe harmony extends between stars."
      }
    }
  ]
};
