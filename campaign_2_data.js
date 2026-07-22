// Space Sprout Sleuth — Campaign 2 Data (skeleton)
// Federation Field Cases — Phase 2 skeleton pass
//
// Loaded alongside space_sprout_sleuth_data.js. The engine merges both into
// GAME_DATA.campaigns[] during init and switches active campaign via
// setActiveCampaign(idx).
//
// Phase 2 scope: all 5 cases at flat V1-depth. No branching dialogue,
// no species-variant content, placeholder text everywhere. Enough to prove
// the architecture end-to-end. Phase 3+ deepens each case.

// Embedded TexturePacker frame data for all Campaign 2 spritesheets.
// Mirrors the SPRITE_FRAMES pattern in space_sprout_sleuth_data.js — using
// embedded data lets the engine read frame coordinates without fetch(), which
// is blocked on file:// protocol. The loadSpritesheet() function in index.html
// recognizes sprites/c2/* paths and returns these arrays directly.
//
// UI sheet and badge sheet entries need { filename, frame } so drawUiFrame can
// look up by name. Crew sheets need only { frame } because startTalkAnim
// indexes them positionally (frames 0-8 = talk cycle, frame 9 = static portrait).
// Every C2 crew spritesheet has a DIFFERENT per-character layout because the
// TexturePacker tool auto-tightened bounds to each sprite's dimensions — they
// can't share a single SPRITE_FRAMES.crew entry like the Campaign 1 crew does.
const CAMPAIGN_2_FRAMES = {
  ui: [
    { filename: "icon_database.png",             frame: {x:1,   y:1,   w:32, h:32} },
    { filename: "portrait_database.png",         frame: {x:35,  y:1,   w:96, h:96} },
    { filename: "portrait_genesis_offspring.png", frame: {x:133, y:1,   w:96, h:96} },
    { filename: "portrait_gorlroot.png",         frame: {x:231, y:1,   w:96, h:96} },
    { filename: "portrait_karreth.png",          frame: {x:1,   y:99,  w:96, h:96} },
    { filename: "portrait_lyreflower.png",       frame: {x:99,  y:99,  w:96, h:96} },
    { filename: "portrait_species_human.png",    frame: {x:197, y:99,  w:96, h:96} },
    { filename: "portrait_species_oolian.png",   frame: {x:1,   y:197, w:96, h:96} },
    { filename: "portrait_species_rhessi.png",   frame: {x:99,  y:197, w:96, h:96} },
    { filename: "portrait_species_telluvian.png", frame: {x:197, y:197, w:96, h:96} },
    { filename: "portrait_species_vressk.png",   frame: {x:329, y:1,   w:96, h:96} },
    { filename: "portrait_species_zhelii.png",   frame: {x:295, y:99,  w:96, h:96} },
    { filename: "portrait_zhalkelp.png",         frame: {x:295, y:197, w:96, h:96} }
  ],

  badges: [
    { filename: "badge_concord_field_agent.png",     frame: {x:1,    y:1,    w:512, h:512} },
    { filename: "badge_cross_species_specialist.png", frame: {x:515,  y:1,    w:512, h:512} },
    { filename: "badge_federation_trainee.png",      frame: {x:1,    y:515,  w:512, h:512} },
    { filename: "badge_galactic_botanist.png",       frame: {x:515,  y:515,  w:512, h:512} },
    { filename: "badge_senior_liaison.png",          frame: {x:1029, y:1,    w:512, h:512} }
  ],

  // Per-character crew spritesheet frame arrays.
  // Order matters: 9 talk-cycle frames first (indices 0-8), static portrait last
  // (index 9). startTalkAnim uses data.frames.slice(0,-1) for the talk loop,
  // drawPortraitIcon reads the last frame for the action-button icon.
  crew_vressk_botanist: [
    { frame: {x:1,   y:1,   w:100, h:102} },
    { frame: {x:103, y:1,   w:100, h:102} },
    { frame: {x:205, y:1,   w:100, h:102} },
    { frame: {x:1,   y:105, w:100, h:102} },
    { frame: {x:103, y:105, w:100, h:102} },
    { frame: {x:205, y:105, w:100, h:102} },
    { frame: {x:1,   y:209, w:100, h:102} },
    { frame: {x:103, y:209, w:100, h:102} },
    { frame: {x:205, y:209, w:100, h:102} },
    { frame: {x:307, y:1,   w:96,  h:96}  }
  ],

  crew_miransel: [
    { frame: {x:1,   y:1,   w:96, h:102} },
    { frame: {x:99,  y:1,   w:96, h:102} },
    { frame: {x:197, y:1,   w:96, h:102} },
    { frame: {x:1,   y:105, w:96, h:102} },
    { frame: {x:99,  y:105, w:96, h:102} },
    { frame: {x:197, y:105, w:96, h:102} },
    { frame: {x:1,   y:209, w:96, h:102} },
    { frame: {x:99,  y:209, w:96, h:102} },
    { frame: {x:197, y:209, w:96, h:102} },
    { frame: {x:295, y:1,   w:96, h:96}  }
  ],

  crew_teisal: [
    { frame: {x:1,   y:1,   w:100, h:100} },
    { frame: {x:103, y:1,   w:100, h:100} },
    { frame: {x:205, y:1,   w:100, h:100} },
    { frame: {x:1,   y:103, w:100, h:100} },
    { frame: {x:103, y:103, w:100, h:100} },
    { frame: {x:205, y:103, w:100, h:100} },
    { frame: {x:1,   y:205, w:100, h:100} },
    { frame: {x:103, y:205, w:100, h:100} },
    { frame: {x:205, y:205, w:100, h:100} },
    { frame: {x:307, y:1,   w:96,  h:96}  }
  ],

  crew_vesslor: [
    { frame: {x:1,   y:1,   w:71, h:103} },
    { frame: {x:74,  y:1,   w:71, h:103} },
    { frame: {x:147, y:1,   w:71, h:103} },
    { frame: {x:1,   y:106, w:71, h:103} },
    { frame: {x:74,  y:106, w:71, h:103} },
    { frame: {x:147, y:106, w:71, h:103} },
    { frame: {x:220, y:1,   w:71, h:103} },
    { frame: {x:220, y:106, w:71, h:103} },
    { frame: {x:1,   y:211, w:71, h:103} },
    { frame: {x:74,  y:211, w:96, h:96}  }
  ],

  crew_keltor: [
    { frame: {x:1,   y:1,   w:95, h:101} },
    { frame: {x:98,  y:1,   w:95, h:101} },
    { frame: {x:195, y:1,   w:95, h:101} },
    { frame: {x:1,   y:104, w:95, h:101} },
    { frame: {x:98,  y:104, w:95, h:101} },
    { frame: {x:195, y:104, w:95, h:101} },
    { frame: {x:1,   y:207, w:95, h:101} },
    { frame: {x:98,  y:207, w:95, h:101} },
    { frame: {x:195, y:207, w:95, h:101} },
    { frame: {x:292, y:1,   w:96, h:96}  }
  ],

  // Case 6 delegate spritesheets (unique per-character layouts)
  crew_delegate_shael: [
    { frame: {x:1,   y:1,   w:79, h:103} },
    { frame: {x:82,  y:1,   w:79, h:103} },
    { frame: {x:163, y:1,   w:79, h:103} },
    { frame: {x:1,   y:106, w:79, h:103} },
    { frame: {x:82,  y:106, w:79, h:103} },
    { frame: {x:163, y:106, w:79, h:103} },
    { frame: {x:244, y:1,   w:79, h:103} },
    { frame: {x:244, y:106, w:79, h:103} },
    { frame: {x:1,   y:211, w:79, h:103} },
    { frame: {x:82,  y:211, w:96, h:96}  }
  ],

  crew_delegate_kess: [
    { frame: {x:1,   y:1,   w:64, h:100} },
    { frame: {x:67,  y:1,   w:64, h:100} },
    { frame: {x:133, y:1,   w:64, h:100} },
    { frame: {x:199, y:1,   w:64, h:100} },
    { frame: {x:1,   y:103, w:64, h:100} },
    { frame: {x:67,  y:103, w:64, h:100} },
    { frame: {x:133, y:103, w:64, h:100} },
    { frame: {x:199, y:103, w:64, h:100} },
    { frame: {x:265, y:1,   w:64, h:100} },
    { frame: {x:1,   y:205, w:96, h:96}  }
  ],

  crew_delegate_ilreth: [
    { frame: {x:1,   y:1,   w:94, h:104} },
    { frame: {x:97,  y:1,   w:94, h:104} },
    { frame: {x:193, y:1,   w:94, h:104} },
    { frame: {x:1,   y:107, w:94, h:104} },
    { frame: {x:97,  y:107, w:94, h:104} },
    { frame: {x:193, y:107, w:94, h:104} },
    { frame: {x:1,   y:213, w:94, h:104} },
    { frame: {x:97,  y:213, w:94, h:104} },
    { frame: {x:193, y:213, w:94, h:104} },
    { frame: {x:289, y:1,   w:96, h:96}  }
  ],

  // Nova unmasked variant (Case 6 — physically present on Earth)
  crew_nova_unmasked: [
    { frame: {x:1,   y:1,   w:97, h:103} },
    { frame: {x:100, y:1,   w:97, h:103} },
    { frame: {x:199, y:1,   w:97, h:103} },
    { frame: {x:1,   y:106, w:97, h:103} },
    { frame: {x:100, y:106, w:97, h:103} },
    { frame: {x:199, y:106, w:97, h:103} },
    { frame: {x:1,   y:211, w:97, h:103} },
    { frame: {x:100, y:211, w:97, h:103} },
    { frame: {x:199, y:211, w:97, h:103} },
    { frame: {x:298, y:1,   w:96, h:96}  }
  ],

  crew_nova: [
    { frame: {x:1,   y:1,   w:100, h:100} },
    { frame: {x:103, y:1,   w:100, h:100} },
    { frame: {x:205, y:1,   w:100, h:100} },
    { frame: {x:1,   y:103, w:100, h:100} },
    { frame: {x:103, y:103, w:100, h:100} },
    { frame: {x:205, y:103, w:100, h:100} },
    { frame: {x:1,   y:205, w:100, h:100} },
    { frame: {x:103, y:205, w:100, h:100} },
    { frame: {x:205, y:205, w:100, h:100} },
    { frame: {x:307, y:1,   w:96,  h:96}  }
  ]
};

const CAMPAIGN_2_DATA = {
  id: "c2",
  name: "Federation Field Cases",

  species: [
    { id: 'human', name: 'Human', portrait: 'portrait_species_human.png',
      tip: 'Homeworld: Earth (Sol III, 1.0g)\nPhysiology: Bipedal mammalian, ~1.7m, internal skeleton, limited sensory range\nCulture: Tool-builders. Recent Concord admission (probationary)\nDiet: Omnivorous generalist\nField Trait: Home-field advantage in human-run facilities. Bureaucracy is second nature \u2014 you know which forms to skip' },
    { id: 'zhelii', name: "Zhel'ii", portrait: 'portrait_species_zhelii.png',
      tip: "Homeworld: Zhel'ora (K-type system)\nPhysiology: Tall invertebrate, ~2.1m, chromatophore skin, mantle fins\nCulture: Symbiosis-centered. Communicate via color-shift + chemical signal\nDiet: Filter-feeder via specialized membrane folds\nField Trait: Zhel'ii crew treat you as kin. Symbiosis cases feel like home \u2014 cultural shortcuts others can't access" },
    { id: 'vressk', name: 'Vressk', portrait: 'portrait_species_vressk.png',
      tip: 'Homeworld: Vress (2.1g super-Earth)\nPhysiology: Stocky biped, ~1.4m, dense bone structure, no external ears\nCulture: Precision engineers. View improvisation as failure\nDiet: Tuber-based herbivore. Heavy mineral supplementation off-world\nField Trait: Fellow Vressk respect your engineering instincts. Prickly colleagues warm to you faster' },
    { id: 'oolian', name: 'Oolian', portrait: 'portrait_species_oolian.png',
      tip: 'Homeworld: Kepler-186f (deep ocean)\nPhysiology: Aquatic humanoid, ~1.9m, bioluminescent patches, webbed digits\nCulture: Ancient mariculturists. Patient, long-lived, politely bemused by land-dwellers\nDiet: Marine filtration + cultivated kelp\nField Trait: Deep-ocean biology is intuitive for you. Aquaculturists treat you as a colleague, not an outsider.' },
    { id: 'telluvian', name: 'Telluvian', portrait: 'portrait_species_telluvian.png',
      tip: 'Homeworld: Telluv (resonant cave systems)\nPhysiology: Slender biped, ~1.8m, sensory antennae (acoustic), pale integument\nCulture: Acoustic-relational. Organized around sound and symbiotic gestures\nDiet: Nectarivore. Protein concentrates off-world\nField Trait: Knows of "the dance" \u2014 a cultural door that stays shut for everyone else' },
    { id: 'rhessi', name: 'Rhessi', portrait: 'portrait_species_rhessi.png',
      tip: 'Homeworld: Rhess-IV (high-radiation world)\nPhysiology: Broad frame, ~1.6m, leathery integument, radiation-adapted metabolism\nCulture: Extremophile cultivators. Pragmatic, direct, finds Concord policies frustrating\nDiet: Radiotrophic-supplemented omnivore\nField Trait: Radiation specialists speak plainly to you instead of simplifying for laypeople.' }
  ],

  ranks: [
    "Federation Trainee",
    "Concord Field Agent",
    "Cross-Species Specialist",
    "Senior Liaison",
    "Galactic Botanist"
  ],

  cases: [
    // ── CASE 1: Vressk Centrifuge Habitat ────────────────────────
    // Design-doc codename: "Heavy Hands". Mirrors C1 Case 1 (gravitropism)
    // with a centrifugal-gravity gradient twist.
    // Phase 2 skeleton: 5 flat clues including Federation Database,
    // single-reveal dialogue nodes, stub text throughout.
    {
      id: "heavy_hands",
      name: "Vressk Centrifuge Habitat",
      location: "Kepler-442b Orbit",
      subtitle: "Vressk Territory",
      palette: {
        bg:        "#1a0f0a",
        bgMid:     "#2b1a10",
        accent:    "#d97706",
        highlight: "#fbbf24",
        plant:     "#a16207"
      },
      sprites: {
        scene: "sprites/c2/scene_vressk_centrifuge.png"
      },
      // Starfield window rect — plain drift (same effect type as Campaign 1 Case 1).
      // Coordinates are in the 240x280 scene sprite space. Top-left (85, 90),
      // bottom-right (190, 150).
      sceneWindow: { x: 85, y: 90, w: 105, h: 60 },
      briefing: "Nova here. Your first Federation field case. A Vressk centrifuge habitat in orbit around Kepler-442b is trying to grow gorlroot \u2014 that's a staple tuber from a 2.1g world. The tubers are growing upward instead of down, and the Vressk botanist on site is not happy about it. Nobody can figure out why.\n\nZel'keth: 'The Vressk are precise. If their botanist cannot identify the cause, it is either something very subtle or something no Vressk has encountered before. Both possibilities are interesting.'\n\nNova: 'Interesting for you. Frustrating for them. Go easy \u2014 Vressk don't like wasted time. Get in, gather your evidence, make the diagnosis.'",

      sources: {
        crew: {
          type: "conversation",
          speaker: "Vressk Botanist",
          personality: "prickly",
          startMood: 0,
          nodes: {
            start: {
              text: "You must be the Federation liaison. Fine. The gorlroot are growing wrong. Up instead of down. I have been over every variable and I cannot explain it. Ask your questions.",
              options: [
                { label: "What exactly is happening with the gorlroot?", goto: "problem_main" },
                { label: "How long has this been going on?", goto: "timeline" },
                { label: "Tell me about this habitat.", goto: "habitat_info" },
                { label: "The sensor data shows a gravity gradient across the bed.", goto: "gravity_insight", requires: { clueFound: "GRAVITY_GRADIENT" } },
                { label: "Vressk tradition says gorlroot needs uniform 2.1g.", goto: "tradition_insight", requires: { clueFound: "GORLROOT_NEEDS_UNIFORM_G" } },
                { label: "The tubers I examined are growing toward the ring wall.", goto: "tuber_insight", requires: { clueFound: "TUBERS_MISALIGNED" } },
                { label: "Concord records describe a centrifugal gradient problem.", goto: "database_insight", requires: { clueFound: "CENTRIFUGAL_GRADIENT_KNOWN" } },
                { label: "Gor-vess. I am also of Vress.", goto: "vressk_greeting", requires: { playerSpecies: "vressk" } },
                { label: "I understand working with species who don't understand your crops.", goto: "alien_rapport", requires: { playerSpeciesNot: "human" } },
                { label: "I'll investigate elsewhere first.", goto: "exit_neutral" }
              ]
            },
            vressk_greeting: {
              text: "Gor-vess. You are of Vress? Then you know gorlroot. You know what 2.1g means to a tuber. Something here is wrong with the gravity. Not the number \u2014 the number is correct. But the gorlroot knows something I cannot measure.",
              moodShift: 1,
              revealsClue: "GORLROOT_UPWARD",
              bonusInsight: true,
              options: [
                { label: "The gorlroot is more precise than our instruments.", goto: "precision_discussion" },
                { label: "I'll check the sensors for anomalies.", goto: "exit_friendly" }
              ]
            },
            alien_rapport: {
              text: "Hmm. At least you are not another human telling me the gravity is 'fine.' The gravity is fine on paper. The gorlroot disagrees with the paper.",
              options: [
                { label: "What does the gorlroot say is wrong?", goto: "problem_main" },
                { label: "I'll check the sensors.", goto: "exit_neutral" }
              ]
            },
            problem_main: {
              text: "The tubers swell upward. Out of the soil. Toward the outer wall of the ring. Roots tangle instead of driving straight down. On Vress, gorlroot root networks are perfectly vertical \u2014 they track the gravity vector to within a fraction of a degree. Here, they track... nothing. They spiral.",
              revealsClue: "GORLROOT_UPWARD",
              setsFlag: "botanist_described_problem",
              options: [
                { label: "What have you tried so far?", goto: "attempts" },
                { label: "Could it be the soil composition?", goto: "wrong_guess_soil" },
                { label: "Maybe the gravity is too strong?", goto: "wrong_guess_too_strong" },
                { label: "Tell me about this centrifuge habitat.", goto: "habitat_info" },
                { label: "I'll investigate the other sources.", goto: "exit_neutral" }
              ]
            },
            attempts: {
              text: "Soil: reformulated three times to match Vress mineral profiles. Nutrients: precise. Light: calibrated to Vress-standard grow spectrum. Water: clean. I have changed everything I can change. The gorlroot still grows wrong. The only variable I have not changed is the gravity itself \u2014 because the gravity is correct.",
              setsFlag: "botanist_described_attempts",
              options: [
                { label: "What if the gravity isn't quite what you think?", goto: "gravity_question" },
                { label: "Tell me about the habitat design.", goto: "habitat_info" },
                { label: "I'll check the sensors.", goto: "exit_neutral" }
              ]
            },
            gravity_question: {
              text: "The gravity IS what I think. 2.1g. I calibrated the ring rotation myself. The instruments confirm it. Unless you are telling me my instruments are wrong?",
              moodShift: -1,
              options: [
                { label: "Not wrong. Maybe... incomplete.", goto: "gravity_nuance" },
                { label: "I'll verify with the sensors.", goto: "exit_neutral" }
              ]
            },
            gravity_nuance: {
              text: "Incomplete. Explain.",
              options: [
                { label: "What if the gravity varies across the bed depth?", goto: "gravity_varies" },
                { label: "I need more data first.", goto: "exit_neutral" }
              ]
            },
            gravity_varies: {
              text: "Varies? It is centrifugal force. The radius... the radius changes with depth. The top of the bed is closer to the axis than the bottom. You are saying the 'down' vector is different at 20 centimeters depth than at the surface.",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "Exactly. A gradient that gorlroot can detect.", goto: "realization" },
                { label: "I need to confirm this with the sensors.", goto: "exit_friendly" }
              ]
            },
            timeline: {
              text: "Since we planted. The first crop showed the problem immediately. The second crop, I adjusted the soil \u2014 same result. Third crop, different seed stock \u2014 same result. The problem is not the seeds and not the soil. It is something about this place.",
              options: [
                { label: "What's different about this place compared to Vress?", goto: "habitat_info" },
                { label: "Describe the symptoms exactly.", goto: "problem_main" },
                { label: "I'll check the sensors.", goto: "exit_neutral" }
              ]
            },
            habitat_info: {
              text: "The Concord built this ring to grow food in orbit. Kepler-442b has no colonies yet \u2014 too much politics. So they built a centrifuge instead. Spin the ring, generate 2.1g. Simple engineering. Except the gorlroot disagrees.",
              options: [
                { label: "How was the rotation calibrated?", goto: "calibration" },
                { label: "Has gorlroot ever been grown off Vress before?", goto: "first_offworld" },
                { label: "I'll investigate elsewhere.", goto: "exit_neutral" }
              ]
            },
            calibration: {
              text: "I calibrated it myself. Accelerometer at the midpoint of the soil bed reads 2.1g. Exactly right. The RPM is steady. There is no vibration, no wobble. The engineering is precise. That is why this makes no sense.",
              setsFlag: "botanist_described_calibration",
              options: [
                { label: "Where exactly on the bed did you measure?", goto: "measurement_spot" },
                { label: "I'll check the sensor array.", goto: "exit_neutral" }
              ]
            },
            measurement_spot: {
              text: "At the midpoint. Where else? That is standard practice.",
              options: [
                { label: "What about the top? Or the bottom?", goto: "gradient_question_early" },
                { label: "I'll check the sensors for a fuller picture.", goto: "exit_neutral" }
              ]
            },
            gradient_question_early: {
              text: "The top and the bottom are close enough. It is a 20-centimeter bed. The difference would be... negligible.",
              options: [
                { label: "Negligible to you. Maybe not to the gorlroot.", goto: "early_insight" },
                { label: "I'll check the numbers.", goto: "exit_neutral" }
              ]
            },
            early_insight: {
              text: "...You think the gorlroot can detect a difference across 20 centimeters? That would be... a very precise organism.",
              options: [
                { label: "Gorlroot evolved on a planet with perfectly uniform gravity. It's calibrated to detect variations you'd call noise.", goto: "precision_discussion" },
                { label: "I need data to confirm. I'll check the sensors.", goto: "exit_neutral" }
              ]
            },
            precision_discussion: {
              text: "On Vress, the gravity field is uniform to eight decimal places. If the gorlroot is calibrated to that... and centrifugal force is not... then the gorlroot is not wrong. It is accurately detecting something we told it was not there.",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "Exactly. The gravity is 'right' on average but wrong in detail.", goto: "realization" },
                { label: "Let me confirm with the engineering data.", goto: "exit_friendly" }
              ]
            },
            first_offworld: {
              text: "Never. There was never a reason to. Vress grows gorlroot perfectly. This habitat was supposed to prove that orbital agriculture could match planetary yields. Instead it has proved that I do not understand my own crop as well as I thought.",
              options: [
                { label: "You understand the crop. The environment is the surprise.", goto: "exit_friendly" },
                { label: "I'll investigate.", goto: "exit_neutral" }
              ]
            },
            wrong_guess_soil: {
              text: "The soil. Yes. I have reformulated it three times. The mineral profile matches Vress surface regolith within 0.3%. If you think I missed something in the soil, you are wrong.",
              moodShift: -1,
              options: [
                { label: "You're right, sorry. What about the gravity?", goto: "gravity_question" },
                { label: "I'll investigate elsewhere.", goto: "exit_cold" }
              ]
            },
            wrong_guess_too_strong: {
              text: "Too strong? It is 2.1g. I measured it myself. That is exactly the surface gravity of Vress. Read the instruments before you guess.",
              moodShift: -1,
              options: [
                { label: "The magnitude might be right, but what about the direction?", goto: "gravity_nuance" },
                { label: "I'll check the sensors.", goto: "exit_cold" }
              ]
            },
            gravity_insight: {
              text: "A gradient? 2.09 at the top, 2.13 at the base? That is 0.04g across 20 centimeters. On Vress that difference does not exist. The planetary field is uniform. But centrifugal force... the radius changes. I should have seen this.",
              revealsClue: "GORLROOT_UPWARD",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "It's a small difference, but gorlroot can detect it.", goto: "realization" },
                { label: "That gradient confuses the gravitropism system.", goto: "realization" }
              ]
            },
            tradition_insight: {
              text: "Of course the tradition requires uniform gravity. On Vress, gravity IS uniform. No one writes 'water must be wet' \u2014 it is assumed. The tradition never accounts for this because this never existed before.",
              revealsClue: "GORLROOT_UPWARD",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "First time growing off a planet means first time hitting edge cases.", goto: "realization" },
                { label: "What does this tell you about the problem?", goto: "realization" }
              ]
            },
            tuber_insight: {
              text: "Toward the ring wall. Yes. That is... outward. Toward the greater radius. The tuber follows the stronger component of the gradient instead of the composite vector. The gravitropism system is trying to resolve a vector that changes with depth and it cannot.",
              revealsClue: "GORLROOT_UPWARD",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "The gradient is the problem, not the magnitude.", goto: "realization" },
                { label: "The tuber is more sensitive than the instruments.", goto: "realization" }
              ]
            },
            database_insight: {
              text: "The Concord has documentation on this? 'Biological systems calibrated to uniform fields can detect the inconsistency.' That is exactly what the gorlroot is doing. They knew this was possible and no one told me before I planted.",
              revealsClue: "GORLROOT_UPWARD",
              bonusInsight: true,
              moodShift: 2,
              options: [
                { label: "The fix is deeper radius or thinner beds.", goto: "solution" },
                { label: "At least now we know the cause.", goto: "realization" }
              ]
            },
            realization: {
              text: "So. The gravity is correct in magnitude. But centrifugal force is not planetary gravity. The vector changes with radius. Across 20 centimeters of soil, the 'down' is not the same at the top as at the bottom. And the gorlroot \u2014 calibrated to a uniform field over millions of years \u2014 detects the inconsistency and loses orientation.",
              options: [
                { label: "Deeper centrifuge arm would reduce the gradient.", goto: "solution" },
                { label: "Thinner growing beds would also help.", goto: "solution" },
                { label: "That's the diagnosis.", goto: "exit_friendly" }
              ]
            },
            solution: {
              text: "Deeper arm increases the radius, which shrinks the gradient proportionally. Thinner beds reduce the distance over which the gradient acts. Either way, the gorlroot experiences something closer to uniform. I can modify the bed depth immediately. The arm extension requires engineering work. Thank you, liaison. This was... competent.",
              moodShift: 1,
              options: [
                { label: "Good luck with the next crop.", goto: "exit_friendly" }
              ]
            },
            annoyed: {
              text: "The tubers grow upward. The gravity reads 2.1g. I have tried everything I can think of and nothing works. That is all I know. If you have evidence, show me. Otherwise, investigate on your own.",
              revealsClue: "GORLROOT_UPWARD",
              options: [
                { label: "What about the centrifuge engineering?", goto: "habitat_info" },
                { label: "I'll come back with data.", goto: "exit_cold" }
              ]
            },
            locked: {
              text: "We are done talking. The gorlroot grows wrong \u2014 up instead of down. The gravity is 2.1g. I cannot explain it and neither can you. Come back when you have a real answer.",
              revealsClue: "GORLROOT_UPWARD",
              endsConversation: true,
              exitLabel: "Walk away"
            },
            exit_friendly: {
              text: "Let me know what you find. I will be here \u2014 where else would I go?",
              moodShift: 1,
              endsConversation: true,
              exitLabel: "Thanks"
            },
            exit_neutral: {
              text: "Fine. Investigate.",
              endsConversation: true,
              exitLabel: "Head back"
            },
            exit_cold: {
              text: "Try not to waste my time next time.",
              endsConversation: true,
              exitLabel: "Leave"
            }
          }
        },

        sensors: {
          type: "terminal",
          speaker: "Centrifuge Sensor Array",
          nodes: {
            start: {
              text: "——— CENTRIFUGE SENSOR ARRAY ———\n> Ring Status: NOMINAL\n> RPM: 4.23 (stable \u00b10.001)\n> Temperature: 22.4\u00b0C\n> Humidity: 68%\n\n\nQuery available: [gravity] [atmosphere] [historical]",
              options: [
                { label: "[gravity] Run gravity profile", goto: "gravity_profile" },
                { label: "[atmosphere] Check atmosphere", goto: "atmosphere" },
                { label: "[historical] Review historical data", goto: "historical" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            gravity_profile: {
              text: "——— GRAVITY PROFILE ———\n> Measurement: SURFACE (top of bed)\n>  \u2192 2.09g\n> Measurement: BASE (bottom of bed)\n>  \u2192 2.13g\n> Measurement: MIDPOINT (calibration ref)\n>  \u2192 2.10g\n> Delta across soil depth (20cm): 0.04g\n\n> \u26a0 NOTE: Gradient is inherent to centrifugal\n> force \u2014 not an instrument error.\n",
              revealsClue: "GRAVITY_GRADIENT",
              options: [
                { label: "[cross-ref] What causes the gradient?", goto: "gradient_explanation" },
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            gradient_explanation: {
              text: "——— CENTRIFUGAL GRADIENT \u2014 REFERENCE ———\n> Centrifugal 'gravity' = \u03c9\u00b2r\n> where r = distance from rotation axis.\n\n> Soil bed occupies 20cm of radial depth.\n> At bed surface: r = 224.8m \u2192 2.09g\n> At bed base:    r = 225.0m \u2192 2.13g\n\n> On a planet: gravity is effectively uniform\n> across this distance (<0.000001g variation).\n> In a centrifuge: variation is 0.04g \u2014\n> ~40,000\u00d7 larger than planetary equivalent.\n",
              bonusInsight: true,
              options: [
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            atmosphere: {
              text: "——— ATMOSPHERE ———\n> O\u2082: 21.0% (nominal)\n> CO\u2082: 800 ppm (optimal for growth)\n> N\u2082: 78.2%\n> Trace gases: within Vressk agricultural spec\n> Pressure: 1.08 atm (Vressk standard)\n\n> STATUS: ALL NOMINAL\n",
              options: [
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            historical: {
              text: "——— HISTORICAL DATA ———\n> Crop 1 (day 0-45): Tuber misalignment day 12\n> Crop 2 (day 46-90): Soil reformulated. Same result day 10\n> Crop 3 (day 91-now): New seed stock. Misalignment day 11\n\n> Pattern: onset is consistent across all\n> variables tested. Problem is environmental,\n> not biological or nutritional.\n",
              options: [
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "> session terminated",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        },

        plants: {
          type: "examination",
          speaker: "Gorlroot Specimen",
          nodes: {
            start: {
              text: "The gorlroot specimen tray holds three plants at different growth stages. The tubers are visible \u2014 all three are pushing upward and outward rather than swelling beneath the soil surface.",
              options: [
                { label: "Examine the roots closely.", goto: "root_inspection" },
                { label: "Look at the tuber orientation.", goto: "tuber_orientation" },
                { label: "Compare with a Vressk reference image.", goto: "compare_reference" },
                { label: "[Step away]", goto: "exit_done" }
              ]
            },
            root_inspection: {
              text: "The root network is tangled and disorganized. Instead of the clean vertical architecture shown in Vressk references, the roots form tight spirals. They appear to be searching for a consistent 'down' signal and not finding one \u2014 like a compass needle in a shifting magnetic field.",
              revealsClue: "TUBERS_MISALIGNED",
              options: [
                { label: "Look at the tuber orientation.", goto: "tuber_orientation" },
                { label: "Compare with reference.", goto: "compare_reference" },
                { label: "[Step away]", goto: "exit_done" }
              ]
            },
            tuber_orientation: {
              text: "Each tuber is growing toward the outer wall of the centrifuge ring \u2014 not straight down into the soil, but at an angle. The angle isn't random: it tracks the radial direction away from the rotation axis. As if the tuber is following a gravity signal that points 'outward' rather than 'downward.' The heavier the tuber gets, the more it leans.",
              revealsClue: "TUBERS_MISALIGNED",
              bonusInsight: true,
              options: [
                { label: "The tuber is tracking the gradient, not the composite vector.", goto: "gradient_observation" },
                { label: "Examine the roots.", goto: "root_inspection" },
                { label: "[Step away]", goto: "exit_done" }
              ]
            },
            gradient_observation: {
              text: "The larger tubers lean more, because their mass samples a greater range of the gravity gradient. A small seedling sits within a few centimeters; a mature tuber spans 8\u201310cm of radial depth. The bigger it gets, the more gradient it experiences, the more confused its orientation becomes.",
              bonusInsight: true,
              options: [
                { label: "This confirms the gradient is the problem.", goto: "exit_done" },
                { label: "Compare with reference.", goto: "compare_reference" }
              ]
            },
            compare_reference: {
              text: "A Vressk agricultural reference shows the ideal gorlroot architecture: tubers perfectly round, swelling concentrically downward from the crown. Root networks perfectly vertical, extending straight down. Stems perfectly upright. Everything oriented along a single, consistent gravity vector \u2014 something that only exists on a planet.",
              options: [
                { label: "The reference assumes uniform gravity.", goto: "exit_done" },
                { label: "Examine the roots.", goto: "root_inspection" }
              ]
            },
            exit_done: {
              text: "[You return the specimen to the tray.]",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        },

        logs: {
          type: "archive",
          speaker: "Vressk Botanical Archive",
          nodes: {
            start: {
              text: "——— VRESSK BOTANICAL ARCHIVE ———\n> Search: [gorlroot] [centrifuge] [gravity] [cultivation]\n",
              options: [
                { label: "[gorlroot] Cultivation requirements", goto: "gorlroot_cultivation" },
                { label: "[centrifuge] Habitat specifications", goto: "centrifuge_specs" },
                { label: "[gravity] Gravitropism in Vressk agriculture", goto: "gravitropism" },
                { label: "[cultivation] Vressk agricultural tradition", goto: "tradition" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            gorlroot_cultivation: {
              text: "——— GORLROOT CULTIVATION STANDARD (Vressk) ———\n\nSoil: volcanic mineral base, pH 6.2-6.8\nGravity: 2.1g uniform field (planetary standard)\nTemperature: 18-24\u00b0C\nHumidity: 60-75%\nLight: Vress-standard grow spectrum (red-shifted)\n\n\u26a0 NOTE: All Vressk agricultural records assume planetary gravity. No entries reference artificial or centrifugal gravity environments. Gorlroot has never been cultivated off-world prior to this installation.",
              revealsClue: "GORLROOT_NEEDS_UNIFORM_G",
              options: [
                { label: "[gravity] How does gorlroot orient itself?", goto: "gravitropism" },
                { label: "[centrifuge] Check habitat specs", goto: "centrifuge_specs" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            gravitropism: {
              text: "——— GRAVITROPISM \u2014 GORLROOT ———\n\nGorlroot employs a high-precision gravitropic system evolved under the uniform 2.1g field of Vress. Statocyte density is approximately 14\u00d7 higher than equivalent Earth root-tip cells. The organism can resolve gravity vector direction to within \u00b10.001 degrees under uniform field conditions.\n\nThis precision is an evolutionary adaptation to Vress's dense, mineral-rich soil: accurate root orientation is critical for accessing deep mineral deposits. No Vressk crop has ever been tested outside a uniform gravity field.",
              revealsClue: "GORLROOT_NEEDS_UNIFORM_G",
              bonusInsight: true,
              options: [
                { label: "[gorlroot] Cultivation requirements", goto: "gorlroot_cultivation" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            centrifuge_specs: {
              text: "——— CENTRIFUGE HABITAT SPECS ———\n\nDesignation: Vressk Agricultural Ring, Kepler-442b Orbit\nRadius to soil bed midpoint: 224.9m\nRotation: 4.23 RPM\nNominal acceleration at midpoint: 2.10g\n\nDesigned by Concord Engineering Division.\nGravity specification: '2.1g \u00b10.05g at midpoint'\n\n\u26a0 Specification references midpoint only. No tolerance specified for gravity gradient across the radial depth of the soil bed.",
              options: [
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            tradition: {
              text: "——— VRESSK AGRICULTURAL TRADITION ———\n\nVressk agriculture is inseparable from Vressk engineering. On Vress, the soil is hostile \u2014 dense, mineral-rich, high-pressure. Growing anything requires precision: exact mineral ratios, exact irrigation timing, exact orientation of root channels. Improvisation is viewed not as creativity but as inadequate preparation.\n\nThe phrase 'heavy hands' refers to a careless cultivator \u2014 one who plants without measuring. It is a serious insult.",
              options: [
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "> archive closed",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        },

        database: {
          type: "archive",
          speaker: "Federation Database",
          nodes: {
            start: {
              text: "——— FEDERATION DATABASE ———\n> Concord Engineering & Xenobotany Records\n> Query: [centrifugal] [gravitropism] [precedents]\n",
              options: [
                { label: "[centrifugal] Centrifugal gravity gradient", goto: "centrifugal_gradient" },
                { label: "[gravitropism] Cross-species gravitropism data", goto: "gravitropism_data" },
                { label: "[precedents] Similar Concord cases", goto: "precedents" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            centrifugal_gradient: {
              text: "——— CONCORD ENGINEERING NOTE #4471 ———\n\nCentrifugal 'gravity' = \u03c9\u00b2r. Unlike planetary gravity (effectively uniform over agricultural scales), centrifugal force exhibits a RADIAL GRADIENT: acceleration increases with distance from the rotation axis.\n\nFor rotating habitats, the 'down' vector at the top of a soil bed differs measurably from the 'down' vector at the base. Biological systems calibrated to uniform planetary gravity fields may fail to resolve the inconsistent vector.\n\n\u26a0 ADVISORY: Species with high-precision gravitropic systems (Vressk, Telluvian root-analogues) should not be cultivated in centrifugal habitats without gradient mitigation.",
              revealsClue: "CENTRIFUGAL_GRADIENT_KNOWN",
              options: [
                { label: "[gravitropism] How do other species handle this?", goto: "gravitropism_data" },
                { label: "[precedents] Has this happened before?", goto: "precedents" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            gravitropism_data: {
              text: "——— GRAVITROPISM \u2014 CROSS-SPECIES COMPARISON ———\n\nEarth plants: Moderate precision. Detects \u00b10.5\u00b0 vector change. CENTRIFUGE-COMPATIBLE \u2014 gradient below detection threshold.\n\nVressk gorlroot: Ultra-high precision. 14\u00d7 statocyte density. Detects \u00b10.001\u00b0. NOT CENTRIFUGE-COMPATIBLE without mitigation.\n\nZhel'ii symbionts: Minimal gravitropism (chemical orientation). CENTRIFUGE-COMPATIBLE.\n\nRecommendation: For high-precision species, use \u2265500m radius or \u22645cm bed depth to keep gradient below biological detection threshold.",
              bonusInsight: true,
              options: [
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            precedents: {
              text: "——— SIMILAR CASES IN CONCORD RECORDS ———\n\nCase GC-1208: Telluvian root-vine in 80m centrifuge. Root misalignment identical to current case. Resolved by extending radius to 600m.\n\nCase GC-1445: Oolian kelp in 300m centrifuge. No misalignment (low gravitropic precision).\n\nConclusion: Gradient sensitivity is species-dependent. High-precision species fail in short-radius centrifuges. The problem is predictable and documented \u2014 but the advisory was not communicated to the Vressk habitat engineering team.",
              options: [
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "> query complete",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        }
      },

      clues: [
        {
          action: "crew",
          label: "Talk to Botanist",
          icon: "\ud83d\udc7d",
          speaker: "Vressk Botanist",
          sprites: {
            spritesheet:     "sprites/c2/vressk_botanist/spritesheet.png",
            spritesheetJson: "sprites/c2/vressk_botanist/spritesheet.json",
            actionIcon:      "portrait_species_vressk.png"
          },
          text: "[STUB] See dialogue tree.",
          clueTag: "GORLROOT_UPWARD",
          learned: "Gorlroot tubers are growing upward instead of swelling beneath the soil."
        },
        {
          action: "sensors",
          label: "Check Sensors",
          icon: "\ud83d\udcca",
          speaker: "Centrifuge Sensor Array",
          sprites: {
            portrait:   "portrait_sensors.png",
            actionIcon: "icon_sensors.png"
          },
          text: "[STUB] See sensor readout.",
          clueTag: "GRAVITY_GRADIENT",
          learned: "Centrifuge gravity varies across the soil bed: 2.09g at top, 2.13g at base."
        },
        {
          action: "plants",
          label: "Examine Gorlroot",
          icon: "\ud83c\udf31",
          speaker: "Gorlroot Specimen",
          sprites: {
            portrait:   "portrait_gorlroot.png",
            actionIcon: "icon_plants.png"
          },
          text: "[STUB] See examination.",
          clueTag: "TUBERS_MISALIGNED",
          learned: "Tubers are growing outward toward the ring wall, not downward into the soil."
        },
        {
          action: "logs",
          label: "Review Logs",
          icon: "\ud83d\udccb",
          speaker: "Vressk Botanical Archive",
          sprites: {
            portrait:   "portrait_logs.png",
            actionIcon: "icon_logs.png"
          },
          text: "[STUB] See archive.",
          clueTag: "GORLROOT_NEEDS_UNIFORM_G",
          learned: "Vressk tradition assumes uniform 2.1g. No guidance for centrifugal habitats."
        },
        {
          action: "database",
          label: "Federation Database",
          icon: "\ud83d\udef0\ufe0f",
          speaker: "Federation Database",
          sprites: {
            portrait:   "portrait_database.png",
            actionIcon: "icon_database.png"
          },
          text: "[STUB] See database entry.",
          clueTag: "CENTRIFUGAL_GRADIENT_KNOWN",
          learned: "Concord records: centrifugal gravity has a gradient; systems tuned to uniform fields can fail."
        }
      ],

      diagnoses: [
        {
          id: "gradient",
          label: "Centrifugal gravity isn't uniform — the vector changes across the soil bed depth, and gorlroot's gravitropism is tuned to a uniform planetary field.",
          isCorrect: true
        },
        {
          id: "too_strong",
          label: "The centrifuge is calibrated too strong — the gorlroot are experiencing more than 2.1g.",
          isCorrect: false,
          hint: "Sensor readings show the centrifuge is calibrated correctly on average. The issue isn't magnitude."
        },
        {
          id: "nutrients",
          label: "The soil nutrients don't match Vressk homeworld composition.",
          isCorrect: false,
          hint: "A Vressk botanist would have caught that immediately. The soil isn't the problem — the physical environment is."
        },
        {
          id: "soil_depth",
          label: "The soil bed is too shallow for gorlroot's root system.",
          isCorrect: false,
          hint: "Depth is a symptom, not a cause. Ask why the tubers are growing the wrong direction to begin with."
        }
      ],

      rankUpText: "Not all gravity is created equal. You just learned that the physics of a rotating habitat can fool instruments but not biology.",

      explanation: {
        title: "Centrifugal Gravity and the Gradient Problem",
        body: "On a planet, gravity pulls uniformly downward \u2014 a 20-centimeter-tall plant experiences the same gravitational vector at its roots as at its stem tip. This uniformity is so consistent that plants evolved exquisitely sensitive systems to detect it: statocytes filled with dense starch granules (statoliths) that settle under gravity, telling the root 'that way is down.'\n\nIn a centrifuge, 'gravity' is centrifugal force: \u03c9\u00b2r, where r is the distance from the rotation axis. Unlike planetary gravity, this force changes with radius. The top of a soil bed is closer to the axis than the bottom, so it experiences slightly less 'gravity' \u2014 and the 'down' vector at different depths points in slightly different directions.\n\nFor most Earth plants, this gradient is too small to detect. But gorlroot evolved on Vress, a 2.1g world where deep mineral deposits require roots to navigate dense soil with extreme precision. Vressk statocyte density is 14\u00d7 higher than Earth root cells. Gorlroot can detect gravitational vector changes of \u00b10.001 degrees \u2014 far below what any human instrument considers significant, but far above the gradient in a 225-meter centrifuge.\n\nThe solution is geometric: increase the centrifuge radius (which shrinks the gradient proportionally) or use thinner growing beds (which reduce the distance over which the gradient acts). NASA has studied this problem for O'Neill cylinder agriculture \u2014 the math is the same, just at a different scale.",
        funFact: "Gerard O'Neill's 1976 space colony designs specified a minimum rotation radius of 900 meters partly to keep the gravity gradient small enough for comfortable human habitation. Plants are even pickier \u2014 some proposals suggest 1,500+ meters for precision agriculture. The Vressk would appreciate O'Neill's thoroughness."
      },

      callHomeHints: {
        low: "Nova: 'Check everything. The sensors, the plants, the botanical records. The Vressk are precise \u2014 so is the answer.'",
        mid: "Nova: 'The numbers look right on paper. But the gorlroot isn't reading paper \u2014 it's reading physics. What does 2.1g actually mean in a centrifuge?'",
        full: "Nova: 'You have everything you need. The instruments say one thing. The biology says another. Which one is more sensitive?'"
      }
    },

    // ── CASE 2: Ares Botanical Garden ────────────────────────────
    // Design-doc codename: "The Missing Dance". Mirrors Campaign 1 Case 2
    // (pollination) with a buzz-pollination / obligate acoustic twist.
    // Home-species advantage: Telluvian (primary crew NPC).
    {
      id: "missing_dance",
      name: "Ares Botanical Garden",
      location: "Olympia District",
      subtitle: "Mars",
      palette: {
        bg:        "#180a06",
        bgMid:     "#2a110a",
        accent:    "#f97316",
        highlight: "#fed7aa",
        plant:     "#84cc16"
      },
      sprites: {
        scene: "sprites/c2/scene_ares_garden.png"
      },
      // Dust motes drift left-to-right through the dome interior (same effect
      // type as Campaign 1 Case 3 Mars hab). Mask constrains particles to the
      // dome air space.
      sceneFx: { type: 'dust', mask: 'sprites/c2/scene_ares_garden_mask.png' },
      briefing: "Nova: A diplomatic situation on Mars. The Telluvian embassy gifted a lyreflower to the Ares Botanical Garden \u2014 it bloomed beautifully for a month, then stopped. Buds form and abort before opening. The human curator has tried everything. The Telluvians are watching.\n\nZel'keth: 'There is a Telluvian researcher on-site. Miran-sel. They have been... quiet. I suspect they know something but cannot say it. Telluvian culture is organized around acoustic relationships they consider sacred. Asking directly may not work.'\n\nNova: 'So we have a diplomatic crisis, a dying flower, and a researcher who knows the answer but won't share it. Sounds like a Tuesday. Go easy on the cultural stuff \u2014 Zel'keth can brief you on the taboo.'",

      sources: {
        crew: {
          type: "conversation",
          speaker: "Researcher Miran-sel",
          personality: "stoic",
          startMood: 0,
          nodes: {
            start: {
              text: "Miran-sel's antennae lift slightly as you approach. Their voice is measured, careful. 'The lyreflower forms buds. The buds abort. The plant is healthy in all other respects. The human curator has been... thorough. I do not believe the problem is horticultural.'",
              options: [
                { label: "What do you think the problem is?", goto: "cultural_barrier" },
                { label: "Can you describe what the lyreflower needs?", goto: "what_it_needs" },
                { label: "What have the garden staff tried?", goto: "what_tried" },
                { label: "The garden is completely silent \u2014 no acoustic signal at all.", goto: "acoustic_insight", requires: { clueFound: "NO_ACOUSTIC_TRIGGER" } },
                { label: "The pollen is mature but physically trapped in the anther cone.", goto: "pollen_insight", requires: { clueFound: "POLLEN_RETAINED" } },
                { label: "Hand pollination was tried and failed. Contact isn't enough.", goto: "remediation_insight", requires: { clueFound: "HAND_POLLINATION_FAILED" } },
                { label: "Concord records describe an obligate acoustic pollination mechanism.", goto: "database_insight", requires: { clueFound: "BUZZ_POLLINATION_ACOUSTIC" } },
                { label: "Vel-aris. I know of the dance.", goto: "telluvian_greeting", requires: { playerSpecies: "telluvian" } },
                { label: "I've worked with species whose biology outsiders misunderstand.", goto: "alien_rapport", requires: { playerSpeciesNot: "human" } },
                { label: "Maybe the light cycle is wrong for Telluvian flowers.", goto: "wrong_guess_photoperiod" },
                { label: "I'll investigate the other sources first.", goto: "exit_neutral" }
              ]
            },
            telluvian_greeting: {
              text: "Miran-sel's antennae snap upright. For the first time, their posture relaxes. 'Vel-aris. You are of Telluv?' A long pause. 'Then I may speak of this. The lyreflower needs the dance. The lyre-moth's wingbeat \u2014 124 hertz \u2014 resonates with the anther cone and shakes the pollen free. Without that specific vibration, the pollen stays sealed. No moth, no dance, no pollen, no fruit.'",
              revealsClue: "LYREFLOWER_BUDS_ABORT",
              bonusInsight: true,
              moodShift: 1,
              setsFlag: "dance_revealed",
              options: [
                { label: "So we need to reproduce that vibration artificially.", goto: "solution" },
                { label: "Why can't you tell non-Telluvians about this?", goto: "taboo_explanation" },
                { label: "Thank you. I'll confirm with the other sources.", goto: "exit_friendly" }
              ]
            },
            alien_rapport: {
              text: "'Misunderstand.' Miran-sel's antennae dip \u2014 a Telluvian nod. 'Yes. That is the correct word. The humans here are kind and competent. They are also deaf to what the flower is asking for. I wish I could explain it to them, but the words... do not translate.'",
              options: [
                { label: "What is the flower asking for?", goto: "cultural_barrier" },
                { label: "I'll try to figure it out from the evidence.", goto: "exit_neutral" }
              ]
            },
            cultural_barrier: {
              text: "'There is a word in Telluvian. It describes the relationship between the lyreflower and its... partner. The relationship is acoustic. Sacred. We do not discuss it with outsiders \u2014 not from secrecy, but because the concept loses its meaning when spoken in another language. I am sorry. I cannot help you directly.'",
              revealsClue: "LYREFLOWER_BUDS_ABORT",
              setsFlag: "miran_mentioned_taboo",
              options: [
                { label: "Is there a way I could learn about it without you telling me?", goto: "indirect_hint" },
                { label: "What if I figure it out from other sources?", goto: "confirm_loophole" },
                { label: "I understand. I'll investigate.", goto: "exit_neutral" }
              ]
            },
            indirect_hint: {
              text: "A long silence. Miran-sel's antennae quiver. 'I cannot tell you what the flower needs. But I can tell you this: the garden is very quiet. On Telluv, it would not be. Listen to the silence and ask yourself what is missing.'",
              bonusInsight: true,
              options: [
                { label: "Something about sound. I'll check the sensor data.", goto: "exit_friendly" },
                { label: "I'll investigate.", goto: "exit_neutral" }
              ]
            },
            confirm_loophole: {
              text: "'If you arrive at the answer independently... through evidence, through logic... then I can confirm. I can say yes or no. I simply cannot be the one to tell you.' Their antennae settle. 'This is not stubbornness. It is how we are.'",
              options: [
                { label: "Fair enough. I'll find the evidence.", goto: "exit_friendly" },
                { label: "I'll be back.", goto: "exit_neutral" }
              ]
            },
            what_it_needs: {
              text: "'It needs...' A pause. Miran-sel's antennae fold flat \u2014 frustration held in check. 'It needs something that exists on Telluv and does not exist here. I am not permitted to say more. Please understand \u2014 this is a cultural constraint, not a personal choice.'",
              revealsClue: "LYREFLOWER_BUDS_ABORT",
              options: [
                { label: "Something from Telluv that Mars doesn't have.", goto: "cultural_barrier" },
                { label: "I'll check the other sources.", goto: "exit_neutral" }
              ]
            },
            what_tried: {
              text: "'The curator adjusted light, nutrients, humidity, soil chemistry. All correct. They attempted hand pollination \u2014 transferring pollen by brush. It did not work. They concluded that pollinator absence was not the issue.' Miran-sel pauses. 'Their conclusion was wrong, but I cannot explain why.'",
              options: [
                { label: "Why didn't hand pollination work?", goto: "hand_poll_discussion" },
                { label: "What did they miss?", goto: "cultural_barrier" },
                { label: "I'll check the records.", goto: "exit_neutral" }
              ]
            },
            hand_poll_discussion: {
              text: "'Pollen was placed on the stigma. Direct contact. On Earth, this is sufficient for many species. For the lyreflower... contact is not the mechanism. The pollen must be released from the anther first, and the anther does not open to touch.' They stop. 'I have said as much as I can.'",
              setsFlag: "miran_hinted_mechanism",
              options: [
                { label: "The anther doesn't open to touch. It opens to something else.", goto: "indirect_hint" },
                { label: "I'll examine the flower myself.", goto: "exit_neutral" }
              ]
            },
            wrong_guess_photoperiod: {
              text: "'The light cycle is adequate. The buds form correctly \u2014 that is the proof. Bud initiation is light-dependent. Pollen release is not. The failure occurs after the bud is fully formed. The photoperiod is not the issue.'",
              options: [
                { label: "So the problem is specifically at pollen release.", goto: "cultural_barrier" },
                { label: "I'll investigate further.", goto: "exit_neutral" }
              ]
            },
            acoustic_insight: {
              text: "Miran-sel's antennae lift sharply. 'You noticed. The garden is silent. 28 decibels of background noise and no periodic signal.' They choose their next words carefully. 'On Telluv, a garden is never silent. There is always... movement in the air.'",
              revealsClue: "LYREFLOWER_BUDS_ABORT",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "Movement in the air. Vibration. Sound.", goto: "vibration_discussion" },
                { label: "What kind of movement?", goto: "vibration_discussion" },
                { label: "I need more evidence.", goto: "exit_friendly" }
              ]
            },
            pollen_insight: {
              text: "'The pollen is mature and trapped. Yes. The anther cone is a sealed structure \u2014 poricidal, if you know the term. It has pores, but the pores do not open to contact. They open to...' Miran-sel stops. 'You are close. Very close. Check your other sources.'",
              revealsClue: "LYREFLOWER_BUDS_ABORT",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "Poricidal anthers that don't open to touch. What opens them?", goto: "vibration_discussion" },
                { label: "I'll check the database.", goto: "exit_friendly" }
              ]
            },
            remediation_insight: {
              text: "'Hand pollination failed because the pollen was never released. The curator applied pollen from a previously opened flower, but even direct stigma contact produced no fruit. The flower requires the release mechanism itself \u2014 not just the pollen. The act of release is part of the process.'",
              revealsClue: "LYREFLOWER_BUDS_ABORT",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "The release mechanism. What triggers it?", goto: "vibration_discussion" },
                { label: "I'll look for the trigger.", goto: "exit_friendly" }
              ]
            },
            vibration_discussion: {
              text: "Miran-sel is quiet for a long time. 'I will say this. On Earth, there are bees that shake flowers. Your word is... buzz pollination. The bee vibrates its body at a frequency that matches the flower. The flower opens. The pollen falls.' Their antennae tremble. 'I have not told you about the lyreflower. I have told you about Earth bees.'",
              bonusInsight: true,
              setsFlag: "miran_hinted_buzz",
              options: [
                { label: "And if the lyreflower works the same way...", goto: "almost_there" },
                { label: "Buzz pollination. I'll check the Concord database.", goto: "exit_friendly" }
              ]
            },
            almost_there: {
              text: "'I have told you about Earth bees. I have not told you about Telluvian moths. If you were to discover, through your own research, that a specific frequency of vibration triggers the lyreflower's anther... that would be something you learned. Not something I told you.'",
              options: [
                { label: "I understand. I'll confirm it in the database.", goto: "exit_friendly" },
                { label: "A specific frequency. Like a wingbeat.", goto: "realization" }
              ]
            },
            database_insight: {
              text: "Miran-sel closes their eyes. 'You found it. 124 hertz. The resonant frequency of the anther cone. The lyre-moth's wingbeat.' Their antennae unfold slowly. 'You arrived at this through evidence. I did not tell you. Therefore I can confirm: yes. That is what the flower needs. That is the dance.'",
              revealsClue: "LYREFLOWER_BUDS_ABORT",
              bonusInsight: true,
              moodShift: 2,
              setsFlag: "dance_revealed",
              options: [
                { label: "A piezoelectric vibrator tuned to 124 Hz would work.", goto: "solution" },
                { label: "Thank you for confirming.", goto: "exit_friendly" }
              ]
            },
            realization: {
              text: "'A wingbeat. Yes.' Miran-sel's antennae finally relax. 'The lyre-moth beats its wings at 124 hertz. The anther cone resonates. The pores open. The pollen falls onto the moth. The moth carries it to the next flower. On Telluv, this happens ten thousand times a day in every garden. Here... silence.'",
              revealsClue: "LYREFLOWER_BUDS_ABORT",
              setsFlag: "dance_revealed",
              options: [
                { label: "We can reproduce that vibration artificially.", goto: "solution" },
                { label: "Why couldn't you just tell me this?", goto: "taboo_explanation" }
              ]
            },
            taboo_explanation: {
              text: "'The dance is not information. It is a relationship. When I describe it in your language, it becomes a mechanism \u2014 a frequency, a function, a number. On Telluv, it is none of those things. It is how two species say they need each other. Translating it strips the meaning. That is why we do not speak of it to outsiders. Not because it is secret. Because it is sacred.'",
              options: [
                { label: "I understand. And I'll make sure the fix is respectful.", goto: "solution" },
                { label: "Thank you for explaining.", goto: "exit_friendly" }
              ]
            },
            solution: {
              text: "'A small piezoelectric vibrator, tuned to 124 hertz, placed near the anther cone during the bloom window. The flower will not know the difference. It is not...' Miran-sel pauses. '...elegant. But it will work. The lyreflower will bloom. The embassy will be satisfied. And perhaps one day, someone will bring lyre-moths to Mars, and the silence will end properly.'",
              moodShift: 1,
              options: [
                { label: "I'll include that recommendation in the report.", goto: "exit_friendly" }
              ]
            },
            annoyed: {
              text: "'The buds form. The buds abort. The anther does not open to touch. The garden is silent. I have told you everything I can tell you. Please \u2014 check the sensor data. Check the plant. Check the records. The answer is there.'",
              revealsClue: "LYREFLOWER_BUDS_ABORT",
              options: [
                { label: "I'll investigate.", goto: "exit_neutral" }
              ]
            },
            exit_friendly: {
              text: "Miran-sel's antennae dip \u2014 a Telluvian gesture of respect. 'I hope you find what you need. The lyreflower deserves better than silence.'",
              moodShift: 1,
              endsConversation: true,
              exitLabel: "Thanks"
            },
            exit_neutral: {
              text: "'I will be here.' Miran-sel returns to watching the lyreflower, antennae still.",
              endsConversation: true,
              exitLabel: "Head back"
            },
            exit_cold: {
              text: "Miran-sel says nothing. Their antennae fold flat.",
              endsConversation: true,
              exitLabel: "Leave"
            }
          }
        },

        sensors: {
          type: "terminal",
          speaker: "Garden Sensor Array",
          nodes: {
            start: {
              text: "\u2014\u2014\u2014 ARES BOTANICAL GARDEN \u2014 SENSOR ARRAY \u2014\u2014\u2014\n\n> Air temp: 22.1\u00b0C (nominal)\n> Humidity: 62% (nominal)\n> Light cycle: 14h/10h (Telluvian spec)\n> Soil pH: 6.8 (nominal)\n> Airflow: 0.0 m/s \u2014 sealed enclosure\n\nQuery available: [acoustic] [pollination] [atmosphere]",
              options: [
                { label: "[acoustic] Acoustic environment scan", goto: "acoustic_scan" },
                { label: "[pollination] Pollination conditions", goto: "pollination_data" },
                { label: "[atmosphere] Full atmospheric profile", goto: "atmosphere" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            acoustic_scan: {
              text: "\u2014\u2014\u2014 ACOUSTIC ENVIRONMENT \u2014\u2014\u2014\n\n> Ambient noise: 28 dB (HVAC hum only)\n> Periodic acoustic signals: NONE DETECTED\n> Frequency analysis (20\u2013200 Hz): flat \u2014 no peaks\n> Vibration at soil/pot level: below threshold\n\n\u26a0 NOTE: Telluvian gardens typically register periodic acoustic signals in the 100\u2013150 Hz range from endemic fauna. This garden registers none.",
              revealsClue: "NO_ACOUSTIC_TRIGGER",
              options: [
                { label: "[pollination] Check pollination data", goto: "pollination_data" },
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            pollination_data: {
              text: "\u2014\u2014\u2014 POLLINATION CONDITIONS \u2014\u2014\u2014\n\n> Pollinators present: NONE (sealed facility)\n> Airflow for wind pollination: NONE (0.0 m/s)\n> Hand pollination attempts: 3 (all failed)\n> Pollen viability: 98% (confirmed viable)\n> Stigma receptivity: confirmed receptive\n\n\u26a0 Pollen is viable and stigma is receptive, but no successful pollination event has occurred despite direct pollen-to-stigma transfer.",
              bonusInsight: true,
              options: [
                { label: "[acoustic] Check acoustic data", goto: "acoustic_scan" },
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            atmosphere: {
              text: "\u2014\u2014\u2014 ATMOSPHERIC PROFILE \u2014\u2014\u2014\n\n> O\u2082: 21.0%\n> CO\u2082: 420 ppm\n> N\u2082: 78.1%\n> Pressure: 1.01 atm\n> Trace volatiles: within Earth-normal\n\n> STATUS: ALL NOMINAL\n> No anomalous compounds detected.",
              options: [
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "> session terminated",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        },

        plants: {
          type: "examination",
          speaker: "Lyreflower Specimen",
          nodes: {
            start: {
              text: "The lyreflower is striking \u2014 a tall, slender stem topped with a violin-shaped bloom in pale violet. Several buds in various stages of development cluster along the stem. The newest buds are browning at the tips: aborted.",
              options: [
                { label: "Examine the anther cone.", goto: "anther_exam" },
                { label: "Look at an aborted bud.", goto: "aborted_bud" },
                { label: "Gently tap the flower.", goto: "tap_flower", isAction: true },
                { label: "[Step away]", goto: "exit_done" }
              ]
            },
            anther_exam: {
              text: "The central anther cone is a rigid, conical structure with tiny pores along its surface \u2014 poricidal anthers, like Earth tomatoes. The pores are sealed shut. Inside, you can see dense, golden pollen packed tightly. Mature, viable, and completely trapped. The cone does not release its pollen to gravity, wind, or gentle contact.",
              revealsClue: "POLLEN_RETAINED",
              options: [
                { label: "Try tapping it.", goto: "tap_flower", isAction: true },
                { label: "Examine an aborted bud.", goto: "aborted_bud" },
                { label: "[Step away]", goto: "exit_done" }
              ]
            },
            aborted_bud: {
              text: "The aborted bud dried and curled before opening fully. Dissecting it reveals a perfectly formed anther cone inside \u2014 packed with viable pollen that was never released. The flower built everything it needed to reproduce and then gave up waiting for a trigger that never came.",
              revealsClue: "POLLEN_RETAINED",
              bonusInsight: true,
              options: [
                { label: "It was waiting for something specific.", goto: "anther_exam" },
                { label: "[Step away]", goto: "exit_done" }
              ]
            },
            tap_flower: {
              text: "You tap the anther cone gently with a finger. Nothing happens. You tap harder. Still nothing. You flick it \u2014 the stem sways but the pores stay sealed. The anther is mechanically rigid and does not respond to direct physical contact. Whatever opens these pores, it isn't touch.",
              setsFlag: "tapped_flower",
              options: [
                { label: "Not touch. Something else.", goto: "anther_exam" },
                { label: "[Step away]", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "[You step back from the specimen bench.]",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        },

        logs: {
          type: "archive",
          speaker: "Garden Records",
          nodes: {
            start: {
              text: "\u2014\u2014\u2014 ARES BOTANICAL GARDEN \u2014 RECORDS \u2014\u2014\u2014\n\nSearch: [pollination] [lyreflower] [remediation] [telluvian]",
              options: [
                { label: "[pollination] Pollination attempts", goto: "pollination_log" },
                { label: "[lyreflower] Lyreflower care notes", goto: "care_notes" },
                { label: "[remediation] Remediation log", goto: "remediation" },
                { label: "[telluvian] Telluvian horticultural notes", goto: "telluvian_notes" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            pollination_log: {
              text: "\u2014\u2014\u2014 POLLINATION ATTEMPTS \u2014\u2014\u2014\n\nWeek 3: Hand-pollination trial #1. Pollen collected from open anther (rare occurrence), applied to stigma via fine brush. Result: no fruit set.\n\nWeek 4: Hand-pollination trial #2. Fresh pollen from same source, calibrated applicator. Result: no fruit set.\n\nWeek 5: Hand-pollination trial #3. Pollen viability confirmed at 98%. Direct stigma application. Result: no fruit set.\n\nConclusion: 'Pollinator absence is not the root cause. The pollination mechanism itself appears to require a step we are not performing.'",
              revealsClue: "HAND_POLLINATION_FAILED",
              options: [
                { label: "[remediation] Full remediation log", goto: "remediation" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            care_notes: {
              text: "\u2014\u2014\u2014 LYREFLOWER CARE NOTES \u2014\u2014\u2014\n\nSpecies: Telluvian lyreflower (diplomatic gift, Telluvian embassy)\nLight: 14h/10h cycle, full spectrum\nHumidity: 60\u201365%\nSoil: Telluvian mineral substrate (imported)\n\nMonth 1: Beautiful continuous bloom. Vigorous growth.\nMonth 2: Bud formation continues but buds abort before opening. No fruit set. Bloom rate declining.\nMonth 3: Current. No successful bloom since week 5.",
              options: [
                { label: "[pollination] Check pollination attempts", goto: "pollination_log" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            remediation: {
              text: "\u2014\u2014\u2014 REMEDIATION LOG \u2014\u2014\u2014\n\nAttempted: nutrient adjustment, light spectrum tuning, humidity increase, soil supplement, hand pollination (3\u00d7)\n\nResult: no improvement from any intervention\n\n\u26a0 Curator's note: 'Every horticultural variable has been optimized. The failure is not environmental in the traditional sense. Something else is required for pollen release that we have not identified. The Telluvian researcher declines to elaborate, citing cultural reasons.'",
              revealsClue: "HAND_POLLINATION_FAILED",
              bonusInsight: true,
              options: [
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            telluvian_notes: {
              text: "\u2014\u2014\u2014 TELLUVIAN HORTICULTURAL NOTES \u2014\u2014\u2014\n\nLimited documentation available. Telluvian horticultural practices are considered culturally sensitive and are not fully documented in Concord-accessible databases.\n\nAvailable note: 'Telluvian gardens are acoustic environments. The relationship between flora and fauna is mediated by sound. Further details restricted per Telluvian cultural protocol.'",
              options: [
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "> archive closed",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        },

        database: {
          type: "archive",
          speaker: "Federation Database",
          nodes: {
            start: {
              text: "\u2014\u2014\u2014 FEDERATION DATABASE \u2014\u2014\u2014\n> Concord Xenobotany & Acoustic Biology Records\n> Query: [buzz] [lyreflower] [acoustic] [pollination]",
              options: [
                { label: "[buzz] Buzz pollination mechanisms", goto: "buzz_pollination" },
                { label: "[lyreflower] Lyreflower species file", goto: "lyreflower_file" },
                { label: "[acoustic] Acoustic mutualism", goto: "acoustic_mutualism" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            buzz_pollination: {
              text: "\u2014\u2014\u2014 BUZZ POLLINATION \u2014 CROSS-SPECIES SURVEY \u2014\u2014\u2014\n\nBuzz pollination (sonication): pollen release triggered by vibration at a specific frequency. The pollinator vibrates its flight muscles or body at the resonant frequency of the anther structure, causing pores to open and pollen to eject.\n\nEarth examples: Bumblebees (Bombus) on tomatoes, potatoes, blueberries. Frequency range: 200\u2013400 Hz. Honeybees cannot buzz-pollinate.\n\nTelluvian example: Lyre-moth on lyreflower. Frequency: 124 Hz. Obligate \u2014 no alternative release mechanism exists.\n\n\u26a0 ADVISORY: Telluvian lyreflower CANNOT be pollinated by contact alone. Acoustic stimulus at 124 Hz is required for anther pore opening.",
              revealsClue: "BUZZ_POLLINATION_ACOUSTIC",
              options: [
                { label: "[lyreflower] Species details", goto: "lyreflower_file" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            lyreflower_file: {
              text: "\u2014\u2014\u2014 TELLUVIAN LYREFLOWER \u2014 SPECIES FILE \u2014\u2014\u2014\n\nPoricidal anther structure tuned to resonate at 124 Hz.\nPollinator: Telluvian lyre-moth (Chiroptera telluviae).\nMoth wingbeat frequency: 124 \u00b10.5 Hz.\n\nPollination mechanism: moth hovers near anther cone, wingbeat resonates cone structure, pores open, pollen ejects onto moth's ventral surface.\n\nWithout acoustic trigger: pollen remains sealed. Bud aborts after 72-hour wait period.\n\nRemediation: piezoelectric vibrator at 124 Hz, applied to anther cone during bloom window.",
              revealsClue: "BUZZ_POLLINATION_ACOUSTIC",
              bonusInsight: true,
              options: [
                { label: "[acoustic] Acoustic mutualism background", goto: "acoustic_mutualism" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            acoustic_mutualism: {
              text: "\u2014\u2014\u2014 ACOUSTIC MUTUALISM \u2014 CONCORD SURVEY \u2014\u2014\u2014\n\nMultiple Concord species exhibit obligate acoustic symbiosis \u2014 biological relationships mediated by specific sound frequencies rather than chemical or physical contact.\n\nTelluvian culture considers these relationships sacred and resists clinical documentation. Concord protocol respects this: technical details are recorded for agricultural emergencies only.\n\nNote: Earth parallel exists. Commercial greenhouses use mechanical vibrators ('electric bees') to pollinate tomato crops, replicating the bumblebee's sonication.",
              options: [
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "> query complete",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        }
      },

      clues: [
        {
          action: "crew",
          label: "Talk to Researcher",
          icon: "\ud83e\udd8b",
          speaker: "Researcher Miran-sel",
          sprites: {
            spritesheet:     "sprites/c2/miransel/spritesheet.png",
            spritesheetJson: "sprites/c2/miransel/spritesheet.json",
            pingPong:        true,
            actionIcon:      "portrait_species_telluvian.png"
          },
          text: "[STUB] See dialogue tree.",
          clueTag: "LYREFLOWER_BUDS_ABORT",
          learned: "Lyreflower buds form but abort before opening. The Telluvian researcher hints that 'the dance' is involved but won't explain."
        },
        {
          action: "sensors",
          label: "Check Sensors",
          icon: "\ud83d\udcca",
          speaker: "Garden Sensor Array",
          sprites: {
            portrait:   "portrait_sensors.png",
            actionIcon: "icon_sensors.png"
          },
          text: "[STUB] See sensor readout.",
          clueTag: "NO_ACOUSTIC_TRIGGER",
          learned: "Garden is sealed, silent. No airflow, no acoustic stimulus in the environment."
        },
        {
          action: "plants",
          label: "Examine Lyreflower",
          icon: "\ud83c\udf38",
          speaker: "Lyreflower Specimen",
          sprites: {
            portrait:   "portrait_lyreflower.png",
            actionIcon: "icon_plants.png"
          },
          text: "[STUB] See examination.",
          clueTag: "POLLEN_RETAINED",
          learned: "Anther cones are packed with mature pollen that was never released."
        },
        {
          action: "logs",
          label: "Review Logs",
          icon: "\ud83d\udccb",
          speaker: "Garden Records",
          sprites: {
            portrait:   "portrait_logs.png",
            actionIcon: "icon_logs.png"
          },
          text: "[STUB] See archive.",
          clueTag: "HAND_POLLINATION_FAILED",
          learned: "Hand-pollination trials were attempted and failed. Contact alone doesn't release the pollen."
        },
        {
          action: "database",
          label: "Federation Database",
          icon: "\ud83d\udef0\ufe0f",
          speaker: "Federation Database",
          sprites: {
            portrait:   "portrait_database.png",
            actionIcon: "icon_database.png"
          },
          text: "[STUB] See database entry.",
          clueTag: "BUZZ_POLLINATION_ACOUSTIC",
          learned: "Lyreflower requires an acoustic trigger (Telluvian moth wingbeat frequency) to release pollen — not just contact."
        }
      ],

      diagnoses: [
        {
          id: "acoustic",
          label: "The lyreflower requires acoustic stimulation at a specific frequency — Telluvian moth wingbeat resonance — to release pollen. Contact alone isn't enough; it needs vibration.",
          isCorrect: true
        },
        {
          id: "hand_pollinate",
          label: "Needs hand pollination — the pollinator species isn't on Mars, so staff must transfer pollen manually.",
          isCorrect: false,
          hint: "The garden already tried hand pollination. It didn't work. The mechanism for pollen release is more specific than contact."
        },
        {
          id: "wrong_photoperiod",
          label: "The photoperiod is wrong for Telluvian flowering cycles.",
          isCorrect: false,
          hint: "The buds are forming normally. The failure happens at pollen release, not at bud initiation."
        },
        {
          id: "nutrients",
          label: "Martian soil amendments are missing a trace element Telluvian plants need.",
          isCorrect: false,
          hint: "A nutrient deficiency would stunt the whole plant, not just the pollen release step. Ask what's different about Telluvian pollination mechanics."
        }
      ],

      rankUpText: "Contact isn't always enough. You just learned that some pollination requires vibration at a precise frequency \u2014 and that sometimes the hardest part of the diagnosis is respecting the culture that holds the answer.",

      explanation: {
        title: "Buzz Pollination: When Contact Isn't Enough",
        body: "Most people think pollination means 'pollen touches stigma.' For many plants, that's true. But some species evolved a lock on their anthers: poricidal anthers with sealed pores that only open when vibrated at a specific frequency. The pollinator doesn't just carry pollen \u2014 it shakes it loose.\n\nOn Earth, this is called 'buzz pollination' or sonication. Bumblebees do it naturally: they grab a flower and vibrate their flight muscles at 200\u2013400 Hz without moving their wings. The flower resonates, the pores open, the pollen falls. Honeybees cannot do this \u2014 which is why bumblebees are the only effective pollinators for tomatoes, blueberries, and many Solanum species.\n\nThe Telluvian lyreflower takes this further. Its anther cone is tuned to resonate at exactly 124 Hz \u2014 the wingbeat frequency of the lyre-moth. No moth, no vibration, no pollen, no reproduction. It's an obligate acoustic mutualism: two species that need each other's sound to survive.\n\nThe fix is mechanical: a piezoelectric vibrator tuned to 124 Hz, applied near the bloom. Commercial greenhouses on Earth already do this for tomatoes \u2014 they call the devices 'electric bees.'",
        funFact: "Before commercial greenhouses discovered mechanical vibrators, tomato growers in enclosed environments had almost zero fruit set. The breakthrough came in the 1980s when researchers realized honeybees couldn't pollinate tomatoes \u2014 only bumblebees could, because of their unique ability to sonicate. Today, global greenhouse tomato production depends on either imported bumblebee colonies or vibrating wands."
      },

      callHomeHints: {
        low: "Nova: 'The researcher knows something. Telluvian culture is complicated \u2014 check the garden logs and sensors for what she can't tell you directly.'",
        mid: "Nova: 'The garden is silent and the pollen won't come out. What's missing isn't a substance \u2014 it's a stimulus. What kind of stimulus?'",
        full: "Nova: 'You have the frequency, the mechanism, and the evidence. The flower is waiting for a sound that doesn't exist on Mars. Make your diagnosis.'"
      }
    },

    // ── CASE 3: Oolian Deep-Sea Mariculture Dome ─────────────────
    // Design-doc codename: "The Wrong Color of Light". Mirrors Campaign 1
    // Case 3 (light spectrum) but inverted — too much red, not enough
    // blue-green. Home-species advantage: Oolian.
    {
      id: "wrong_color_light",
      name: "Oolian Mariculture Dome",
      location: "Trench Shelf IV",
      subtitle: "Kepler-186f (Ocean)",
      palette: {
        bg:        "#020617",
        bgMid:     "#082f49",
        accent:    "#22d3ee",
        highlight: "#a5f3fc",
        plant:     "#14b8a6"
      },
      sprites: {
        scene: "sprites/c2/scene_oolian_dome.png"
      },
      // Bubbles rise upward through the kelp tanks (same effect type as
      // Campaign 1 Case 5 Europa bioreactor). Mask constrains particles to
      // the tank volumes.
      sceneFx: { type: 'bubbles', mask: 'sprites/c2/scene_oolian_dome_mask.png' },
      briefing: "Zel'keth: 'This one worries me. A new Oolian mariculture dome on Kepler-186f was built using Earth-manufactured grow lights to save on costs. The zhal-kelp is dying. The Oolians blame human equipment. The human suppliers insist their lights are top-grade. This is the first significant trade dispute since humans joined the Concord.'\n\nNova: 'Politics aside \u2014 the kelp is either getting what it needs or it isn't. Find out which, and the dispute resolves itself. The aquaculturist on-site is Tei-sal. Patient type. They'll work with you.'\n\nZel'keth: 'Be careful with the diplomatic angle. Both sides are watching your conclusion.'",

      sources: {
        crew: {
          type: "conversation",
          speaker: "Aquaculturist Tei-sal",
          personality: "patient",
          startMood: 0,
          nodes: {
            start: {
              text: "Tei-sal's bioluminescent flanks shift through muted greens as they turn toward you. Their voice is slow, deliberate \u2014 the cadence of someone accustomed to deep water. 'Welcome to Trench Shelf IV. You are here about the kelp. Good. It has been dying for six weeks and no one can agree on why.'",
              options: [
                { label: "What's happening with the zhal-kelp?", goto: "problem_main" },
                { label: "Tell me about the new lights.", goto: "new_lights" },
                { label: "Who do you think is at fault?", goto: "blame_question" },
                { label: "The sensor data shows the lights are 62% red.", goto: "spectrum_insight", requires: { clueFound: "LIGHT_SPECTRUM_RED_HEAVY" } },
                { label: "The kelp's pigments are tuned to blue-green, not red.", goto: "pigment_insight", requires: { clueFound: "PIGMENT_MISMATCH" } },
                { label: "Zhal-kelp evolved under deep-ocean light \u2014 blue-green only.", goto: "evolution_insight", requires: { clueFound: "KELP_EVOLVED_DEEP_OCEAN_LIGHT" } },
                { label: "Concord records say zhal-kelp uses chlorophyll c, not chlorophyll a.", goto: "database_insight", requires: { clueFound: "CHLOROPHYLL_C_BLUE_GREEN" } },
                { label: "Tei-sal, I am Oolian. I know zhal-kelp.", goto: "oolian_greeting", requires: { playerSpecies: "oolian" } },
                { label: "I've seen what happens when equipment doesn't match biology.", goto: "alien_rapport", requires: { playerSpeciesNot: "human" } },
                { label: "Maybe the lights are just defective.", goto: "wrong_guess_defective" },
                { label: "I'll look around first.", goto: "exit_neutral" }
              ]
            },
            oolian_greeting: {
              text: "Tei-sal's bioluminescent patches flare bright cyan \u2014 recognition. 'You are of the deep waters? Then I do not need to explain what zhal-kelp requires. You have seen the light of the trench. You know it is not this.' They gesture at the red-tinted glow overhead. 'The humans call this light. To the kelp, it is darkness with extra steps.'",
              revealsClue: "KELP_DYING_NEW_DOME",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "The light spectrum is wrong for deep-ocean photosynthesis.", goto: "realization" },
                { label: "I'll confirm with the sensor data.", goto: "exit_friendly" }
              ]
            },
            alien_rapport: {
              text: "'Equipment that does not match biology.' Tei-sal's flanks pulse a thoughtful blue. 'Yes. That is a precise way to say it. The humans built excellent lights. The lights are not broken. But they were built for the wrong biology.'",
              options: [
                { label: "What biology were they built for?", goto: "new_lights" },
                { label: "I'll check the specifications.", goto: "exit_neutral" }
              ]
            },
            problem_main: {
              text: "'The kelp was healthy in the old dome. Same water, same temperature, same salinity. The only change was the lights. The old dome used Oolian-manufactured fixtures tuned to our mariculture standard. This new dome uses Earth-manufactured lights \u2014 the Concord approved them as a cost-saving measure.' Tei-sal's patches dim. 'The kelp began yellowing within days.'",
              revealsClue: "KELP_DYING_NEW_DOME",
              setsFlag: "teisal_described_problem",
              options: [
                { label: "What's different about the Earth lights?", goto: "new_lights" },
                { label: "Could the water chemistry have changed?", goto: "wrong_guess_water" },
                { label: "Maybe the lights aren't bright enough.", goto: "wrong_guess_intensity" },
                { label: "I'll check the sensor data.", goto: "exit_neutral" }
              ]
            },
            new_lights: {
              text: "'The human lights are very bright. Very red. They are designed for land plants \u2014 crops that grow under a yellow sun in open air. Our kelp does not live under a yellow sun. It lives at the bottom of an ocean, where the only light that reaches is blue and green. The red never arrives.' A pause. 'On your world, this would be obvious. You do not put a desert lamp over a deep-sea creature.'",
              setsFlag: "teisal_described_lights",
              options: [
                { label: "So the kelp can't use red light?", goto: "cant_use_red" },
                { label: "What spectrum does zhal-kelp need?", goto: "kelp_needs" },
                { label: "I'll check the spectral data.", goto: "exit_neutral" }
              ]
            },
            cant_use_red: {
              text: "'It is not that the kelp cannot use any red light. Its light-harvesting system is simply optimized for the blue-green photons that dominate its native water. A red-heavy lamp delivers far less usable energy than its total brightness suggests. The kelp has chlorophyll a and c plus blue-green accessory pigments; red contributes, but inefficiently compared with the spectrum it evolved under.'",
              revealsClue: "KELP_DYING_NEW_DOME",
              bonusInsight: true,
              options: [
                { label: "So the lights are on, but the kelp is in the dark.", goto: "realization" },
                { label: "I need to verify the spectrum.", goto: "exit_friendly" }
              ]
            },
            kelp_needs: {
              text: "'Blue-green. 460 to 540 nanometers. That is the window of deep ocean light on Kepler-186f. Our Oolian fixtures emit precisely that range. The human fixtures...' Tei-sal's flanks flash a frustrated amber. '...emit red. Beautiful, warm, useless red.'",
              setsFlag: "teisal_described_spectrum",
              options: [
                { label: "What percentage of the Earth lights is usable?", goto: "usable_fraction" },
                { label: "I'll check the sensor data for exact numbers.", goto: "exit_neutral" }
              ]
            },
            usable_fraction: {
              text: "'I asked the dome sensors to measure. Less than five percent of the output falls in the range the kelp can absorb. Ninety-five percent of the light is wasted \u2014 photons the kelp cannot see. The dome is brightly lit to human eyes. To zhal-kelp eyes, it is nearly dark.'",
              revealsClue: "KELP_DYING_NEW_DOME",
              options: [
                { label: "So the total intensity is fine but the color is wrong.", goto: "realization" },
                { label: "I'll confirm with the spectral analysis.", goto: "exit_friendly" }
              ]
            },
            blame_question: {
              text: "'Who is at fault?' Tei-sal's patches cycle slowly. 'The humans built what they were asked to build \u2014 grow lights. The Concord approved the purchase without consulting Oolian mariculture standards. The Oolian delegation is angry, but the anger is misdirected. Nobody is at fault. The specification was incomplete.'",
              options: [
                { label: "What was missing from the specification?", goto: "new_lights" },
                { label: "I'll gather more evidence.", goto: "exit_neutral" }
              ]
            },
            wrong_guess_defective: {
              text: "'The lights are not defective. They function exactly as designed \u2014 bright, stable, efficient. They are excellent lights for growing tomatoes or lettuce on Earth. They are not designed for deep-ocean kelp that has never seen a red photon in its evolutionary history.'",
              moodShift: -1,
              options: [
                { label: "So the problem is the spectrum, not the equipment.", goto: "new_lights" },
                { label: "I'll check the specifications.", goto: "exit_neutral" }
              ]
            },
            wrong_guess_intensity: {
              text: "'The lights are bright. Very bright. Total photon flux exceeds our old Oolian fixtures by 30%. Intensity is not the problem.' Tei-sal's flanks dim. 'Imagine someone shining a powerful infrared lamp at you and asking why you cannot read a book by it. You have a very bright light. It is simply the wrong kind of light.'",
              moodShift: -1,
              options: [
                { label: "The wrong kind of light. What kind does the kelp need?", goto: "kelp_needs" },
                { label: "I'll check the spectral breakdown.", goto: "exit_neutral" }
              ]
            },
            wrong_guess_water: {
              text: "'The water is identical to the old dome. Same feed line, same filtration, same salinity. The kelp in the old dome \u2014 same species, same water \u2014 is thriving. The only variable that changed is the light source.'",
              moodShift: -1,
              options: [
                { label: "Same water, different lights. Tell me about the lights.", goto: "new_lights" },
                { label: "I'll investigate.", goto: "exit_neutral" }
              ]
            },
            spectrum_insight: {
              text: "'62% red.' Tei-sal's patches flash. 'There it is. Most of the output is concentrated where the kelp captures energy least efficiently. Another 18% is blue \u2014 partly useful. Less than 5% is in its strongest blue-green range. The dome is not literally dark, but its usable photon supply is far below what the total PAR number implies.'",
              revealsClue: "KELP_DYING_NEW_DOME",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "The fix is replacing the lights with a blue-green spectrum.", goto: "solution" },
                { label: "Why can't the kelp adapt to use the available light?", goto: "why_no_adapt" }
              ]
            },
            pigment_insight: {
              text: "'You examined the tissue? Good. The chloroplasts are healthy \u2014 the factory is intact. But the pigments in the factory are built to absorb blue-green, and the light coming in is red. It is like having a radio tuned to one frequency while the broadcast is on another. The equipment works. The signal does not match.'",
              revealsClue: "KELP_DYING_NEW_DOME",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "Different chlorophyll, different absorption peaks.", goto: "realization" },
                { label: "Can the kelp retune its pigments?", goto: "why_no_adapt" }
              ]
            },
            evolution_insight: {
              text: "'You found the depth records. Yes. Forty to one hundred twenty meters below the surface. At that depth, seawater has already absorbed all the red. Only blue and green penetrate. The kelp never needed red-absorbing pigments because red light never existed in its world.' Tei-sal's voice is gentle. 'Until we put it under these lamps.'",
              revealsClue: "KELP_DYING_NEW_DOME",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "And it can't evolve new pigments overnight.", goto: "realization" },
                { label: "So we need deep-ocean-spectrum lights.", goto: "solution" }
              ]
            },
            database_insight: {
              text: "'Chlorophyll c. Phycobiliproteins. Yes.' Tei-sal's patches glow a warm cyan. 'The Concord has this data. They knew. The specification for the dome lights should have included a spectral requirement, not just a brightness requirement. It was an oversight \u2014 not malice, not defect. An oversight that assumed all photosynthesis is the same.'",
              revealsClue: "KELP_DYING_NEW_DOME",
              bonusInsight: true,
              moodShift: 2,
              options: [
                { label: "The fix is straightforward. Replace or supplement with blue-green.", goto: "solution" },
                { label: "This should resolve the trade dispute too.", goto: "diplomatic_resolution" }
              ]
            },
            why_no_adapt: {
              text: "'Adapt?' A gentle amusement ripples through Tei-sal's bioluminescence. 'Photosynthetic pigment evolution takes millions of years. You are asking the kelp to reinvent its fundamental chemistry in six weeks because someone bought the wrong light bulb. The kelp is patient. It is not that patient.'",
              options: [
                { label: "Fair point. We need to match the light to the kelp.", goto: "solution" },
                { label: "I'll confirm with the database.", goto: "exit_friendly" }
              ]
            },
            realization: {
              text: "'So you see it now. The lights are not broken. The kelp is not broken. The specification was incomplete. Earth crop lights emphasize wavelengths suited to terrestrial plant pigments. Deep-water algae use different light-harvesting complexes, including chlorophyll c and accessory pigments that capture blue-green light efficiently. A spectrum optimized for one organism can be a poor energy match for another.'",
              options: [
                { label: "Replace the lights with blue-green spectrum fixtures.", goto: "solution" },
                { label: "This isn't anyone's fault \u2014 just different biology.", goto: "diplomatic_resolution" }
              ]
            },
            diplomatic_resolution: {
              text: "'No one is at fault. The humans built excellent lights for human crops. The Oolians assumed all grow lights would work for all crops. The Concord approved a specification that did not include spectral requirements. Everyone was competent and everyone was wrong, because no one asked: what color of light does this species actually see?'",
              options: [
                { label: "I'll include that in my report.", goto: "solution" }
              ]
            },
            solution: {
              text: "'Blue-green LED arrays, 460 to 540 nanometers. The old Oolian fixtures used exactly this range. We can either import Oolian replacements or retune the existing Earth fixtures \u2014 the hardware supports custom spectra, it was simply never configured for deep-ocean wavelengths.' Tei-sal's patches glow warm. 'Thank you, liaison. The kelp will recover within days once the light changes. It is very forgiving.'",
              moodShift: 1,
              options: [
                { label: "Glad I could help.", goto: "exit_friendly" }
              ]
            },
            annoyed: {
              text: "'The kelp is dying under red light that it cannot absorb. The old Oolian lights were blue-green and the kelp thrived. The new Earth lights are red and the kelp is starving. I have said this several times now. Please \u2014 check the sensor data. The numbers are very clear.'",
              revealsClue: "KELP_DYING_NEW_DOME",
              options: [
                { label: "You're right. I'll check the sensors.", goto: "exit_neutral" },
                { label: "I'm sorry. Can you explain the pigment issue again?", goto: "recovery" }
              ]
            },
            recovery: {
              text: "Tei-sal's patches shift back toward green. 'Of course. I am sorry for my frustration. The kelp has been dying for six weeks and every day is damage. The issue is simple: the kelp's photosynthetic pigments absorb blue-green light. The new lights emit red. Red passes through the kelp unused. The dome is bright but the kelp is starving.'",
              moodShift: 1,
              locksSource: false,
              options: [
                { label: "That's very clear. Thank you.", goto: "exit_friendly" },
                { label: "I'll check the spectral data.", goto: "exit_neutral" }
              ]
            },
            locked: {
              text: "'I have explained the light spectrum issue multiple times. The kelp needs blue-green light. It is receiving red. Please verify this with the sensor array and return when you are ready to discuss solutions.'",
              revealsClue: "KELP_DYING_NEW_DOME",
              endsConversation: true,
              exitLabel: "Step away"
            },
            exit_friendly: {
              text: "Tei-sal's patches glow a soft, warm blue. 'The kelp is patient. So am I. Take your time.'",
              moodShift: 1,
              endsConversation: true,
              exitLabel: "Thanks"
            },
            exit_neutral: {
              text: "'I will be by the tanks.' Tei-sal drifts back toward the kelp bed, patches dimming.",
              endsConversation: true,
              exitLabel: "Head back"
            },
            exit_cold: {
              text: "Tei-sal says nothing. Their patches go dark.",
              endsConversation: true,
              exitLabel: "Leave"
            }
          }
        },

        sensors: {
          type: "terminal",
          speaker: "Dome Sensor Array",
          nodes: {
            start: {
              text: "\u2014\u2014\u2014 OOLIAN MARICULTURE DOME \u2014 SENSOR ARRAY \u2014\u2014\u2014\n\n> Water temp: 4.2\u00b0C (nominal)\n> Salinity: 34.8 ppt (nominal)\n> Pressure: 12.4 atm (depth-equivalent)\n> Light source: Earth-Mfg GRO-9 array\n\nQuery available: [spectrum] [comparison] [water] [historical]",
              options: [
                { label: "[spectrum] Light spectral analysis", goto: "spectral_analysis" },
                { label: "[comparison] Compare to Oolian standard", goto: "comparison" },
                { label: "[water] Water chemistry", goto: "water_chem" },
                { label: "[historical] Growth timeline", goto: "historical" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            spectral_analysis: {
              text: "\u2014\u2014\u2014 LIGHT SPECTRAL ANALYSIS \u2014\u2014\u2014\n\n> Source: Earth-Mfg GRO-9 LED array\n> Total PAR: 280 \u00b5mol/m\u00b2/s (adequate)\n> Spectral breakdown:\n>   Red (620\u2013680nm):      62%\n>   Blue (440\u2013490nm):     18%\n>   Broad/white:          15%\n>   Blue-green (490\u2013560nm): <5%\n\n\u26a0 NOTE: Zhal-kelp primary absorption range is 460\u2013540nm (blue-green). Less than 5% of GRO-9 output falls in this range.",
              revealsClue: "LIGHT_SPECTRUM_RED_HEAVY",
              options: [
                { label: "[comparison] Compare to Oolian fixtures", goto: "comparison" },
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            comparison: {
              text: "\u2014\u2014\u2014 SPECTRAL COMPARISON \u2014\u2014\u2014\n\n> Oolian mariculture standard (OMS-4):\n>   Blue-green (460\u2013540nm): 78%\n>   Blue (440\u2013460nm):       12%\n>   Broad:                  10%\n>   Red:                    <1%\n\n> Earth GRO-9 (current):\n>   Red (620\u2013680nm):        62%\n>   Blue (440\u2013490nm):       18%\n>   Broad:                  15%\n>   Blue-green (490\u2013560nm): <5%\n\n\u26a0 Spectral overlap between GRO-9 and zhal-kelp absorption range: <5%. Effective PAR for kelp: ~14 \u00b5mol/m\u00b2/s (starvation level).",
              revealsClue: "LIGHT_SPECTRUM_RED_HEAVY",
              bonusInsight: true,
              options: [
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            water_chem: {
              text: "\u2014\u2014\u2014 WATER CHEMISTRY \u2014\u2014\u2014\n\n> Salinity: 34.8 ppt (nominal)\n> pH: 8.1 (nominal)\n> Dissolved O\u2082: 7.2 mg/L\n> Nutrients: within Oolian mariculture spec\n> Heavy metals: below detection\n\n> STATUS: ALL NOMINAL\n> Water chemistry is identical to the old dome (same feed line).",
              options: [
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            historical: {
              text: "\u2014\u2014\u2014 GROWTH TIMELINE \u2014\u2014\u2014\n\n> Week 0: Light installation (GRO-9 replaces OMS-4)\n> Week 1: Blade-tip yellowing detected\n> Week 2: Yellowing spreads to mid-blade\n> Week 3: Growth rate drops 60%\n> Week 6: Current. Growth rate at 15% of nominal.\n> Old dome (same water, OMS-4 lights): growth rate 100%.\n\n> Pattern: decline correlates exactly with light source change.",
              options: [
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "> session terminated",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        },

        plants: {
          type: "examination",
          speaker: "Zhal-Kelp Specimen",
          nodes: {
            start: {
              text: "A blade of zhal-kelp floats in a sample tank, illuminated by the dome's red-heavy grow lights. The tissue is pale \u2014 a washed-out teal instead of the deep blue-green of healthy kelp. The blade tips are yellowing.",
              options: [
                { label: "Examine the tissue under magnification.", goto: "magnification" },
                { label: "Compare the color to a healthy reference.", goto: "color_compare" },
                { label: "Check the blade tips.", goto: "blade_tips" },
                { label: "[Step away]", goto: "exit_done" }
              ]
            },
            magnification: {
              text: "Under magnification, the chloroplasts are present and structurally intact. But the pigment composition tells the story: the dominant pigments are phycobiliproteins and chlorophyll c \u2014 both tuned to absorb blue-green wavelengths. Under the red-heavy dome lights, these pigments sit idle. The photosynthetic machinery is intact but has nothing it can use.",
              revealsClue: "PIGMENT_MISMATCH",
              options: [
                { label: "The pigments are fine. The light is wrong.", goto: "color_compare" },
                { label: "[Step away]", goto: "exit_done" }
              ]
            },
            color_compare: {
              text: "A reference image shows healthy zhal-kelp: deep blue-green, almost iridescent, with thick blades and vigorous growth. The specimen in front of you is pale, translucent, and limp. The difference is stark. Same species, same water, same nutrients \u2014 different light.",
              revealsClue: "PIGMENT_MISMATCH",
              bonusInsight: true,
              options: [
                { label: "Examine under magnification.", goto: "magnification" },
                { label: "[Step away]", goto: "exit_done" }
              ]
            },
            blade_tips: {
              text: "The blade tips are yellowing and beginning to curl. This is photobleaching \u2014 but not from too much light. From too little usable light. The kelp is consuming its own pigment reserves because it cannot photosynthesize fast enough to replace them. It is starving in a brightly lit room.",
              options: [
                { label: "Starving under bright lights. The spectrum is wrong.", goto: "magnification" },
                { label: "[Step away]", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "[You return the blade to its holder.]",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        },

        logs: {
          type: "archive",
          speaker: "Oolian Aquaculture Records",
          nodes: {
            start: {
              text: "\u2014\u2014\u2014 OOLIAN AQUACULTURE RECORDS \u2014\u2014\u2014\n\nSearch: [zhalkelp] [habitat] [lights] [dispute]",
              options: [
                { label: "[zhalkelp] Zhal-kelp species profile", goto: "kelp_profile" },
                { label: "[habitat] Natural habitat conditions", goto: "habitat" },
                { label: "[lights] Light fixture specifications", goto: "light_specs" },
                { label: "[dispute] Trade dispute background", goto: "dispute" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            kelp_profile: {
              text: "\u2014\u2014\u2014 ZHAL-KELP SPECIES PROFILE \u2014\u2014\u2014\n\nNative to Kepler-186f deep ocean, 40\u2013120m depth.\nPrimary pigments: chlorophyll c, phycobiliproteins (phycoerythrin, phycocyanin).\nAbsorption peak: 460\u2013540nm (blue-green).\nRed absorption: negligible (<2% efficiency above 600nm).\n\nCultivated by Oolian mariculture guilds for >11,000 years. Foundation crop of Oolian civilization.\n\n\u26a0 Species has never been exposed to red-dominant light in evolutionary or agricultural history.",
              revealsClue: "KELP_EVOLVED_DEEP_OCEAN_LIGHT",
              options: [
                { label: "[habitat] Natural habitat", goto: "habitat" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            habitat: {
              text: "\u2014\u2014\u2014 NATURAL HABITAT \u2014 KEPLER-186F OCEAN \u2014\u2014\u2014\n\nDepth: 40\u2013120m below surface.\nAmbient light at depth: filtered through seawater.\nDominant wavelengths at 40m: 460\u2013540nm (blue to green).\nRed wavelengths (>600nm): fully attenuated in first 10m.\n\nSeawater acts as a natural blue-green bandpass filter. No organism below 15m has ever been exposed to significant red light.",
              revealsClue: "KELP_EVOLVED_DEEP_OCEAN_LIGHT",
              bonusInsight: true,
              options: [
                { label: "[lights] Check light specs", goto: "light_specs" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            light_specs: {
              text: "\u2014\u2014\u2014 LIGHT FIXTURE COMPARISON \u2014\u2014\u2014\n\nOLD (Oolian OMS-4): 78% blue-green, <1% red. Matched to zhal-kelp absorption.\nNEW (Earth GRO-9): 62% red, <5% blue-green. Optimized for terrestrial agriculture.\n\nConcord procurement note: 'GRO-9 approved as cost-effective replacement. Spectral requirements not specified in purchase order.'",
              options: [
                { label: "[dispute] Trade dispute details", goto: "dispute" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            dispute: {
              text: "\u2014\u2014\u2014 TRADE DISPUTE \u2014 BACKGROUND \u2014\u2014\u2014\n\nOolian delegation position: 'Human equipment is defective. Demand replacement at human expense.'\nHuman supplier position: 'GRO-9 meets all stated specifications. Equipment functions as designed.'\n\nConcord arbitration status: PENDING\n\nNote: Both parties are technically correct. The specification did not include a spectral requirement. The equipment meets the specification. The specification was inadequate for the application.",
              options: [
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "> archive closed",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        },

        database: {
          type: "archive",
          speaker: "Federation Database",
          nodes: {
            start: {
              text: "\u2014\u2014\u2014 FEDERATION DATABASE \u2014\u2014\u2014\n> Concord Xenobotany & Photobiology Records\n> Query: [chlorophyll] [spectrum] [mariculture] [precedents]",
              options: [
                { label: "[chlorophyll] Chlorophyll variants across species", goto: "chlorophyll_variants" },
                { label: "[spectrum] Photosynthetic action spectra", goto: "action_spectra" },
                { label: "[mariculture] Deep-ocean agriculture standards", goto: "mariculture_standards" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            chlorophyll_variants: {
              text: "\u2014\u2014\u2014 LIGHT-HARVESTING PIGMENTS \u2014 CONCORD SURVEY \u2014\u2014\u2014\n\nChlorophyll a + b (terrestrial plants,\nmost Earth crops):\n  Strong absorption in blue and red.\n  Common grow-light design: red-blue\n  emphasis with broader-spectrum fill.\n\nChlorophyll a + c with accessory pigments\n(brown algae, diatoms, Oolian analogues):\n  Strong blue-green light harvesting.\n  Red contribution: possible but less\n  efficient in this species.\n  Recommended zhal-kelp spectrum:\n  blue-green dominant with balanced fill.\n\n\u26a0 ADVISORY: Total photon flux alone is\nnot enough. Spectral requirements must\nbe specified for the actual organism.",
              revealsClue: "CHLOROPHYLL_C_BLUE_GREEN",
              options: [
                { label: "[spectrum] Action spectra details", goto: "action_spectra" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            action_spectra: {
              text: "\u2014\u2014\u2014 PHOTOSYNTHETIC ACTION SPECTRA \u2014\u2014\u2014\n\nAction spectrum = which wavelengths drive photosynthesis for a given organism.\n\nEarth lettuce (chlorophyll a+b): peaks at 440nm and 660nm. Red light is the primary driver.\n\nOolian zhal-kelp (chlorophyll c + phycobiliproteins): peak at 490\u2013530nm. Red light contributes <2% to photosynthetic output.\n\nKey insight: 'adequate PAR' (total photon flux) is meaningless without spectral context. A 280 \u00b5mol/m\u00b2/s red-dominated source delivers only ~14 \u00b5mol/m\u00b2/s of USABLE photons to zhal-kelp.",
              revealsClue: "CHLOROPHYLL_C_BLUE_GREEN",
              bonusInsight: true,
              options: [
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            mariculture_standards: {
              text: "\u2014\u2014\u2014 DEEP-OCEAN MARICULTURE \u2014 CONCORD STANDARDS \u2014\u2014\u2014\n\nOolian standard OMS-4: blue-green spectrum, 460\u2013540nm, designed for chlorophyll c organisms.\nEarth standard GRO-series: red-blue spectrum, designed for chlorophyll a+b organisms.\n\nConcord recommendation: 'Grow-light procurement for cross-species facilities MUST include species-specific spectral requirements. PAR alone is insufficient.'\n\nNote: This recommendation was adopted AFTER the current Oolian dome dispute. It did not exist when the GRO-9 fixtures were approved.",
              options: [
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "> query complete",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        }
      },

      clues: [
        {
          action: "crew",
          label: "Talk to Aquaculturist",
          icon: "\ud83d\udc19",
          speaker: "Aquaculturist Tei-sal",
          sprites: {
            spritesheet:     "sprites/c2/teisal/spritesheet.png",
            spritesheetJson: "sprites/c2/teisal/spritesheet.json",
            actionIcon:      "portrait_species_oolian.png"
          },
          text: "[STUB] See dialogue tree.",
          clueTag: "KELP_DYING_NEW_DOME",
          learned: "Zhal-kelp started dying when the new dome switched to Earth-manufactured grow lights."
        },
        {
          action: "sensors",
          label: "Check Sensors",
          icon: "\ud83d\udcca",
          speaker: "Dome Sensor Array",
          sprites: {
            portrait:   "portrait_sensors.png",
            actionIcon: "icon_sensors.png"
          },
          text: "[STUB] See sensor readout.",
          clueTag: "LIGHT_SPECTRUM_RED_HEAVY",
          learned: "Earth grow lights: 62% red, 18% blue, under 5% blue-green. Very red-heavy."
        },
        {
          action: "plants",
          label: "Examine Kelp",
          icon: "\ud83c\udf3f",
          speaker: "Zhal-Kelp Specimen",
          sprites: {
            portrait:   "portrait_zhalkelp.png",
            actionIcon: "icon_plants.png"
          },
          text: "[STUB] See examination.",
          clueTag: "PIGMENT_MISMATCH",
          learned: "Kelp pigments are tuned to blue-green absorption but the dome light is red-heavy."
        },
        {
          action: "logs",
          label: "Review Logs",
          icon: "\ud83d\udccb",
          speaker: "Oolian Aquaculture Records",
          sprites: {
            portrait:   "portrait_logs.png",
            actionIcon: "icon_logs.png"
          },
          text: "[STUB] See archive.",
          clueTag: "KELP_EVOLVED_DEEP_OCEAN_LIGHT",
          learned: "Zhal-kelp evolved under deep-ocean light: predominantly 460-540nm (blue-green). Red light doesn't reach kelp beds."
        },
        {
          action: "database",
          label: "Federation Database",
          icon: "\ud83d\udef0\ufe0f",
          speaker: "Federation Database",
          sprites: {
            portrait:   "portrait_database.png",
            actionIcon: "icon_database.png"
          },
          text: "[STUB] See database entry.",
          clueTag: "CHLOROPHYLL_C_BLUE_GREEN",
          learned: "Zhal-kelp uses a blue-green-optimized light-harvesting system. A red-heavy Earth crop spectrum provides much less usable energy than the total PAR reading suggests."
        }
      ],

      diagnoses: [
        {
          id: "wrong_spectrum",
          label: "The Earth grow lights are red-heavy and poorly matched to zhal-kelp's blue-green-optimized pigments. The dome is bright, but the kelp receives too few efficiently absorbed photons.",
          isCorrect: true
        },
        {
          id: "blame_humans",
          label: "The Earth-manufactured lights are defective. File a complaint with the supplier and replace them.",
          isCorrect: false,
          hint: "The lights work fine — for Earth plants. The problem isn't defects, it's biology. What does zhal-kelp actually need?"
        },
        {
          id: "light_too_dim",
          label: "The lights don't provide enough total intensity for deep-water photosynthesis.",
          isCorrect: false,
          hint: "Intensity isn't the issue. Total photon flux is adequate — but photons in the wrong wavelengths aren't usable."
        },
        {
          id: "water_chemistry",
          label: "The Oolian seawater chemistry has drifted out of range for kelp health.",
          isCorrect: false,
          hint: "Water chemistry reads nominal. And the old dome's kelp is fine on the same seawater. What changed was the light."
        }
      ],

      rankUpText: "Light is not just brightness \u2014 it's color. You just learned that two species can sit under the same lamp and one thrives while the other starves, because their photosynthetic pigments are tuned to completely different wavelengths.",

      explanation: {
        title: "Different Chlorophylls, Different Colors of Light",
        body: "Photosynthesis is not powered by one universal pigment recipe. Light-harvesting systems vary among organisms because they evolved under different spectra.\n\nTerrestrial crop plants use chlorophyll a and b and commonly absorb blue and red light strongly. Many grow lights therefore emphasize those regions, often with broader-spectrum light included as well.\n\nBrown algae and diatoms use chlorophyll a and c with accessory pigments such as fucoxanthin that expand strong light harvesting into the blue-green region. Water removes longer red wavelengths more rapidly than blue-green wavelengths, although the exact spectrum depends on depth, particles, and dissolved material. The fictional zhal-kelp is even more strongly adapted to the blue-green light of its native habitat.\n\nThe new dome delivered plenty of total photons, but most were concentrated in a region the kelp used inefficiently. The habitat was not literally dark; it was spectrally mismatched. This is why biological specifications must include spectrum, not merely total intensity.",
        funFact: "Brown algae such as giant kelp use chlorophyll a and c together with fucoxanthin, an accessory pigment that helps capture blue-green light. Kelp forests still occur in relatively shallow, sunlit coastal water because even well-adapted pigments cannot photosynthesize where too little light remains."
      },

      callHomeHints: {
        low: "Nova: 'The kelp was fine in the old dome. Something changed. Check the equipment records and sensor data \u2014 what's different between old and new?'",
        mid: "Nova: 'The lights are bright but the kelp is starving. Think about what kind of light the kelp actually absorbs. Not all photons are created equal.'",
        full: "Nova: 'You have the spectral data, the pigment analysis, and the evolutionary context. The lights are the wrong color for this species. Make the call.'"
      }
    },

    // ── CASE 4: Zhel'ii Diaspora Habitat ─────────────────────────
    // Design-doc codename: "The Silent Grove". Mirrors Campaign 1 Case 4
    // (photoperiod) + builds on Campaign 1 Case 6/6b (VOC signaling /
    // symbiosis). Includes the genesis pod callback. Home-species: Zhel'ii.
    {
      id: "silent_grove",
      name: "Zhel'ii Diaspora Grove",
      location: "Drift Vessel Thal-Oren",
      subtitle: "Inter-system Transit",
      palette: {
        bg:        "#0c0a18",
        bgMid:     "#1e1b4b",
        accent:    "#a78bfa",
        highlight: "#e9d5ff",
        plant:     "#4ade80"
      },
      sprites: {
        scene: "sprites/c2/scene_zhelii_grove.png"
      },
      // Starfield window rect — twinkle (static stars with pulsing alpha).
      // Top-left (65, 10), bottom-right (175, 50). Ceiling viewport aesthetic.
      sceneWindow: { x: 65, y: 10, w: 110, h: 40, twinkle: true },
      briefing: "Zel'keth: 'This case is personal to me. The genesis pod \u2014 the one from the Zhel'ora crisis \u2014 thrived in human care and produced offspring. Several descendants were gifted back to a Zhel'ii diaspora ship, the Thal-Oren. For two years, the grove sang. Now it is silent. The caretakers have done everything correctly and I do not understand why the network has stopped.'\n\nNova: 'Zel'keth, you're too close to this one. Let the liaison investigate without your emotional gravity bending the evidence.'\n\nZel'keth: '...You are right. But please \u2014 the grove is a descendant of something I helped bring into the world. Be thorough.'",

      sources: {
        crew: {
          type: "conversation",
          speaker: "Caretaker Vess-lor",
          personality: "curious",
          startMood: 0,
          nodes: {
            start: {
              text: "Vess-lor's chromatophores ripple through muted lavender and grey \u2014 worry expressed in color. 'You are the Federation liaison? Good. The grove was singing for two years. Beautiful harmonics through the network. Then it stopped. We have checked everything. The atmosphere is perfect. The chemical balance is precise. Nothing is wrong, and yet \u2014 nothing is working.'",
              options: [
                { label: "When did the grove go silent?", goto: "timeline" },
                { label: "Tell me about the grove's signaling.", goto: "signaling_explained" },
                { label: "What have you changed recently?", goto: "what_changed" },
                { label: "The sensors show the lights are on 24 hours a day.", goto: "light_insight", requires: { clueFound: "CONTINUOUS_LIGHT_24H" } },
                { label: "The network's signaling compounds are absent \u2014 not suppressed, absent.", goto: "compound_insight", requires: { clueFound: "SIGNALING_COMPOUNDS_ABSENT" } },
                { label: "Your logs show you switched from 18/6 to 24/0 light about 90 days ago.", goto: "schedule_insight", requires: { clueFound: "LIGHT_SCHEDULE_CHANGED" } },
                { label: "Concord records say network signaling is circadian-linked. It needs darkness.", goto: "database_insight", requires: { clueFound: "CIRCADIAN_SIGNALING_NEEDS_DARK" } },
                { label: "Vess-lor. I am Zhel'ii. I know what the grove means.", goto: "zhelii_greeting", requires: { playerSpecies: "zhelii" } },
                { label: "I've seen network organisms before. In the Zhel'ora case.", goto: "alien_rapport", requires: { playerSpeciesNot: "human" } },
                { label: "Maybe the atmospheric filtering is off.", goto: "wrong_guess_atmosphere" },
                { label: "I'll look around first.", goto: "exit_neutral" }
              ]
            },
            zhelii_greeting: {
              text: "Vess-lor's chromatophores bloom warm violet \u2014 kinship. 'You are of the Zhel'ii? Then you understand. The grove is not a garden. It is a conversation between three organisms that have spoken to each other for generations. And now the conversation has stopped. Not because they are angry or sick. Because something in their rhythm has been disrupted.'",
              revealsClue: "NETWORK_FALLEN_SILENT",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "A rhythm disruption. What controls their rhythm?", goto: "rhythm_discussion" },
                { label: "I'll check the sensor data for environmental changes.", goto: "exit_friendly" }
              ]
            },
            alien_rapport: {
              text: "'The Zhel'ora case? You were involved?' Vess-lor's colors brighten with interest. 'Then you know what the network does \u2014 the volatile compounds, the chemical coordination. This is a descendant of that same organism. And it has gone quiet for reasons we cannot identify.'",
              options: [
                { label: "Tell me about the signaling.", goto: "signaling_explained" },
                { label: "I'll investigate.", goto: "exit_neutral" }
              ]
            },
            timeline: {
              text: "'Approximately 90 days ago. The signaling output dropped over the course of a week \u2014 not sudden, not traumatic. A gradual fade, as if the network was... winding down. By day ten, complete silence. We have monitored every environmental variable. Nothing correlates.' Vess-lor's mantle fins ripple with curiosity. 'What could cause a gradual fade rather than a sudden stop?'",
              revealsClue: "NETWORK_FALLEN_SILENT",
              setsFlag: "vesslor_described_timeline",
              options: [
                { label: "A gradual fade suggests a rhythmic process losing its entrainment.", goto: "rhythm_discussion" },
                { label: "What changed around that time?", goto: "what_changed" },
                { label: "I'll check the logs for changes 90 days ago.", goto: "exit_neutral" }
              ]
            },
            signaling_explained: {
              text: "'The three-who-are-one communicate through volatile compounds released into the air. The vine produces, the fungal mat receives, the fern-analogue modulates. Together they form a network \u2014 a chemical conversation that coordinates growth, defense, reproduction. Without signaling, each component is alive but isolated. Like three people in separate rooms who have forgotten how to speak.'",
              revealsClue: "NETWORK_FALLEN_SILENT",
              setsFlag: "vesslor_explained_signaling",
              options: [
                { label: "When does the network normally signal?", goto: "when_signal" },
                { label: "Could something be absorbing or filtering the compounds?", goto: "filtering_question" },
                { label: "I'll examine the grove directly.", goto: "exit_neutral" }
              ]
            },
            when_signal: {
              text: "Vess-lor pauses, chromatophores shifting thoughtfully. 'On Zhel'ora, signaling peaks during the dark hours. The compounds accumulate when the metabolic load is lowest \u2014 at night, when the photosynthetic machinery rests. During the day, the plant is too busy growing to signal.' They look at you. 'Is that relevant?'",
              bonusInsight: true,
              setsFlag: "vesslor_mentioned_dark_hours",
              options: [
                { label: "Very relevant. When does the dark period happen on this ship?", goto: "dark_period_question" },
                { label: "Signaling peaks in darkness. What if there is no darkness?", goto: "no_dark_realization" },
                { label: "I need to check the light schedule.", goto: "exit_neutral" }
              ]
            },
            dark_period_question: {
              text: "Vess-lor blinks. Their chromatophores flicker \u2014 the Zhel'ii equivalent of a frown. 'The dark period? We... the lights are always on. We increased them to full 24-hour illumination about three months ago, during a power fluctuation. We thought more light would help the grove recover from the stress. Was that... wrong?'",
              revealsClue: "NETWORK_FALLEN_SILENT",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "The grove doesn't need more light. It needs darkness.", goto: "realization" },
                { label: "I need to confirm this with the sensor data.", goto: "exit_friendly" }
              ]
            },
            no_dark_realization: {
              text: "Vess-lor's chromatophores go completely still \u2014 a Zhel'ii expression of sudden understanding. 'If signaling happens during the dark period... and there is no dark period... then signaling never happens. We silenced the grove by being kind. We gave it constant light and took away its voice.'",
              revealsClue: "NETWORK_FALLEN_SILENT",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "Exactly. The circadian rhythm needs darkness to reset.", goto: "realization" },
                { label: "The fix is simple \u2014 restore the dark period.", goto: "solution" }
              ]
            },
            what_changed: {
              text: "'Changed? Nothing has changed. The atmosphere is the same. The water is the same. The nutrients are...' Vess-lor pauses. 'We did increase the light duration. Three months ago there was a power fluctuation and the grove showed stress. We set the lights to maximum \u2014 24 hours, full intensity. To help it recover. The stress resolved but then the silence began.'",
              revealsClue: "NETWORK_FALLEN_SILENT",
              setsFlag: "vesslor_mentioned_light_change",
              options: [
                { label: "You changed the light from 18/6 to 24/0?", goto: "light_change_detail" },
                { label: "When exactly did the silence start relative to the light change?", goto: "correlation" },
                { label: "I'll check the logs.", goto: "exit_neutral" }
              ]
            },
            light_change_detail: {
              text: "'Yes. 18 hours on, 6 hours off \u2014 that was the original schedule. We changed to 24 on, 0 off. More light, more energy, better recovery. That was the reasoning.' Vess-lor's mantle fins curl inward. 'You are going to tell me the reasoning was wrong, aren't you.'",
              options: [
                { label: "The grove needed those 6 hours of darkness.", goto: "rhythm_discussion" },
                { label: "I want to check the timing against the sensor data first.", goto: "exit_neutral" }
              ]
            },
            correlation: {
              text: "'The silence began... roughly a week after the light change. We did not connect the two events. More light should mean more growth. How could light cause silence?' Vess-lor looks at you with genuine curiosity. 'Unless the signaling is not about energy at all.'",
              bonusInsight: true,
              options: [
                { label: "It's about rhythm. The signaling is clock-dependent, not energy-dependent.", goto: "realization" },
                { label: "I'll confirm with the database.", goto: "exit_friendly" }
              ]
            },
            rhythm_discussion: {
              text: "'A rhythm.' Vess-lor's chromatophores cycle slowly \u2014 processing. 'On Zhel'ora, there is day and night. The grove signals during the night. If we have removed the night entirely...' Their colors shift to a pale, dawning understanding. 'The internal clock has nothing to synchronize to. It thinks it is always midday. And midday is when signaling is lowest.'",
              bonusInsight: true,
              options: [
                { label: "Exactly. The clock needs periodic darkness to reset.", goto: "realization" },
                { label: "The fix is to restore the dark period.", goto: "solution" }
              ]
            },
            filtering_question: {
              text: "'We considered that first \u2014 after the Zhel'ora case, atmospheric filtering was our first thought. But the chemical scrubbers are set to Zhel'ii standard. We test the atmospheric composition every hour. The compounds are not being removed. They are simply not being produced.'",
              options: [
                { label: "Not removed \u2014 not produced. Something is suppressing production.", goto: "when_signal" },
                { label: "I'll examine the grove.", goto: "exit_neutral" }
              ]
            },
            wrong_guess_atmosphere: {
              text: "'The atmosphere is nominal. We check it hourly. The chemical scrubbers are calibrated to Zhel'ii specifications \u2014 we learned from the Zhel'ora incident. No compounds are being filtered that should not be.' Vess-lor's curiosity is undimmed. 'The problem is not that the voice is being lost. The problem is that the voice is never spoken.'",
              moodShift: -1,
              options: [
                { label: "Never spoken. What controls when the grove speaks?", goto: "when_signal" },
                { label: "I'll investigate further.", goto: "exit_neutral" }
              ]
            },
            light_insight: {
              text: "'24 hours a day. Yes. We thought maximum light would give maximum energy. But you are suggesting...' Vess-lor's colors shift rapidly. 'On Zhel'ora, the day is 19 hours. The night is 7. The grove has never experienced perpetual day. What happens to a clock that is never allowed to tick?'",
              revealsClue: "NETWORK_FALLEN_SILENT",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "It stops. And the signaling stops with it.", goto: "realization" },
                { label: "The clock needs night to reset. No night, no reset.", goto: "realization" }
              ]
            },
            compound_insight: {
              text: "'Absent. Not suppressed \u2014 absent.' Vess-lor's mantle fins extend fully, a gesture of intense focus. 'The biosynthetic pathway is simply not running. The machinery is intact but idle. As if the trigger that starts production each cycle... never fires.' They look at the lights overhead. 'What is the trigger?'",
              revealsClue: "NETWORK_FALLEN_SILENT",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "The trigger is darkness. The onset of the dark period.", goto: "realization" },
                { label: "I think it's tied to the light cycle.", goto: "rhythm_discussion" }
              ]
            },
            schedule_insight: {
              text: "Vess-lor goes very still. 'We changed the lights 90 days ago. The silence began approximately 90 days ago. I...' Their chromatophores cycle through embarrassment \u2014 a rare, vivid display. 'We did this. We silenced our own grove. With kindness. With light.'",
              revealsClue: "NETWORK_FALLEN_SILENT",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "It's not your fault. No one told you the signaling was circadian.", goto: "realization" },
                { label: "The fix is simple \u2014 restore the 18/6 schedule.", goto: "solution" }
              ]
            },
            database_insight: {
              text: "'Circadian-linked.' Vess-lor's colors shift to deep violet \u2014 reverence mixed with regret. 'The network speaks during the dark period. We removed the dark period. Therefore the network cannot speak. It is so simple. So obvious in retrospect. We gave the grove everything except the one thing it needed most: permission to rest.'",
              revealsClue: "NETWORK_FALLEN_SILENT",
              bonusInsight: true,
              moodShift: 2,
              options: [
                { label: "Restore the dark period and the grove will sing again.", goto: "solution" },
                { label: "The signaling should resume within a day or two.", goto: "solution" }
              ]
            },
            realization: {
              text: "'The signaling is circadian. It requires periodic darkness \u2014 not as rest, but as a trigger. The onset of darkness tells the network: now is the time to speak. Without that trigger, the internal clock drifts to a permanent midday state where signaling is at its lowest. And it stays there. Forever. Until someone turns off the lights.'",
              options: [
                { label: "Exactly. Install programmable shading for a 6-hour dark period.", goto: "solution" },
                { label: "The grove is alive and intact. It just needs night.", goto: "solution" }
              ]
            },
            solution: {
              text: "Vess-lor's chromatophores bloom into brilliant, cascading color \u2014 relief, gratitude, wonder. 'We will install the shading today. Six hours of darkness every cycle. The grove will have its night.' A pause. 'This organism crossed the space between stars. It survived the Zhel'ora crisis. It grew in human care. And we nearly lost it because we forgot that even a voice needs silence to prepare the next word.'",
              moodShift: 1,
              options: [
                { label: "The grove will sing again.", goto: "exit_friendly" }
              ]
            },
            annoyed: {
              text: "'The grove is silent. The lights are on constantly. The signaling compounds are not being produced. The caretaker logs show the light schedule changed 90 days ago. I have given you every piece of this puzzle. Please \u2014 what does your evidence tell you?' Vess-lor's curiosity has edges now.",
              revealsClue: "NETWORK_FALLEN_SILENT",
              options: [
                { label: "The constant light suppresses the signaling rhythm.", goto: "realization" },
                { label: "I need to check more sources.", goto: "exit_neutral" }
              ]
            },
            exit_friendly: {
              text: "Vess-lor's colors settle into a warm, contented violet. 'Thank you, liaison. You have given the grove its voice back. Zel'keth will be pleased \u2014 this descendant means a great deal to them.'",
              moodShift: 1,
              endsConversation: true,
              exitLabel: "Thanks"
            },
            exit_neutral: {
              text: "'Investigate freely. I will be with the grove \u2014 hoping.' Vess-lor's colors dim to a patient grey.",
              endsConversation: true,
              exitLabel: "Head back"
            },
            exit_cold: {
              text: "Vess-lor says nothing. Their chromatophores darken.",
              endsConversation: true,
              exitLabel: "Leave"
            }
          }
        },

        sensors: {
          type: "terminal",
          speaker: "Grove Sensor Array",
          nodes: {
            start: {
              text: "\u2014\u2014\u2014 GROVE SENSOR ARRAY \u2014 THAL-OREN \u2014\u2014\u2014\n\n> Atmosphere: composition nominal, filtering active\n> Chemical scrubbers: within Zhel'ii target range\n> Temperature: 24.1\u00b0C (nominal)\n> Humidity: 88% (nominal)\n\nQuery available: [light] [voc] [atmosphere] [timeline]",
              options: [
                { label: "[light] Light schedule and intensity", goto: "light_data" },
                { label: "[voc] VOC signaling output", goto: "voc_data" },
                { label: "[atmosphere] Full atmospheric profile", goto: "atmosphere" },
                { label: "[timeline] Environmental change log", goto: "timeline" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            light_data: {
              text: "\u2014\u2014\u2014 LIGHT SCHEDULE \u2014\u2014\u2014\n\n> Current schedule: 24.0h on / 0.0h off\n> Intensity: 100% (grow-spectrum, Zhel'ii standard)\n> Dark period: NONE\n> Previous schedule (prior to day -90): 18.0h on / 6.0h off\n\n\u26a0 NOTE: Schedule was changed from 18/6 to 24/0 approximately 90 days ago following a power fluctuation event. Change was made by caretaker team to 'maximize recovery energy.'",
              revealsClue: "CONTINUOUS_LIGHT_24H",
              options: [
                { label: "[voc] Check signaling output", goto: "voc_data" },
                { label: "[timeline] When did the silence start?", goto: "timeline" },
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            voc_data: {
              text: "\u2014\u2014\u2014 VOC SIGNALING OUTPUT \u2014\u2014\u2014\n\n> Network VOC production (24h trailing): 0.0 ppb\n> Network VOC production (week trailing): 0.0 ppb\n> Last detected signal: 87 days ago\n> Expected baseline (healthy network): 40\u201380 ppb cycling\n\n\u26a0 CRITICAL: No volatile organic signaling compounds detected in 87 days. Network is functionally silent.\n\nHistorical note: Under the previous 18/6 schedule, VOC output peaked during the dark period (hours 19\u201324) and dropped to near-zero during peak daylight (hours 6\u201312).",
              revealsClue: "CONTINUOUS_LIGHT_24H",
              bonusInsight: true,
              options: [
                { label: "[light] Check light schedule", goto: "light_data" },
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            atmosphere: {
              text: "\u2014\u2014\u2014 ATMOSPHERIC PROFILE \u2014\u2014\u2014\n\n> O\u2082: 22.4% (Zhel'ii standard)\n> CO\u2082: 1200 ppm (optimal for grove photosynthesis)\n> N\u2082: 76.8%\n> Chemical scrubber status: ACTIVE, within Zhel'ii target\n> VOC filtration: SET TO PRESERVE (not removing grove compounds)\n\n> STATUS: ALL NOMINAL\n> No chemical filtering anomaly detected.",
              options: [
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            timeline: {
              text: "\u2014\u2014\u2014 ENVIRONMENTAL CHANGE LOG \u2014\u2014\u2014\n\n> Day -93: Power fluctuation event. Grove shows mild photosynthetic stress.\n> Day -90: Caretakers increase light to 24/0 to aid recovery.\n> Day -87: First VOC drop noted in sensor logs.\n> Day -83: VOC output falls below measurable threshold.\n> Day -80 to present: Complete signaling silence.\n\n> No other environmental variables changed during this period.",
              revealsClue: "CONTINUOUS_LIGHT_24H",
              bonusInsight: true,
              options: [
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "> session terminated",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        },

        plants: {
          type: "examination",
          speaker: "Genesis Pod Offspring",
          nodes: {
            start: {
              text: "The grove fills the ship's botanical wing \u2014 three intertwined organisms growing from a ceremonial basin. Vine, fungal mat, and fern-like fronds, fused at the base in the characteristic Zhel'ii three-who-are-one symbiosis. The plant looks healthy. Green, growing, structurally sound. But something is wrong: there is no scent. A healthy grove fills the air with volatile signals. This one is odorless.",
              options: [
                { label: "Check the signaling structures.", goto: "signal_structures" },
                { label: "Examine the fungal mat network.", goto: "fungal_mat" },
                { label: "Touch a vine tendril.", goto: "touch_vine", isAction: true },
                { label: "[Step away]", goto: "exit_done" }
              ]
            },
            signal_structures: {
              text: "Tiny antennae-like structures along the network threads are all sealed shut. In a healthy grove, these open rhythmically to release signaling compounds into the air. Here, every one is closed. Not damaged \u2014 deliberately closed, as if the organism decided to stop speaking. This is controlled dormancy, not injury.",
              revealsClue: "SIGNALING_COMPOUNDS_ABSENT",
              options: [
                { label: "Controlled dormancy. Something triggered the shutdown.", goto: "fungal_mat" },
                { label: "[Step away]", goto: "exit_done" }
              ]
            },
            fungal_mat: {
              text: "The fungal mat \u2014 the receiver in the three-way symbiosis \u2014 is intact but inactive. Its receptor surfaces are clean and undamaged, waiting for signals that never arrive. The mat is healthy enough to receive. The vine is healthy enough to send. The fern is healthy enough to modulate. All three components are waiting for a trigger that tells them it's time to begin the conversation.",
              revealsClue: "SIGNALING_COMPOUNDS_ABSENT",
              bonusInsight: true,
              options: [
                { label: "All waiting for a trigger. A timing signal.", goto: "exit_done" },
                { label: "Touch a vine.", goto: "touch_vine", isAction: true }
              ]
            },
            touch_vine: {
              text: "The vine tendril is warm and responsive \u2014 it curls gently around your finger, then releases. A healthy reflex. The organism is alive, alert, and physically capable of all its normal functions. It simply isn't performing them. Like a musician holding an instrument and waiting for the conductor to begin.",
              setsFlag: "touched_grove",
              options: [
                { label: "Waiting for the conductor. The timing signal.", goto: "signal_structures" },
                { label: "[Step away]", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "[You step back from the grove.]",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        },

        logs: {
          type: "archive",
          speaker: "Ship Caretaker Logs",
          nodes: {
            start: {
              text: "\u2014\u2014\u2014 THAL-OREN CARETAKER LOGS \u2014\u2014\u2014\n\nSearch: [grove] [light] [signaling] [history]",
              options: [
                { label: "[grove] Grove health timeline", goto: "health_timeline" },
                { label: "[light] Light schedule history", goto: "light_history" },
                { label: "[signaling] Signaling records", goto: "signaling_records" },
                { label: "[history] Grove origin", goto: "grove_origin" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            health_timeline: {
              text: "\u2014\u2014\u2014 GROVE HEALTH TIMELINE \u2014\u2014\u2014\n\nYear 1\u20132: Vigorous growth, full VOC signaling, stable symbiosis. All three components thriving. Network described as 'the most successful off-world grove in Zhel'ii history.'\n\nDay -93: Power fluctuation causes brief light interruption. Grove shows mild photosynthetic stress (minor, self-resolving).\nDay -90: Caretakers increase light to 24/0 to accelerate recovery.\nDay -83: VOC signaling ceases entirely.\nDay -83 to present: Complete silence. No structural decline. Grove is alive but mute.",
              revealsClue: "LIGHT_SCHEDULE_CHANGED",
              options: [
                { label: "[light] Light schedule details", goto: "light_history" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            light_history: {
              text: "\u2014\u2014\u2014 LIGHT SCHEDULE HISTORY \u2014\u2014\u2014\n\nOriginal (year 1\u20132): 18h on / 6h off. Matched to Zhel'ora day/night cycle (19h/7h, adjusted for ship systems).\n\nRevised (day -90): 24h on / 0h off. Change authorized by senior caretaker Vess-lor following power fluctuation. Rationale: 'More light = more energy = faster recovery from stress event.'\n\n\u26a0 NOTE: No Zhel'ii agricultural reference was consulted regarding dark-period requirements before the change was made.",
              revealsClue: "LIGHT_SCHEDULE_CHANGED",
              bonusInsight: true,
              options: [
                { label: "[signaling] Signaling records", goto: "signaling_records" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            signaling_records: {
              text: "\u2014\u2014\u2014 SIGNALING RECORDS \u2014\u2014\u2014\n\nUnder 18/6 schedule: VOC output cycled predictably. Peak production during hours 19\u201324 (the dark period). Minimum production during hours 6\u201312 (peak daylight). Cycle was stable and repeatable for two years.\n\nUnder 24/0 schedule: VOC output declined over 7 days, then ceased. No cycling pattern detectable. The network's internal clock appears to have lost its entrainment signal.",
              options: [
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            grove_origin: {
              text: "\u2014\u2014\u2014 GROVE ORIGIN \u2014\u2014\u2014\n\nThe Thal-Oren grove is a direct descendant of the genesis pod from the Zhel'ora botanical vessel incident. The original pod was successfully germinated in human care at L2 Station Hayes and produced several offspring. Three offspring were gifted to the Thal-Oren diaspora ship as a gesture of trust between species.\n\nCultural note: This grove is considered sacred by the Thal-Oren community. Its silence is a source of deep distress.",
              options: [
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "> archive closed",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        },

        database: {
          type: "archive",
          speaker: "Federation Database",
          nodes: {
            start: {
              text: "\u2014\u2014\u2014 FEDERATION DATABASE \u2014\u2014\u2014\n> Concord Xenobotany & Chronobiology Records\n> Query: [circadian] [voc] [symbiosis] [photoperiod]",
              options: [
                { label: "[circadian] Circadian rhythms in network organisms", goto: "circadian_data" },
                { label: "[voc] VOC signaling in Zhel'ii symbionts", goto: "voc_reference" },
                { label: "[symbiosis] Three-who-are-one biology", goto: "symbiosis_data" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            circadian_data: {
              text: "\u2014\u2014\u2014 CIRCADIAN RHYTHMS IN NETWORK ORGANISMS \u2014\u2014\u2014\n\nZhel'ii symbiosis networks exhibit circadian-linked signaling. VOC (volatile organic compound) production follows a ~24h rhythm entrained by periodic darkness.\n\nThe dark period serves as a zeitgeber (timing signal) that resets the network's internal clock each cycle. Without periodic darkness, the clock drifts to a 'perpetual mid-day' state in which VOC production is at its circadian minimum \u2014 and remains there indefinitely.\n\n\u26a0 ADVISORY: Zhel'ii network organisms MUST have a dark period of \u22655 hours per cycle. Continuous illumination will suppress VOC signaling within 7\u201310 days.",
              revealsClue: "CIRCADIAN_SIGNALING_NEEDS_DARK",
              options: [
                { label: "[voc] VOC signaling details", goto: "voc_reference" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            voc_reference: {
              text: "\u2014\u2014\u2014 VOC SIGNALING \u2014 ZHEL'II SYMBIONTS \u2014\u2014\u2014\n\nThe three-who-are-one coordinate via volatile organic compounds released into the surrounding atmosphere. Production is driven by the vine component. Reception is via the fungal mat's receptor surfaces. Modulation is performed by the fern-analogue.\n\nSignaling follows a circadian pattern: production peaks during the dark period (when photosynthetic load is lowest and metabolic resources can be redirected to compound synthesis). During continuous light, the biosynthetic pathway remains downregulated.\n\nThis is analogous to Earth plant circadian systems: jasmine releases most of its scent at night, stomata close at night to conserve water, and many defense compounds are synthesized during dark periods.",
              revealsClue: "CIRCADIAN_SIGNALING_NEEDS_DARK",
              bonusInsight: true,
              options: [
                { label: "[symbiosis] More on the three-who-are-one", goto: "symbiosis_data" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            symbiosis_data: {
              text: "\u2014\u2014\u2014 THREE-WHO-ARE-ONE \u2014 SYMBIOSIS OVERVIEW \u2014\u2014\u2014\n\nA three-organism obligate symbiosis native to Zhel'ora. First encountered by humans during the Zhel'ora botanical vessel incident (ref: SAA Case File 6/6b).\n\nThe original genesis pod was successfully germinated in human care, validating cross-species cultivation. Descendants have been distributed to several Zhel'ii diaspora communities.\n\nKey vulnerability: the symbiosis depends entirely on VOC-mediated communication. Any factor that disrupts signaling (atmospheric filtering, circadian disruption, chemical interference) will cause the network to enter controlled dormancy. Dormancy is reversible if the disruption is identified and corrected within 6 months.",
              options: [
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "> query complete",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        }
      },

      clues: [
        {
          action: "crew",
          label: "Talk to Caretaker",
          icon: "\ud83d\udc7d",
          speaker: "Caretaker Vess-lor",
          sprites: {
            spritesheet:     "sprites/c2/vesslor/spritesheet.png",
            spritesheetJson: "sprites/c2/vesslor/spritesheet.json",
            actionIcon:      "portrait_species_zhelii.png"
          },
          text: "[STUB] See dialogue tree.",
          clueTag: "NETWORK_FALLEN_SILENT",
          learned: "The genesis pod grove's signaling network has gone silent. Crew swears the atmosphere is perfect."
        },
        {
          action: "sensors",
          label: "Check Sensors",
          icon: "\ud83d\udcca",
          speaker: "Grove Sensor Array",
          sprites: {
            portrait:   "portrait_sensors.png",
            actionIcon: "icon_sensors.png"
          },
          text: "[STUB] See sensor readout.",
          clueTag: "CONTINUOUS_LIGHT_24H",
          learned: "Grove lights are on 24/0 — no dark period. No VOC signaling detected in 24h."
        },
        {
          action: "plants",
          label: "Examine Grove",
          icon: "\ud83c\udf3e",
          speaker: "Genesis Pod Offspring",
          sprites: {
            portrait:   "portrait_genesis_offspring.png",
            actionIcon: "icon_plants.png"
          },
          text: "[STUB] See examination.",
          clueTag: "SIGNALING_COMPOUNDS_ABSENT",
          learned: "Plant is alive and healthy-looking, but producing no signaling compounds. The network is 'mute.'"
        },
        {
          action: "logs",
          label: "Review Logs",
          icon: "\ud83d\udccb",
          speaker: "Ship Caretaker Logs",
          sprites: {
            portrait:   "portrait_logs.png",
            actionIcon: "icon_logs.png"
          },
          text: "[STUB] See archive.",
          clueTag: "LIGHT_SCHEDULE_CHANGED",
          learned: "Caretakers switched grove lights from 18/6 to 24/0 about 90 days ago to 'encourage growth.' Silence began around then."
        },
        {
          action: "database",
          label: "Federation Database",
          icon: "\ud83d\udef0\ufe0f",
          speaker: "Federation Database",
          sprites: {
            portrait:   "portrait_database.png",
            actionIcon: "icon_database.png"
          },
          text: "[STUB] See database entry.",
          clueTag: "CIRCADIAN_SIGNALING_NEEDS_DARK",
          learned: "Zhel'ii network signaling is circadian-linked — requires periodic darkness to reset. Continuous light suppresses VOC output."
        }
      ],

      diagnoses: [
        {
          id: "photoperiod_circadian",
          label: "The network's VOC signaling is circadian-linked and requires periodic darkness to reset. Continuous 24h light locks it in a perpetual mid-day state where signaling is lowest.",
          isCorrect: true
        },
        {
          id: "chemistry_drift",
          label: "The atmospheric chemical filtering has drifted out of range despite the crew's monitoring.",
          isCorrect: false,
          hint: "The sensors confirm atmosphere is nominal, and Case 6 already taught you about chemical filtering. This is a different problem at a different layer."
        },
        {
          id: "too_much_light",
          label: "The light intensity is too high and is photo-bleaching the plant tissue.",
          isCorrect: false,
          hint: "The plant tissue looks healthy. The failure isn't damage — it's that something has stopped happening. Ask what a healthy 24h cycle requires."
        },
        {
          id: "transit_stress",
          label: "The grove is stressed by the ship's transit environment and needs to be kept in a single stable orbit.",
          isCorrect: false,
          hint: "The grove thrived in transit for two years before going silent. Something specific changed about 90 days ago. What was it?"
        }
      ],

      ranksUp: false,
      rankUpText: "Darkness is not the absence of something. It is a signal \u2014 the timing cue that tells a network when to speak. Kindness without understanding can silence the very thing you're trying to help.",

      explanation: {
        title: "Circadian Signaling: When Darkness Is a Nutrient",
        body: "Plants don't just photosynthesize during the day and rest at night. They use the transition between light and dark as a timing signal \u2014 a zeitgeber \u2014 that synchronizes an enormous range of metabolic processes. Defense compounds are synthesized at night. Stomata cycles are reset at dawn. Jasmine releases its scent in darkness. The dark period isn't downtime. It's when the most important work happens.\n\nThe Zhel'ii three-who-are-one symbiosis takes this further. The network's volatile signaling compounds \u2014 the 'voice' that coordinates the vine, the fungal mat, and the fern-analogue \u2014 are produced almost exclusively during the dark period. The biosynthetic pathway that makes these compounds is suppressed during photosynthesis because the metabolic resources are allocated elsewhere. Only when the lights go off does the network redirect energy from growth to communication.\n\nContinuous light doesn't just prevent rest. It locks the internal clock in a state where the signaling pathway never activates. The clock needs periodic darkness to reset, the same way a pendulum needs to swing back before it can swing forward. Without the reset, the clock drifts to a permanent 'midday' reading where VOC production is at its minimum \u2014 and stays there.\n\nThis case required stacking two principles: photoperiodism (the need for periodic darkness, from Campaign 1 Case 4) and VOC-mediated symbiotic signaling (from Campaign 1 Cases 6 and 6b). Neither principle alone explains the silence. Together, they reveal that the caretakers' well-intentioned kindness \u2014 more light for more energy \u2014 was precisely what silenced the grove.",
        funFact: "Many Earth plants are more metabolically active at night than during the day. CAM photosynthesis plants (like cacti) open their stomata only at night to fix carbon dioxide. Rubber trees produce most of their latex at night. And the 'dawn chorus' of birdsong at sunrise? Plants have their own version: a burst of VOC emissions at the light-to-dark transition that scientists call the 'dusk pulse.'"
      },

      callHomeHints: {
        low: "Nova: 'The grove is alive but silent. Start with the basics \u2014 what's the environment like? Check the sensors and the grove itself. Something is missing that the caretakers can't see.'",
        mid: "Nova: 'When does the grove normally signal? Think about timing, not chemistry. The atmosphere is fine \u2014 this isn't the Zhel'ora problem. This is something the caretakers did without realizing it.'",
        full: "Nova: 'You have the light schedule, the signaling data, and the circadian reference. The grove needs something the caretakers took away with good intentions. What did they change?'"
      }
    },

    // ── CASE 5: Concord Botanical Vault ──────────────────────────
    // Design-doc codename: "Too Clean a Room". Mirrors Campaign 1 Case 5
    // (radiation) but inverted — radiation as nutrient, not enemy. Also
    // lands the Concord political arc. Includes solution choice reusing
    // the existing SOLUTION_CHOICE screen state from Case 6b.
    {
      id: "too_clean_room",
      name: "Concord Botanical Vault",
      location: "Lagrange Point 5",
      subtitle: "Concord Neutral Zone",
      palette: {
        bg:        "#020617",
        bgMid:     "#1e293b",
        accent:    "#e2e8f0",
        highlight: "#ffffff",
        plant:     "#f472b6"
      },
      sprites: {
        scene: "sprites/c2/scene_concord_vault.png"
      },
      briefing: "Nova: 'Last case. The Concord Botanical Vault at L5 \u2014 the most secure facility in known space. They transplanted the karreth bloom six months ago. The bloom produces medicinal compounds that treat a disease affecting multiple Concord species. Supplies are running out because the bloom has nearly stopped producing.'\n\nZel'keth: 'The vault was built with the best radiation shielding the Concord has ever designed. The environment is flawless by every metric. And yet the bloom is failing. This is where Concord policy meets species-specific biology, and I am not confident policy will win.'\n\nNova: 'The vault admin is a Rhessi named Kel-tor. Rhessi come from a high-radiation world. If anyone has an intuition about what's wrong, it might be them. But they weren't consulted on the vault design. Just find what's true.'",

      sources: {
        crew: {
          type: "conversation",
          speaker: "Vault Admin Kel-tor",
          personality: "stoic",
          startMood: 0,
          nodes: {
            start: {
              text: "Kel-tor stands with arms crossed, amber eyes steady. Their leathery, ridge-lined skin marks them as Rhessi \u2014 a species from a world where radiation is as ordinary as sunlight. 'Blooms arrived six months ago. Grew normally for two months. Compound production has declined 94% since month three. I have adjusted every variable within my authority. The shielding is perfect. The environment is perfect. The blooms are dying of nothing.'",
              options: [
                { label: "What do you think the problem is?", goto: "keltor_suspicion" },
                { label: "Tell me about the vault's shielding.", goto: "shielding_info" },
                { label: "What have you tried?", goto: "what_tried" },
                { label: "The sensors show zero background radiation inside the vault.", goto: "radiation_insight", requires: { clueFound: "RADIATION_ZERO" } },
                { label: "The bloom's DNA-repair pathway has shut down completely.", goto: "pathway_insight", requires: { clueFound: "DNA_REPAIR_PATHWAY_INACTIVE" } },
                { label: "The karreth homeworld has 8.4 mSv/day background radiation.", goto: "homeworld_insight", requires: { clueFound: "KARRETH_HOMEWORLD_HIGH_RAD" } },
                { label: "Concord records describe an obligate radiation-triggered pathway.", goto: "database_insight", requires: { clueFound: "HORMESIS_OBLIGATE_RADIATION" } },
                { label: "Kel-tor. I am Rhessi. I know what radiation means to biology.", goto: "rhessi_greeting", requires: { playerSpecies: "rhessi" } },
                { label: "I've seen what happens when species-specific needs are ignored.", goto: "alien_rapport", requires: { playerSpeciesNot: "human" } },
                { label: "Maybe the nutrient mix is missing something.", goto: "wrong_guess_nutrients" },
                { label: "I'll investigate the other sources.", goto: "exit_neutral" }
              ]
            },
            rhessi_greeting: {
              text: "Kel-tor's eyes widen \u2014 the only expression a Rhessi permits for surprise. 'You are of Rhess.' A long breath. 'Then I will say what I have not been permitted to say in official channels: the shielding is the problem. On Rhess, we live under 12 mSv per day and our biology expects it. The karreth homeworld is similar. This vault has zero. The Concord built the most expensive coffin in known space and called it protection.'",
              revealsClue: "BLOOMS_INERT",
              bonusInsight: true,
              moodShift: 1,
              setsFlag: "keltor_spoke_freely",
              options: [
                { label: "The bloom needs radiation the way we need sunlight.", goto: "realization" },
                { label: "Why didn't you tell the Concord this?", goto: "why_silent" },
                { label: "I'll confirm with the sensor data.", goto: "exit_friendly" }
              ]
            },
            alien_rapport: {
              text: "'Ignored.' Kel-tor's jaw tightens. 'Yes. The Concord designed this vault to protect the bloom from radiation. They consulted physicists, engineers, material scientists. They did not consult a biologist from a high-radiation world. They assumed radiation is always the enemy.'",
              options: [
                { label: "And for some species, it isn't.", goto: "keltor_suspicion" },
                { label: "I'll investigate.", goto: "exit_neutral" }
              ]
            },
            keltor_suspicion: {
              text: "'I have a theory. I am not permitted to state it officially because it contradicts Concord shielding policy.' Kel-tor's voice is flat, careful. 'The Concord classifies all radiation as hazardous. Their shielding standards are universal. I come from a world where children play in radiation that would hospitalize a human. I have... a different perspective.'",
              revealsClue: "BLOOMS_INERT",
              setsFlag: "keltor_hinted",
              options: [
                { label: "You think the shielding itself is the problem.", goto: "shielding_problem" },
                { label: "What's your different perspective?", goto: "rhessi_perspective" },
                { label: "I'll check the radiation data.", goto: "exit_neutral" }
              ]
            },
            shielding_problem: {
              text: "'I think the shielding is too good. The bloom evolved under constant radiation. Remove the radiation, and you remove something the bloom needs.' A pause. 'I cannot say this in my official reports. The Concord does not have a framework for radiation as a requirement. It only has frameworks for radiation as a threat.'",
              options: [
                { label: "That's what I need to prove. I'll gather the evidence.", goto: "exit_friendly" },
                { label: "Why can't you say this officially?", goto: "why_silent" }
              ]
            },
            rhessi_perspective: {
              text: "'On Rhess, radiation is not a hazard. It is a metabolic input. Our skin converts ionizing radiation into usable energy \u2014 a supplement to standard photosynthesis. Our immune systems use radiation-induced damage as a training signal. We are healthier WITH radiation than without it.' Kel-tor looks at the sealed growth chambers. 'I believe the karreth bloom is the same.'",
              bonusInsight: true,
              options: [
                { label: "Radiation as a metabolic input. That would explain everything.", goto: "realization" },
                { label: "I need to confirm with the data.", goto: "exit_friendly" }
              ]
            },
            why_silent: {
              text: "'Because the Concord's shielding standards are a political achievement, not just an engineering one. Twelve species agreed on universal radiation protection. Saying that the standards are wrong for some species is diplomatically dangerous. So I administer this vault, I watch the bloom die, and I wait for someone from the outside to say what I cannot.'",
              setsFlag: "keltor_explained_politics",
              options: [
                { label: "That's why Federation Liaison exists. I'll say it.", goto: "exit_friendly" },
                { label: "I'll get the evidence first.", goto: "exit_neutral" }
              ]
            },
            shielding_info: {
              text: "'Tier-1 Concord standard. The best in known space. Interior background radiation: 0.0 mSv per year. Not low. Zero. The vault blocks everything \u2014 cosmic rays, stellar radiation, geological emissions. The Concord is very proud of it.' A beat. 'The karreth bloom is less impressed.'",
              setsFlag: "keltor_described_shielding",
              options: [
                { label: "Zero radiation. Is that a problem for the bloom?", goto: "keltor_suspicion" },
                { label: "I'll check the sensor readings.", goto: "exit_neutral" }
              ]
            },
            what_tried: {
              text: "'Nutrient adjustments. Humidity tuning. Temperature variation. Light spectrum optimization. Soil supplements matching karreth homeworld mineral profiles. Nothing changed the decline. The compound production continued to drop regardless of intervention.' Kel-tor's amber eyes hold yours. 'Every variable I have authority to adjust has been adjusted. The one variable I suspect is not within my authority.'",
              revealsClue: "BLOOMS_INERT",
              options: [
                { label: "What variable do you suspect?", goto: "keltor_suspicion" },
                { label: "What's outside your authority?", goto: "shielding_info" },
                { label: "I'll investigate.", goto: "exit_neutral" }
              ]
            },
            wrong_guess_nutrients: {
              text: "'Nutrients are nominal. I have reformulated the mix four times. The bloom's tissue is healthy. Its cells are intact. Its metabolic machinery is present and functional. It is simply not running one specific pathway. The failure is not nutritional. It is regulatory.'",
              moodShift: -1,
              options: [
                { label: "A regulatory failure. Something that triggers the pathway is missing.", goto: "keltor_suspicion" },
                { label: "I'll investigate.", goto: "exit_neutral" }
              ]
            },
            radiation_insight: {
              text: "'Zero.' Kel-tor allows the faintest satisfaction to enter their voice. 'You noticed. The vault's interior reads 0.0 mSv. No background radiation of any kind. On the karreth homeworld, the surface reads 8.4 mSv per day. The bloom has gone from constant irradiation to... nothing. And the Concord considers this an achievement.'",
              revealsClue: "BLOOMS_INERT",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "The bloom was adapted to radiation. Removing it shut down a pathway.", goto: "realization" },
                { label: "What would radiation do for the bloom?", goto: "rhessi_perspective" }
              ]
            },
            pathway_insight: {
              text: "'The DNA-repair pathway is quiescent. Yes.' Kel-tor nods. 'On the karreth homeworld, that pathway runs continuously because there is always radiation damage to repair. The medicinal compounds are a byproduct of the repair process. No damage, no repair, no compounds. The shielding removed the input that drives the entire system.'",
              revealsClue: "BLOOMS_INERT",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "The shielding starved the pathway by being too effective.", goto: "realization" },
                { label: "The fix is controlled radiation exposure.", goto: "solution" }
              ]
            },
            homeworld_insight: {
              text: "'8.4 mSv per day. Every day. For the entire evolutionary history of the species.' Kel-tor's voice is precise. 'On Rhess, we receive 12. We are healthy. The karreth bloom evolved under similar conditions and integrated radiation into its core metabolism. The Concord treated 8.4 mSv as a hazard to be eliminated. For this organism, it was a nutrient to be provided.'",
              revealsClue: "BLOOMS_INERT",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "Radiation as nutrient. The Concord's policy is species-blind.", goto: "realization" },
                { label: "Install calibrated radiation sources to mimic the homeworld.", goto: "solution" }
              ]
            },
            database_insight: {
              text: "'The Concord documented this.' Kel-tor closes their eyes briefly. 'An obligate radiation-triggered pathway — rare, species-specific, and nothing like the response of ordinary organisms. And they still built a vault with zero background radiation for a species whose medicinal pathway requires that trigger.' A long silence. 'At least the record exists. Your report will have citations.'",
              revealsClue: "BLOOMS_INERT",
              bonusInsight: true,
              moodShift: 2,
              options: [
                { label: "The fix is clear. The policy question is harder.", goto: "policy_discussion" },
                { label: "Calibrated radiation sources. Mimicking homeworld conditions.", goto: "solution" }
              ]
            },
            realization: {
              text: "'The shielding is the problem. The vault was designed to protect the bloom from radiation. But the bloom requires radiation \u2014 specifically, the continuous low-level ionizing radiation of its homeworld. Without it, the DNA-repair pathway has nothing to repair. The pathway shuts down. The medicinal compounds, which are a byproduct of that repair, stop being produced. The Concord built a perfect environment and the perfection itself is what is killing the bloom.'",
              options: [
                { label: "Install calibrated radiation sources to restore homeworld conditions.", goto: "solution" },
                { label: "This is bigger than one vault. The policy needs to change.", goto: "policy_discussion" }
              ]
            },
            policy_discussion: {
              text: "'The Concord's shielding standards assume all radiation is harmful. For most species, that is correct. For species from high-radiation worlds \u2014 Rhessi, karreth, at least three others in Concord records \u2014 it is lethally wrong.' Kel-tor meets your eyes. 'You will need to decide how to frame your recommendation. A targeted fix for this vault, or a systemic reform of Concord shielding policy.'",
              setsFlag: "keltor_discussed_policy",
              options: [
                { label: "I'll think about that after the diagnosis.", goto: "solution" }
              ]
            },
            solution: {
              text: "'Calibrated radiation sources. Cesium-137 or cobalt-60, sealed and shielded to produce 8\u20139 mSv per day within the growth chambers only. The vault's external shielding stays intact \u2014 the radiation is added, not the shielding removed. The bloom's DNA-repair pathway reactivates. Compound production resumes within weeks.' Kel-tor's expression doesn't change, but their posture straightens. 'It would have been simpler to consult a Rhessi before building the vault. But I will take the late correction.'",
              moodShift: 1,
              options: [
                { label: "I'll include the recommendation in my report.", goto: "exit_friendly" }
              ]
            },
            annoyed: {
              text: "'The bloom requires radiation. The vault has none. The DNA-repair pathway \u2014 which produces the medicinal compounds \u2014 has shut down because there is no damage to repair. I have stated this as clearly as I can within the constraints of my position. Please check the sensor data, the transplant records, and the Concord database. The evidence is there.'",
              revealsClue: "BLOOMS_INERT",
              options: [
                { label: "I'll check the other sources.", goto: "exit_neutral" }
              ]
            },
            exit_friendly: {
              text: "Kel-tor nods once. 'Thank you, liaison. For listening to what I could not say officially. The bloom deserves better than a perfect cage.'",
              moodShift: 1,
              endsConversation: true,
              exitLabel: "Thanks"
            },
            exit_neutral: {
              text: "'I will be in the monitoring station.' Kel-tor turns back to the growth chamber readouts.",
              endsConversation: true,
              exitLabel: "Head back"
            },
            exit_cold: {
              text: "Kel-tor says nothing. Their amber eyes return to the bloom.",
              endsConversation: true,
              exitLabel: "Leave"
            }
          }
        },

        sensors: {
          type: "terminal",
          speaker: "Vault Sensor Array",
          nodes: {
            start: {
              text: "\u2014\u2014\u2014 CONCORD BOTANICAL VAULT \u2014 SENSOR ARRAY \u2014\u2014\u2014\n\n> Air temp: 22.0\u00b0C (nominal)\n> Humidity: 55% (nominal)\n> Nutrient delivery: active (karreth profile v4)\n> Light: full-spectrum, 14h/10h cycle\n\nQuery available: [radiation] [environment] [production] [shielding]",
              options: [
                { label: "[radiation] Radiation readings", goto: "radiation_data" },
                { label: "[environment] Full environmental profile", goto: "environment" },
                { label: "[production] Compound production rates", goto: "production" },
                { label: "[shielding] Shielding specifications", goto: "shielding_specs" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            radiation_data: {
              text: "\u2014\u2014\u2014 RADIATION PROFILE \u2014\u2014\u2014\n\n> Shielding: Tier-1 Concord Standard\n> Interior background radiation: 0.0 mSv/year\n> Cosmic ray flux: BLOCKED (100%)\n> Stellar radiation: BLOCKED (100%)\n> Geological emissions: N/A (station, not planetary)\n\n\u26a0 NOTE: Interior is classified RADIATION-CLEAN.\nFor reference \u2014 karreth homeworld surface: 8.4 mSv/day (3,066 mSv/year).",
              revealsClue: "RADIATION_ZERO",
              options: [
                { label: "[shielding] How is this achieved?", goto: "shielding_specs" },
                { label: "[production] Check compound output", goto: "production" },
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            environment: {
              text: "\u2014\u2014\u2014 ENVIRONMENTAL PROFILE \u2014\u2014\u2014\n\n> Temperature: 22.0\u00b0C (karreth optimal: 20\u201325\u00b0C) \u2713\n> Humidity: 55% (karreth optimal: 50\u201360%) \u2713\n> Light: full-spectrum 14h/10h (karreth optimal: 12\u201316h) \u2713\n> Nutrients: karreth mineral profile v4 \u2713\n> Atmospheric composition: standard Concord mix \u2713\n\n> STATUS: ALL PARAMETERS WITHIN OPTIMAL RANGE\n> No environmental anomaly detected.",
              options: [
                { label: "[radiation] Check radiation data", goto: "radiation_data" },
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            production: {
              text: "\u2014\u2014\u2014 COMPOUND PRODUCTION RATES \u2014\u2014\u2014\n\n> Month 1-2: 100% baseline (normal production)\n> Month 3: 68% baseline (decline begins)\n> Month 4: 31% baseline\n> Month 5: 11% baseline\n> Month 6 (current): 6% baseline\n\n> Trend: monotonic decline. No intervention has reversed or slowed the trajectory.\n> Tissue health: NORMAL. Cellular integrity: NORMAL.\n> Only the DNA-repair-linked biosynthetic pathway is affected.",
              bonusInsight: true,
              options: [
                { label: "[radiation] Check radiation readings", goto: "radiation_data" },
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            shielding_specs: {
              text: "\u2014\u2014\u2014 SHIELDING SPECIFICATIONS \u2014\u2014\u2014\n\n> Type: Composite polyethylene + borated steel + water jacket\n> Thickness: 2.4m total equivalent\n> Rated attenuation: >99.999% of all ionizing radiation\n> Design standard: Concord Universal Shielding Protocol v3.2\n\n\u26a0 Spec note: 'Designed to protect biological specimens from ALL forms of ionizing radiation. No provision exists for species that may require radiation exposure. The protocol does not distinguish between radiation-sensitive and radiation-adapted species.'",
              options: [
                { label: "[back] Return to main", goto: "start" },
                { label: "[exit] Close terminal", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "> session terminated",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        },

        plants: {
          type: "examination",
          speaker: "Karreth Bloom Specimen",
          nodes: {
            start: {
              text: "The karreth bloom sits in a sealed growth chamber behind thick glass. Its crystalline petals are intact but dulled \u2014 a washed-out pink where the reference images show vivid magenta. The plant is alive. It is simply not doing the one thing it's famous for.",
              options: [
                { label: "Run a tissue analysis.", goto: "tissue_analysis" },
                { label: "Check the DNA-repair pathway.", goto: "dna_repair" },
                { label: "Compare to homeworld reference.", goto: "homeworld_compare" },
                { label: "[Step away]", goto: "exit_done" }
              ]
            },
            tissue_analysis: {
              text: "Cellular structure is healthy. Membranes intact. Organelles functioning. Nutrient uptake normal. The bloom is in excellent physical condition \u2014 it just isn't producing the medicinal compounds it's supposed to. The biosynthetic pathway that makes them exists in the genome and the cellular machinery is present, but the pathway is quiescent. Waiting for an activation signal that never comes.",
              revealsClue: "DNA_REPAIR_PATHWAY_INACTIVE",
              options: [
                { label: "Check what activates the pathway.", goto: "dna_repair" },
                { label: "[Step away]", goto: "exit_done" }
              ]
            },
            dna_repair: {
              text: "The compound biosynthesis pathway is downstream of the DNA-repair pathway. On the karreth homeworld, continuous low-level radiation causes constant minor DNA damage. The repair pathway runs non-stop to fix it, and the medicinal compounds are a metabolic byproduct of that repair. Here, with zero radiation, there is zero DNA damage. The repair pathway has nothing to do. It sits idle, and the compounds are never produced.",
              revealsClue: "DNA_REPAIR_PATHWAY_INACTIVE",
              bonusInsight: true,
              options: [
                { label: "No damage, no repair, no compounds.", goto: "homeworld_compare" },
                { label: "[Step away]", goto: "exit_done" }
              ]
            },
            homeworld_compare: {
              text: "A reference image from the karreth homeworld shows the bloom in vivid magenta \u2014 petals almost glowing with accumulated compounds. That bloom lives under 8.4 mSv per day of background radiation. Its DNA is constantly being damaged and constantly being repaired. The repair process is what gives the petals their color and their medicinal properties. The vault specimen looks like a faded photograph of the same species.",
              options: [
                { label: "The radiation drives the repair. The repair drives the compounds.", goto: "exit_done" },
                { label: "[Step away]", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "[You step back from the growth chamber.]",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        },

        logs: {
          type: "archive",
          speaker: "Karreth Transplant Records",
          nodes: {
            start: {
              text: "\u2014\u2014\u2014 KARRETH TRANSPLANT RECORDS \u2014\u2014\u2014\n\nSearch: [homeworld] [transplant] [compounds] [shielding]",
              options: [
                { label: "[homeworld] Karreth homeworld conditions", goto: "homeworld" },
                { label: "[transplant] Transplant documentation", goto: "transplant_doc" },
                { label: "[compounds] Medicinal compound biology", goto: "compound_biology" },
                { label: "[shielding] Vault shielding decision", goto: "shielding_decision" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            homeworld: {
              text: "\u2014\u2014\u2014 KARRETH HOMEWORLD CONDITIONS \u2014\u2014\u2014\n\nPlanet: Karreth-IV (unnamed system, Concord designation)\nSurface radiation: 8.4 mSv/day (stellar + geological sources)\nAtmosphere: thin, minimal UV filtration\nSoil: high mineral content, radioactive trace elements\n\nKarreth bloom evolved under continuous ionizing radiation for estimated >200 million years. All native biology exhibits elevated DNA-repair activity.\n\n\u26a0 Note: Karreth-IV would be classified 'uninhabitable' by Concord radiation standards. The native species thrive in it.",
              revealsClue: "KARRETH_HOMEWORLD_HIGH_RAD",
              options: [
                { label: "[compounds] How does radiation relate to the compounds?", goto: "compound_biology" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            transplant_doc: {
              text: "\u2014\u2014\u2014 TRANSPLANT DOCUMENTATION \u2014\u2014\u2014\n\nSpecimen arrived healthy. Placed in Tier-1 shielded growth chamber.\nMonth 1-2: normal growth, full compound production.\nMonth 3+: compound output declining.\n\nTransplant team note: 'Environmental conditions matched to karreth homeworld within 2% for all measured parameters. Shielding rated as unusually excellent \u2014 far exceeding native conditions.'\n\n\u26a0 The phrase 'far exceeding native conditions' was noted as a positive in the transplant report. No team member flagged this as a potential concern.",
              revealsClue: "KARRETH_HOMEWORLD_HIGH_RAD",
              bonusInsight: true,
              options: [
                { label: "[shielding] Vault shielding decision", goto: "shielding_decision" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            compound_biology: {
              text: "\u2014\u2014\u2014 MEDICINAL COMPOUND BIOLOGY \u2014\u2014\u2014\n\nThe karreth bloom's medicinal compounds (karrethins) are produced as a metabolic byproduct of the plant's DNA-repair pathway. The repair enzymes generate karrethins during the process of fixing radiation-induced strand breaks.\n\nUnder native conditions (8.4 mSv/day): repair pathway runs continuously. Karrethin production is constant.\nUnder zero radiation: no strand breaks occur. Repair pathway is quiescent. Karrethin production: near zero.\n\nThe compounds cannot be produced without active DNA damage to trigger the repair cycle.",
              options: [
                { label: "[homeworld] Homeworld radiation details", goto: "homeworld" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            shielding_decision: {
              text: "\u2014\u2014\u2014 VAULT SHIELDING DECISION \u2014\u2014\u2014\n\nConcord Engineering Division: 'Vault shielding designed per Universal Shielding Protocol v3.2. All biological specimens to be protected from ionizing radiation to the maximum extent achievable.'\n\nBiology Division review: 'Shielding specification approved. No species-specific radiation requirements were requested or provided.'\n\n\u26a0 NOTE: No biologist from a high-radiation world was consulted during the vault design process. The Rhessi delegation to the Concord was not notified. Vault Admin Kel-tor was assigned AFTER construction was complete.",
              options: [
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close archive", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "> archive closed",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        },

        database: {
          type: "archive",
          speaker: "Federation Database",
          nodes: {
            start: {
              text: "\u2014\u2014\u2014 FEDERATION DATABASE \u2014\u2014\u2014\n> Concord Radiobiology & Extremophile Records\n> Query: [hormesis] [karreth] [shielding_policy] [rhessi]",
              options: [
                { label: "[hormesis] Radiation hormesis", goto: "hormesis" },
                { label: "[karreth] Karreth bloom biology", goto: "karreth_bio" },
                { label: "[shielding_policy] Concord shielding standards", goto: "shielding_policy" },
                { label: "[rhessi] Rhessi radiation biology", goto: "rhessi_bio" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            hormesis: {
              text: "\u2014\u2014\u2014 OBLIGATE RADIATION-TRIGGERED METABOLISM \u2014\u2014\u2014\n\nConcord classification: a rare, fictional\nbiological system in which a low-level\nionizing-radiation signal activates a\nspecies-specific metabolic pathway.\n\nKnown Concord examples: 5, including\nthe karreth bloom. The exact mechanisms\nare species-specific and should not be\ngeneralized to other organisms.\n\nKarreth mechanism: low-level DNA damage\nactivates a repair cascade whose byproducts\ninclude essential karrethins. Removing the\ntrigger shuts down that pathway.\n\n\u26a0 ADVISORY: This Concord category is not\nequivalent to a general claim that low-dose\nradiation benefits Earth organisms.",
              revealsClue: "HORMESIS_OBLIGATE_RADIATION",
              options: [
                { label: "[karreth] Karreth-specific data", goto: "karreth_bio" },
                { label: "[shielding_policy] Why doesn't the policy account for this?", goto: "shielding_policy" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            karreth_bio: {
              text: "\u2014\u2014\u2014 KARRETH BLOOM \u2014 RADIOBIOLOGY \u2014\u2014\u2014\n\nDNA-repair pathway: constitutively active under native conditions (8.4 mSv/day). Produces karrethins (medicinal compounds) as repair byproduct.\n\nUnder zero radiation: pathway deactivates within 60\u201390 days. Karrethin production drops to <10% of baseline. Pathway reactivation requires restoration of radiation stimulus; recovery expected within 14\u201321 days.\n\nRecommended artificial radiation source: sealed cesium-137 or cobalt-60, calibrated to deliver 7\u20139 mSv/day to growth chamber. External vault shielding remains intact.\n\nEarth comparison: Laboratory studies have found that ionizing radiation can alter the electron-transfer properties of melanin and can enhance growth or metabolic activity in some melanized fungi under particular conditions. Researchers have proposed a possible energy-capture role, but this is not established as radiation-powered photosynthesis and the fungi are not known to require radiation.",
              revealsClue: "HORMESIS_OBLIGATE_RADIATION",
              bonusInsight: true,
              options: [
                { label: "[rhessi] Rhessi biology comparison", goto: "rhessi_bio" },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            shielding_policy: {
              text: "\u2014\u2014\u2014 CONCORD UNIVERSAL SHIELDING PROTOCOL v3.2 \u2014\u2014\u2014\n\nAdopted by 12 Concord member species. Classifies ALL ionizing radiation as hazardous. Mandates maximum feasible shielding for all biological facilities.\n\nNo provision exists for species that require radiation exposure. The protocol was designed primarily around radiation-sensitive species (humans, Telluvians, Oolians) and applied universally.\n\nProposed amendment (pending): 'Species-specific shielding standards for radiation-adapted organisms.' Filed by the Rhessi delegation. Status: UNDER REVIEW.\n\nNote: This amendment would have prevented the current karreth bloom situation. It was filed two years ago. It has not been voted on.",
              options: [
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            rhessi_bio: {
              text: "\u2014\u2014\u2014 RHESSI RADIATION BIOLOGY \u2014\u2014\u2014\n\nThe Rhessi evolved on Rhess-IV under 12 mSv/day background radiation. Their biology exhibits partial radiation dependence:\n\n- Melanin-analogue in integument is radioprotective and may contribute to species-specific energy handling\n- Immune system uses radiation-induced damage as a calibration signal\n- DNA-repair pathways are constitutively active and produce beneficial secondary metabolites\n\nRhessi individuals in low-radiation environments report fatigue, reduced immune function, and metabolic inefficiency. Within the fictional Concord record, partial dependence is documented for this species; it should not be treated as an Earth biological generalization.\n\nNote: The Rhessi are the Concord's foremost experts on radiation biology. Their delegation was not consulted during the design of the Concord Botanical Vault.",
              options: [
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "> query complete",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        }
      },

      clues: [
        {
          action: "crew",
          label: "Talk to Vault Admin",
          icon: "\ud83e\uddd1",
          speaker: "Vault Admin Kel-tor",
          sprites: {
            spritesheet:     "sprites/c2/keltor/spritesheet.png",
            spritesheetJson: "sprites/c2/keltor/spritesheet.json",
            actionIcon:      "portrait_species_rhessi.png"
          },
          text: "[STUB] See dialogue tree.",
          clueTag: "BLOOMS_INERT",
          learned: "Karreth blooms look intact but have produced almost no medicinal compounds for four months."
        },
        {
          action: "sensors",
          label: "Check Sensors",
          icon: "\ud83d\udcca",
          speaker: "Vault Sensor Array",
          sprites: {
            portrait:   "portrait_sensors.png",
            actionIcon: "icon_sensors.png"
          },
          text: "[STUB] See sensor readout.",
          clueTag: "RADIATION_ZERO",
          learned: "Vault shielding is Tier-1 Concord: interior background radiation is 0.0 mSv/year. Completely clean."
        },
        {
          action: "plants",
          label: "Examine Bloom",
          icon: "\ud83c\udf38",
          speaker: "Karreth Bloom Specimen",
          sprites: {
            portrait:   "portrait_karreth.png",
            actionIcon: "icon_plants.png"
          },
          text: "[STUB] See examination.",
          clueTag: "DNA_REPAIR_PATHWAY_INACTIVE",
          learned: "Karreth DNA-repair pathway is quiescent. The medicinal compounds are downstream of it — no damage, no compounds."
        },
        {
          action: "logs",
          label: "Review Logs",
          icon: "\ud83d\udccb",
          speaker: "Karreth Transplant Records",
          sprites: {
            portrait:   "portrait_logs.png",
            actionIcon: "icon_logs.png"
          },
          text: "[STUB] See archive.",
          clueTag: "KARRETH_HOMEWORLD_HIGH_RAD",
          learned: "Karreth homeworld has 8.4 mSv/day background radiation. The species evolved with an always-on DNA-repair pathway."
        },
        {
          action: "database",
          label: "Federation Database",
          icon: "\ud83d\udef0\ufe0f",
          speaker: "Federation Database",
          sprites: {
            portrait:   "portrait_database.png",
            actionIcon: "icon_database.png"
          },
          text: "[STUB] See database entry.",
          clueTag: "HORMESIS_OBLIGATE_RADIATION",
          learned: "Concord records report that the fictional karreth bloom requires a low-level radiation trigger for the repair pathway that produces karrethins."
        }
      ],

      diagnoses: [
        {
          id: "hormesis",
          label: "Karreth bloom requires low-level background radiation. Its DNA-repair pathway — which produces the medicinal compounds as a byproduct — only activates when there's damage to repair. The Concord's 'perfect' shielding starved the pathway.",
          isCorrect: true
        },
        {
          id: "nutrient_deficiency",
          label: "The bloom is missing a trace element from its native soil that the vault's nutrient mix doesn't include.",
          isCorrect: false,
          hint: "The vault's nutrient delivery reads nominal and has been adjusted multiple times. The failure is in a pathway, not in inputs."
        },
        {
          id: "humidity_temp",
          label: "Ambient humidity or temperature is subtly off from karreth homeworld conditions.",
          isCorrect: false,
          hint: "Environmental readings are nominal and were calibrated against karreth specs. The issue isn't a parameter within the vault's model — it's a parameter the model never accounted for."
        },
        {
          id: "transplant_shock",
          label: "The bloom is experiencing delayed transplant shock and needs time to acclimate.",
          isCorrect: false,
          hint: "The bloom thrived for two months after arrival, then degraded. Transplant shock wouldn't have that delay pattern. Something changed — or something expected was missing from day one."
        }
      ],

      solutionChoice: {
        prompt: "Your diagnosis is correct \u2014 the karreth bloom requires background radiation to drive its DNA-repair pathway, which produces the medicinal compounds as a byproduct. The Concord's 'perfect' shielding removed the one thing the bloom needed most. Now: how do you resolve this? Your handlers and the Concord are watching.",
        options: [
          {
            label: "Targeted retrofit: install calibrated cesium-137 sources in this vault only. Fix the immediate problem. No policy change.",
            bonusPoints: 0,
            response: "The targeted retrofit is approved immediately. Sealed radiation sources are installed within the week, calibrated to deliver 8.5 mSv/day to the growth chambers. The bloom's DNA-repair pathway reactivates within days. Compound production begins climbing back toward baseline.\n\nKel-tor nods once. 'A correct fix. A narrow fix. But it will do for now.'",
            novaClosing: "A correct fix. Narrow, but effective. The bloom will recover.",
            zelkethClosing: "The vault is repaired. But the policy that built it remains unchanged. I hope the next species from a high-radiation world is luckier than the karreth bloom."
          },
          {
            label: "File a reform recommendation: propose the Concord adopt species-specific shielding standards. Fix the policy, not just the vault.",
            bonusPoints: 10,
            bonusLabel: "Diplomatic",
            response: "Your recommendation goes to the Concord Council alongside your diagnostic report. The Rhessi delegation, who filed a similar amendment two years ago, cite your field evidence as the strongest case yet for species-specific standards.\n\nZel'keth: 'You did what the system could not do for itself \u2014 you made the invisible assumption visible. The Concord's shielding policy was built for the majority and it failed the minority. Your recommendation gives the minority a voice.'\n\nThe karreth vault gets its radiation sources. And this time, the policy changes too.",
            novaClosing: "You went further than you had to. The Concord needed someone from the outside to say what the Rhessi have been saying for two years. Good work.",
            zelkethClosing: "You did what the system could not do for itself \u2014 you made the invisible assumption visible. The shielding policy was built for the majority and it failed the minority. Your recommendation gives the minority a voice."
          },
          {
            label: "Synthesize the karreth compounds artificially. Bypass the plant \u2014 if we understand the pathway, we don't need the bloom to produce them.",
            bonusPoints: 10,
            bonusLabel: "Scientific",
            requires: { clueFound: "HORMESIS_OBLIGATE_RADIATION" },
            response: "Using the detailed hormesis data from the Federation Database, you propose a parallel track: artificial synthesis of karrethins using the documented DNA-repair enzyme cascade, replicated in a controlled lab environment with calibrated radiation inputs. No living bloom required.\n\nNova: 'That's a long-term play. The bloom still needs fixing for the short term, but if the synthesis works, the Concord never has to depend on a single plant again. Smart.'\n\nThe vault gets its radiation sources AND the synthesis research begins. Two solutions from one diagnosis.",
            novaClosing: "That's a long-term play. If the synthesis works, the Concord never depends on a single plant again. The vault gets fixed AND the research begins. Two solutions from one diagnosis.",
            zelkethClosing: "You found a way to honor the bloom's biology and free the Concord from depending on it. That is the kind of thinking Federation Liaison was created for."
          }
        ]
      },

      rankUpText: "Sometimes the most dangerous environment is the safest one. You just learned that protection can be a prison when the thing you're protecting needs what you're protecting it from.",

      explanation: {
        title: "When a Hazard Becomes a Biological Trigger",
        body: "Ionizing radiation is usually biologically damaging because it can break molecules, generate reactive species, and damage DNA. The karreth bloom is fictional alien biology built around an unusual exception: on its high-radiation homeworld, a low-level radiation signal became integrated into a repair pathway that also produces karrethins. Remove the signal, and the valuable pathway switches off.\n\nThis should not be read as a claim that Earth organisms generally benefit from or require ionizing radiation. On Earth, melanin is well established as radioprotective in fungi. Laboratory experiments have also reported increased growth or metabolic activity in some melanized fungi under particular high-radiation conditions and changes in melanin's electron-transfer properties. Those findings led researchers to propose possible radiation-energy capture, but the mechanism and ecological importance remain under study and are not equivalent to ordinary photosynthesis.\n\nThe case's established lesson is an engineering and policy lesson: a universal safety standard can fail when it ignores species-specific requirements. The radiation-dependent karreth pathway itself remains clearly labeled science fiction.",
        funFact: "Melanized fungi can be unusually radiation resistant. A 2007 laboratory study found that ionizing radiation changed melanin's electronic properties and enhanced growth or metabolic activity in several melanized fungi under specific conditions. The authors described energy capture as an intriguing possibility, not a confirmed form of fungal photosynthesis."
      },

      callHomeHints: {
        low: "Nova: 'The vault is state-of-the-art. Everything reads nominal. But the bloom is failing anyway. Ask yourself: what does nominal mean? Whose normal?'",
        mid: "Nova: 'The bloom thrived on its homeworld under conditions the Concord calls hazardous. Now it's in conditions the Concord calls perfect. One of those assessments is wrong. Check the radiation data.'",
        full: "Nova: 'You have the radiation readings, the pathway data, the homeworld conditions, and the hormesis reference. The vault is too clean. Make the diagnosis.'"
      }
    },

    // ── CASE 6: The First Garden (Bonus Finale) ─────────────────
    // Unlocks after completing all 5 main Campaign 2 cases. Hidden from
    // level select until then (isBonus: true). The inversion: aliens help
    // humans diagnose Earth's own broken mycorrhizal network. Campaign
    // finale with solution choice and sceneAlt crossfade.
    {
      id: "first_garden",
      name: "The First Garden",
      location: "Restored Terrace",
      subtitle: "Earth",
      isBonus: true,
      palette: {
        bg:        "#1a1408",
        bgMid:     "#2e2410",
        accent:    "#f59e0b",
        highlight: "#fef3c7",
        plant:     "#65a30d"
      },
      sprites: {
        scene: "sprites/c2/scene_firstgarden.png",
        sceneAlt: "sprites/c2/scene_firstgarden_healed.png"
      },
      actionLabels: {
        nova: "Consult Dr. Nova",
        vorn_shael: "Consult Vorn-Shael",
        kess: "Consult Kess",
        ilreth_mar: "Consult Ilreth-Mar",
        database: "Federation Database"
      },
      briefing: "Zel'keth: 'I am on Earth. I did not expect this to feel so... significant.' A pause. 'The first Concord agricultural summit ever held on a human world. The site is a restored garden that Dr. Nova's family has been rebuilding for decades. But the soil will not heal properly. Three Concord delegates have come to help.'\n\nNova: 'It's strange being on the other side of this. I've spent my career diagnosing alien crops. Now aliens are diagnosing mine.' A wry half-smile. 'The garden grows in patches. Some areas thrive, some fail, and I cannot figure out why. I've tried everything a human gardener knows. Maybe it takes an outside perspective.'\n\nZel'keth: 'Be warned \u2014 Delegate Ilreth-Mar is a reform skeptic. They are here to observe, not to help. And Delegate Kess... their species stopped growing food in soil thousands of years ago. Their memories of this biology are fragmented. Be patient with them.'",

      sources: {
        nova: {
          type: "conversation",
          speaker: "Dr. Nova",
          personality: "patient",
          startMood: 0,
          nodes: {
            start: {
              text: "Nova is standing at the edge of a terraced bed, sun on her shoulders, hat brim low. For the first time, you see her face \u2014 weathered, kind, older than you expected. She's not behind a screen. She's home. 'Welcome to the garden. My grandmother started restoring this land forty years ago. Three generations of work. And it still won't heal right.'",
              options: [
                { label: "What's wrong with the garden?", goto: "problem" },
                { label: "Tell me about the restoration.", goto: "history" },
                { label: "What have you already tried?", goto: "tried_everything" },
                { label: "Vorn-Shael says the chemistry is isolated \u2014 compounds in patches that don't connect.", goto: "chemical_response", requires: { clueFound: "CHEMICAL_DISCONNECTION" } },
                { label: "Kess thinks there's a fungal network that's been broken.", goto: "mycorrhizal_response", requires: { clueFound: "MYCORRHIZAL_NETWORK" } },
                { label: "The fix might require breaking Concord biosafety rules.", goto: "regulation_response", requires: { clueFound: "CONCORD_REGULATION" } },
                { label: "I'll talk to the delegates first.", goto: "exit_neutral" }
              ]
            },
            problem: {
              text: "'Look.' She gestures across the terraces. 'That bed \u2014 gorgeous. Tomatoes, squash, herbs, all thriving. But three meters away?' She points to a struggling patch. 'Same soil amendments. Same water. Same compost. Same seeds. It won't grow. The garden is a patchwork of thriving islands and dead zones, and the boundaries don't follow any pattern I can map.'",
              revealsClue: "RESTORATION_HISTORY",
              setsFlag: "nova_described_problem",
              options: [
                { label: "How long has this pattern existed?", goto: "pattern_timeline" },
                { label: "What have you tried?", goto: "tried_everything" },
                { label: "I'll check with the other delegates.", goto: "exit_neutral" }
              ]
            },
            history: {
              text: "'This was industrial land. Contaminated. My grandmother bought it for almost nothing and started the cleanup. Forty years of remediation \u2014 removing toxins, rebuilding topsoil, composting, cover-cropping. The chemistry is clean now. We verified it. Every toxicology panel comes back clear.' She touches the soil with practiced hands. 'The land is clean. But it isn't alive. Not the way it should be.'",
              revealsClue: "RESTORATION_HISTORY",
              setsFlag: "nova_described_history",
              options: [
                { label: "Clean but not alive. What's missing?", goto: "whats_missing" },
                { label: "Tell me about the patchy growth.", goto: "problem" },
                { label: "I'll investigate.", goto: "exit_neutral" }
              ]
            },
            whats_missing: {
              text: "'If I knew, I wouldn't have invited three alien delegates to my grandmother's garden.' Nova smiles, but it's tired. 'Something about the soil's structure. The way it holds together. The thriving patches feel different underfoot \u2014 springy, connected. The dead zones feel... granular. Like sand wearing a soil costume. Same chemistry, different... fabric.'",
              bonusInsight: true,
              options: [
                { label: "Connected versus disconnected. That's a structural clue.", goto: "exit_friendly" },
                { label: "I'll see what the delegates' senses can tell us.", goto: "exit_neutral" }
              ]
            },
            tried_everything: {
              text: "'pH correction \u2014 done, years ago. Irrigation uniformity \u2014 verified. Pest management \u2014 clean. Nutrient supplementation \u2014 every formula I could find. Composting \u2014 twenty years of it. Cover crops \u2014 tried six species rotations.' She counts on her fingers. 'I've ruled out everything a human gardener would think of. That's why you're here.'",
              revealsClue: "RESTORATION_HISTORY",
              setsFlag: "nova_ruled_out_basics",
              options: [
                { label: "Everything on the surface. What about underground?", goto: "underground_hint" },
                { label: "Maybe the delegates will see something you can't.", goto: "exit_friendly" }
              ]
            },
            underground_hint: {
              text: "'Underground?' Nova pauses. 'I've done soil cores. Mineral profiles. Drainage tests. But you mean something else, don't you.' She looks at the garden with fresh eyes. 'Something I can't test for because I don't know what to look for. An Earth gardener's blind spot.'",
              bonusInsight: true,
              options: [
                { label: "Exactly. Let me talk to someone who sees differently.", goto: "exit_friendly" },
                { label: "I'll check the database.", goto: "exit_neutral" }
              ]
            },
            pattern_timeline: {
              text: "'Since the beginning. The first beds my grandmother planted thrived. But as she expanded outward from those original beds, the new areas never matched. Same treatment, same inputs. The original beds are still the best. Everything else is... trying.'",
              setsFlag: "nova_mentioned_original_beds",
              options: [
                { label: "The original beds work. The expansion doesn't. Something in the original beds isn't reaching the new ones.", goto: "spreading_insight" },
                { label: "I'll investigate.", goto: "exit_neutral" }
              ]
            },
            spreading_insight: {
              text: "'Something in the original beds that can't spread...' Nova's eyes widen slightly. 'The original beds were established from mature garden soil. The expansion areas were built from scratch \u2014 clean remediated substrate with amendments. Same chemistry. But not the same... biology?' She looks at you. 'Is that possible? That we rebuilt the chemistry but not the biology?'",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "That's exactly what I'm starting to think.", goto: "exit_friendly" },
                { label: "I need to confirm it. Let me talk to Kess.", goto: "exit_neutral" }
              ]
            },
            chemical_response: {
              text: "'Compounds in patches that don't connect?' Nova's brow furrows. 'The thriving beds have good chemistry. The struggling beds have... the same chemistry, actually. But Vorn-Shael is saying the chemistry isn't flowing between them? Like each bed is an island?' She shakes her head slowly. 'That shouldn't happen in healthy soil. Healthy soil is a network.'",
              revealsClue: "RESTORATION_HISTORY",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "A network. What kind of network does healthy soil have?", goto: "network_question" },
                { label: "I'll check the database for soil network biology.", goto: "exit_friendly" }
              ]
            },
            network_question: {
              text: "'Mycorrhizal networks? The fungal... the wood wide web?' Nova stops. 'We never tested for that. We tested pH, minerals, drainage, toxins, organic matter. We never tested whether the fungal network survived the contamination. Of course it didn't survive \u2014 industrial damage would have wiped it out. And we never reinoculated because...' She trails off. 'Because I didn't think of it. Forty years.'",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "It's not your fault. It's a blind spot in how we think about soil.", goto: "exit_friendly" },
                { label: "I need to confirm this with Kess and the database.", goto: "exit_neutral" }
              ]
            },
            mycorrhizal_response: {
              text: "Nova is very quiet for a long moment. 'A fungal network. Connecting roots across zones. Sharing nutrients, water, chemical signals. We rebuilt the soil's body but not its nervous system.' She looks at the thriving original beds. 'The original beds still have their network \u2014 they were established from mature soil that already had the fungi. Everything we built from scratch doesn't.'",
              revealsClue: "RESTORATION_HISTORY",
              bonusInsight: true,
              moodShift: 2,
              options: [
                { label: "The fix is cross-zone inoculation from the healthy beds.", goto: "fix_discussion" },
                { label: "We need to check if there are any regulatory issues.", goto: "exit_friendly" }
              ]
            },
            fix_discussion: {
              text: "'Take soil from the thriving beds \u2014 soil that's full of living fungal networks \u2014 and introduce it into the dead zones. Let the fungi colonize outward the way they would naturally, just... accelerated.' Nova's voice is thick. 'Forty years. We could have done this forty years ago if we'd known to look for it.'",
              options: [
                { label: "Better late than never. But there might be a regulatory complication.", goto: "regulation_response", requires: { clueFound: "CONCORD_REGULATION" } },
                { label: "Let's make sure the science is solid first.", goto: "exit_friendly" }
              ]
            },
            regulation_response: {
              text: "'Breaking Concord rules?' Nova laughs \u2014 short, surprised. 'To fix my own garden. On my own planet. With my own soil.' A pause. 'I understand why the rules exist. Cross-species contamination is real. But this isn't cross-species anything \u2014 it's Earth fungi in Earth soil. The regulation wasn't written for this situation.'",
              setsFlag: "nova_discussed_regulation",
              options: [
                { label: "There may be precedent for an exemption.", goto: "exit_friendly" },
                { label: "We'll figure it out. The diagnosis is clear.", goto: "exit_friendly" }
              ]
            },
            annoyed: {
              text: "'The garden grows in patches. I've tried every conventional fix. The chemistry is fine but the biology is disconnected. That's everything I know.' Nova's patience holds, but her eyes are tired. 'Talk to the delegates. They can see things I can't.'",
              revealsClue: "RESTORATION_HISTORY",
              options: [
                { label: "I'll do that.", goto: "exit_neutral" }
              ]
            },
            exit_friendly: {
              text: "Nova touches the soil one more time. 'Go find out what my garden needs. I'll be here \u2014 I'm always here.'",
              moodShift: 1,
              endsConversation: true,
              exitLabel: "Thanks, Nova"
            },
            exit_neutral: {
              text: "'Take your time. The garden has waited forty years. It can wait a little longer.'",
              endsConversation: true,
              exitLabel: "Head back"
            },
            exit_cold: {
              text: "Nova says nothing. She turns back to the soil.",
              endsConversation: true,
              exitLabel: "Leave"
            }
          }
        },

        vorn_shael: {
          type: "conversation",
          speaker: "Delegate Vorn-Shael",
          personality: "stoic",
          startMood: 0,
          nodes: {
            start: {
              text: "Vorn-Shael stands at the garden's edge, sensory frills fully extended, reading the air with an alien precision that makes the hairs on your arms stand up. Their voice is flat, measured \u2014 pure observation. 'I have been mapping the chemical signatures of this site. The pattern is... unusual.'",
              options: [
                { label: "What do you see?", goto: "chemical_reading" },
                { label: "What's unusual about it?", goto: "unusual_pattern" },
                { label: "Nova says she's tried every conventional fix.", goto: "conventional_response", requires: { flagSet: "nova_ruled_out_basics" } },
                { label: "Does the chemical pattern match what Kess described?", goto: "kess_correlation", requires: { clueFound: "MYCORRHIZAL_NETWORK" } },
                { label: "I'll come back later.", goto: "exit_neutral" }
              ]
            },
            chemical_reading: {
              text: "'Phosphorus. Nitrogen. Carbon chains. Signaling compounds \u2014 auxins, cytokinins, strigolactones. All present.' Vorn-Shael's frills ripple. 'But only in discrete zones. Circular patches of approximately four to six meters diameter. Between the patches: the same compounds at trace levels only. The zones of abundance do not blend into one another. They are islands.'",
              revealsClue: "CHEMICAL_DISCONNECTION",
              setsFlag: "vorn_described_islands",
              options: [
                { label: "Islands of chemistry. No flow between them.", goto: "no_flow" },
                { label: "What would you expect in healthy ground?", goto: "healthy_comparison" },
                { label: "I'll check with the other delegates.", goto: "exit_neutral" }
              ]
            },
            unusual_pattern: {
              text: "'In my species' experience, soil chemistry is a continuum. Compounds diffuse. Gradients form. Organisms transport material through networks. Here, the compounds exist in isolated pools with sharp boundaries. This is not diffusion failure \u2014 the soil matrix can diffuse adequately. Something that should be actively transporting compounds between zones is absent.'",
              revealsClue: "CHEMICAL_DISCONNECTION",
              bonusInsight: true,
              options: [
                { label: "Active transport. Something is supposed to be moving compounds.", goto: "active_transport" },
                { label: "What could actively transport soil compounds?", goto: "transport_question" },
                { label: "I'll investigate.", goto: "exit_neutral" }
              ]
            },
            no_flow: {
              text: "'Correct. The chemistry is present but static. In a functioning soil ecosystem, I would expect to see gradient patterns indicating active transport \u2014 compounds moving from zones of high production to zones of high demand. Here, the zones of high production hoard their compounds. The zones of low production starve. The transport mechanism is missing.'",
              setsFlag: "vorn_mentioned_transport",
              options: [
                { label: "What kind of transport mechanism?", goto: "transport_question" },
                { label: "I'll ask the other delegates.", goto: "exit_neutral" }
              ]
            },
            healthy_comparison: {
              text: "'In healthy soil on my homeworld, chemical signatures form smooth gradients. Resources flow from source to sink through biological conduits. Here, I see the sources. I see the sinks. I do not see the conduits.' Vorn-Shael pauses. 'I am a chemist, not a biologist. I can describe the pattern. I cannot name what is missing.'",
              revealsClue: "CHEMICAL_DISCONNECTION",
              options: [
                { label: "Conduits. Biological connections between zones.", goto: "active_transport" },
                { label: "Maybe Kess can name it.", goto: "exit_friendly" }
              ]
            },
            active_transport: {
              text: "'On my homeworld, the biological conduits are well-characterized. Subterranean filaments that connect plant root systems and facilitate resource sharing. My species can detect the chemical wake they leave.' Vorn-Shael's frills fold inward. 'I detect no such wake here. If Earth has an equivalent organism, it is absent from this soil.'",
              bonusInsight: true,
              options: [
                { label: "Earth does have an equivalent. Mycorrhizal fungi.", goto: "kess_correlation", requires: { clueFound: "MYCORRHIZAL_NETWORK" } },
                { label: "I need to find out what Earth's equivalent is.", goto: "exit_friendly" }
              ]
            },
            transport_question: {
              text: "'I cannot answer that for Earth biology. My species' soil ecosystem uses crystalline filament organisms. Your planet's ecosystem may use something entirely different.' A precise pause. 'Delegate Kess may know. Their species had a soil-based agricultural tradition before they abandoned it. The memory may still exist in their archives \u2014 or their biology.'",
              setsFlag: "vorn_suggested_kess",
              options: [
                { label: "I'll talk to Kess.", goto: "exit_friendly" },
                { label: "I'll check the database.", goto: "exit_neutral" }
              ]
            },
            conventional_response: {
              text: "'Dr. Nova's interventions were competent and thorough. She addressed every chemical variable within her framework. The pattern I observe is not a chemical deficiency \u2014 the compounds are present. It is a distribution failure. Something that should connect these zones is missing. Her framework did not include the connecting mechanism.'",
              options: [
                { label: "Because humans don't usually think about the underground network.", goto: "exit_friendly" },
                { label: "What mechanism could connect soil zones?", goto: "transport_question" }
              ]
            },
            kess_correlation: {
              text: "'Mycorrhizal fungi.' Vorn-Shael's frills extend and hold still \u2014 the closest to excitement their species permits. 'If this fungal network performs the same function as the filament organisms on my homeworld, then its absence would produce exactly the pattern I observe: chemical islands with no transport between them. The diagnosis is consistent.'",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "The science converges. Now we need the fix.", goto: "exit_friendly" },
                { label: "I'll confirm with the database.", goto: "exit_neutral" }
              ]
            },
            annoyed: {
              text: "'The chemical pattern is clear: isolated zones of abundance with no active transport between them. The connecting mechanism is absent. I have stated this observation multiple times. I suggest consulting Delegate Kess for biological identification.'",
              revealsClue: "CHEMICAL_DISCONNECTION",
              options: [
                { label: "I'll do that.", goto: "exit_neutral" }
              ]
            },
            exit_friendly: {
              text: "Vorn-Shael's frills settle into a resting position. 'The data is clear. The interpretation requires expertise I do not possess. I trust you will find the right source.'",
              moodShift: 1,
              endsConversation: true,
              exitLabel: "Thanks"
            },
            exit_neutral: {
              text: "'I will continue mapping. The pattern does not change, but precision improves with repetition.'",
              endsConversation: true,
              exitLabel: "Head back"
            },
            exit_cold: {
              text: "Vorn-Shael says nothing. Their frills retract.",
              endsConversation: true,
              exitLabel: "Leave"
            }
          }
        },

        kess: {
          type: "conversation",
          speaker: "Delegate Kess",
          personality: "curious",
          startMood: 0,
          nodes: {
            start: {
              text: "Kess's containment vessel hums softly. Fluid bubbles rise past the preserved brain. Indicator lights pulse in patterns that might be thought. A synthesized voice emerges from the speaker grille. 'You wish to consult me about soil? My species abandoned soil cultivation three thousand years ago. But I carry the ancestral memory. It is... fragmented. Incomplete. Ask, and I will try to reconstruct.'",
              options: [
                { label: "The soil has isolated patches of good chemistry that don't connect.", goto: "first_fragment", requires: { clueFound: "CHEMICAL_DISCONNECTION" } },
                { label: "The fungal network \u2014 how does it form? How does it spread?", goto: "third_fragment", requires: { flagSet: "kess_remembered_fungi", moodIsNot: "neutral" } },
                { label: "What do the fungal filaments actually do between plants?", goto: "function_fragment", requires: { flagSet: "kess_remembered_fungi" } },
                { label: "I found database entries on mycorrhizal networks. Does this help?", goto: "database_assist", requires: { clueFound: "DATABASE_PRECEDENT" } },
                { label: "What do you remember about underground plant connections?", goto: "cold_start" },
                { label: "Do you know what a mycorrhizal network is?", goto: "direct_ask" },
                { label: "I'll come back with more context.", goto: "exit_neutral" }
              ]
            },
            cold_start: {
              text: "'Underground connections...' The indicator lights flicker rapidly \u2014 searching. 'There is something. Plants do not exist alone. They are connected by... something beneath the surface. A web. A living web.' The lights slow. 'I cannot access more. The memory is there but I cannot reach it without a more specific question. What exactly are you trying to understand?'",
              setsFlag: "kess_first_fragment",
              options: [
                { label: "Vorn-Shael found chemical signatures that exist in patches but don't flow between zones.", goto: "first_fragment", requires: { clueFound: "CHEMICAL_DISCONNECTION" } },
                { label: "I'll gather more context and come back.", goto: "exit_neutral" }
              ]
            },
            direct_ask: {
              text: "'Mycorrhizal...' A long pause. The bubbles in the vessel slow almost to stillness. 'The word is familiar. It is from your species' biological lexicon? I know this concept. I know I know it. But the specifics will not surface.' The lights pulse in frustrated patterns. 'I need context. Describe the symptoms you are observing and I may be able to reconstruct the memory around the evidence.'",
              options: [
                { label: "Compounds exist in isolated patches but don't move between zones.", goto: "first_fragment", requires: { clueFound: "CHEMICAL_DISCONNECTION" } },
                { label: "I'll get more data first.", goto: "exit_neutral" }
              ]
            },
            first_fragment: {
              text: "'Isolated patches. Chemistry present but not flowing.' The indicator lights accelerate \u2014 something is connecting. 'Yes. YES. There is an organism. Below the surface. It connects root systems. A network of filaments that carries compounds between plants across distances the roots alone cannot reach. When this organism is present, the soil is a single system. When it is absent...' The lights stutter. '...the soil is fragments. Islands. Exactly what your chemist describes.'",
              setsFlag: "kess_recognized_network",
              moodShift: 1,
              options: [
                { label: "What kind of organism? What are the filaments made of?", goto: "second_fragment" },
                { label: "That matches perfectly. Can you remember more?", goto: "second_fragment" },
                { label: "I'll check the database and come back.", goto: "exit_friendly" }
              ]
            },
            second_fragment: {
              text: "'The filaments... they are biological. Organic. Not root tissue \u2014 something else. Something that forms a partnership with roots.' The lights pulse slower now, cycling through deep patterns. 'A symbiosis. The filaments belong to a separate kingdom of life. Not plant. Not animal. The third kingdom \u2014 the one that decomposes, that connects, that bridges.' A frustrated flicker. 'Fungi. The word is fungi. The network is fungal.'",
              setsFlag: "kess_remembered_fungi",
              moodShift: 1,
              options: [
                { label: "Fungal filaments connecting plant roots underground. What else?", goto: "mood_gate_check" },
                { label: "How does the network get established?", goto: "mood_gate_check" },
                { label: "I'll verify this in the database.", goto: "exit_friendly" }
              ]
            },
            mood_gate_check: {
              text: "'There is more. I can feel it at the edge of recall \u2014 the mechanism, the requirements, how the network forms and spreads. But it will not surface.' The bubbles churn. 'My species abandoned this knowledge when we left soil behind. The memory has degraded. I need...' A pause. 'I need you to help me remember. Come back. Ask me again. Each time you ask, the pathways reconstruct a little further. This is how ancestral memory works in my kind \u2014 it requires repeated activation.'",
              options: [
                { label: "I'll come back. Take your time.", goto: "exit_friendly" },
                { label: "What would help you remember faster?", goto: "how_to_help" }
              ]
            },
            how_to_help: {
              text: "'Engagement. Curiosity. My neural architecture responds to genuine interest \u2014 the more actively you explore the topic with me, the more the old pathways light up. If you have already gathered evidence from your other sources, bring it. Frame it as a question, not a statement. Questions activate reconstruction. Statements merely confirm.'",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "I'll come back with better questions.", goto: "exit_friendly" }
              ]
            },
            function_fragment: {
              text: "'What do they do...' The lights cycle through warm amber \u2014 the memory surfacing. 'Fungal hyphae extend beyond individual roots. They help plants acquire phosphorus, nitrogen, and water in exchange for plant carbon. One fungal individual can sometimes connect multiple roots, so substances and signals may move through shared pathways \u2014 but the direction and benefit depend on the species and conditions. The soil is not one cooperative mind. It is a network of negotiated partnerships.'",
              bonusInsight: true,
              moodShift: 1,
              options: [
                { label: "And when the network is destroyed?", goto: "destruction_fragment" },
                { label: "How does it form in the first place?", goto: "third_fragment", requires: { moodIsNot: "neutral" } },
                { label: "I need to check something.", goto: "exit_friendly" }
              ]
            },
            destruction_fragment: {
              text: "'When it is destroyed...' The lights go very still. 'The individual plants survive, for a time. They have their own roots. But they are isolated. They cannot share. The surplus zones hoard. The deficit zones starve. The soil becomes exactly what your chemist described: islands of abundance surrounded by desert. The chemistry is present. The connection is not.'",
              options: [
                { label: "That's exactly what happened to this garden. How do we fix it?", goto: "third_fragment", requires: { moodIsNot: "neutral" } },
                { label: "I'll come back.", goto: "exit_friendly" }
              ]
            },
            database_assist: {
              text: "'You found records?' The lights blaze bright. 'Show me \u2014 describe what you found.' As you relay the database entries on mycorrhizal networks, Kess's vessel hums at a higher pitch. The bubbles accelerate. 'Yes. Mycorrhizal. The word. The concept. Your database confirms what my ancestral memory holds in fragments. This is the mechanism. This is what is missing from the garden.'",
              revealsClue: "MYCORRHIZAL_NETWORK",
              bonusInsight: true,
              moodShift: 2,
              options: [
                { label: "How do we restore it?", goto: "full_recovery" },
                { label: "Thank you, Kess.", goto: "exit_friendly" }
              ]
            },
            third_fragment: {
              text: "The indicator lights surge \u2014 bright, fast, cascading through colors you haven't seen before. Kess's voice changes: clearer, more confident, the ancestral memory finally surfacing in full.\n\n'MYCORRHIZAL NETWORK. Fungal hyphae \u2014 thread-like structures thinner than a hair \u2014 that colonize plant root systems and extend outward through the soil, connecting plant to plant across an entire ecosystem. The fungi provide nutrient transport. The plants provide carbon. Neither can build the network alone. It requires living fungal inoculum from established, healthy soil \u2014 you cannot create it from chemistry. You must transplant it.'",
              revealsClue: "MYCORRHIZAL_NETWORK",
              bonusInsight: true,
              moodShift: 2,
              options: [
                { label: "Transplant living soil from the healthy beds into the dead zones.", goto: "full_recovery" },
                { label: "That's the diagnosis. The garden's network was never restored.", goto: "full_recovery" }
              ]
            },
            full_recovery: {
              text: "'The original beds \u2014 the ones that thrive \u2014 they retained their fungal network because they were established from mature soil. Every expansion built from clean substrate lacks the fungi. The chemistry was restored. The biology was not.' Kess's lights settle into a steady, warm glow. 'Cross-zone inoculation. Take soil from the living beds. Introduce it to the dead zones. Let the fungi colonize outward. The network will rebuild itself in one to three growing seasons.'",
              options: [
                { label: "That's exactly what we needed. Thank you, Kess.", goto: "exit_friendly" }
              ]
            },
            annoyed: {
              text: "'The memory is fragmented. I am trying. Repeated visits help \u2014 each conversation activates the ancestral pathways a little further. But I need you to bring me evidence, not frustration. What have your other sources told you?'",
              options: [
                { label: "The chemistry is isolated in patches. The transport mechanism is missing.", goto: "first_fragment", requires: { clueFound: "CHEMICAL_DISCONNECTION" } },
                { label: "I'll come back.", goto: "exit_neutral" }
              ]
            },
            exit_friendly: {
              text: "Kess's lights dim to a warm, contented amber. 'Thank you for your patience. Each visit brings the memory closer to the surface. My ancestors grew worlds from soil. It is... good to remember that.'",
              moodShift: 1,
              endsConversation: true,
              exitLabel: "Thanks, Kess"
            },
            exit_neutral: {
              text: "'I will be here. The memory will continue to reconstruct in the background. Return when you have more questions.'",
              endsConversation: true,
              exitLabel: "Head back"
            },
            exit_cold: {
              text: "The indicator lights dim. The vessel hums quietly.",
              endsConversation: true,
              exitLabel: "Leave"
            }
          }
        },

        ilreth_mar: {
          type: "conversation",
          speaker: "Delegate Ilreth-Mar",
          personality: "prickly",
          startMood: 0,
          nodes: {
            start: {
              text: "Ilreth-Mar stands apart from the other delegates, ornate ceremonial collar rigid against the golden light. Their beaked face turns toward you with an expression that manages to be both polite and dismissive. 'The Federation liaison. Here to solve a human soil problem with alien help. The irony is not lost on me. What do you want?'",
              options: [
                { label: "I'm investigating why the garden won't heal. What's your role here?", goto: "role" },
                { label: "What do you think of the summit?", goto: "summit_opinion" },
                { label: "The fix requires moving soil between zones. Are there regulatory issues?", goto: "biosafety_overview", requires: { clueFound: "MYCORRHIZAL_NETWORK" } },
                { label: "There's legal precedent for an exemption. Would the Concord grant one?", goto: "exemption_history", requires: { clueFound: "DATABASE_PRECEDENT" } },
                { label: "I appreciate the Concord sending observers.", goto: "diplomatic_approach" },
                { label: "Must be strange watching humans struggle with their own dirt.", goto: "wrong_tone" },
                { label: "I'll talk to the other delegates first.", goto: "exit_neutral" }
              ]
            },
            role: {
              text: "'I am here as an observer for the Concord Biosafety Committee. My role is to ensure that any remediation performed at this summit complies with Concord biological safety protocols.' A precise click of the beak. 'The Concord takes contamination risk seriously. Even on Earth. Especially on Earth \u2014 you are still a probationary member.'",
              setsFlag: "ilreth_explained_role",
              options: [
                { label: "What biosafety protocols apply to soil restoration?", goto: "biosafety_overview" },
                { label: "Is there a specific regulation I should know about?", goto: "specific_reg" },
                { label: "I understand. I'll keep you informed.", goto: "exit_neutral" }
              ]
            },
            summit_opinion: {
              text: "'The summit is a gesture. A political gesture. Earth wants to demonstrate that it belongs in the Concord by hosting alien delegates on human soil.' Ilreth-Mar adjusts their collar. 'Whether the gesture succeeds depends on whether your species can solve its own problem without breaking Concord rules in the process.'",
              options: [
                { label: "What rules might be at risk?", goto: "biosafety_overview" },
                { label: "We're here to find the right answer, not the political one.", goto: "diplomatic_approach" },
                { label: "I'll investigate.", goto: "exit_neutral" }
              ]
            },
            diplomatic_approach: {
              text: "Ilreth-Mar's beak tilts \u2014 a fractional softening. 'Appreciation noted. The Concord does not send observers to obstruct. We send them to ensure that solutions are durable. A fix that violates regulations today becomes a problem for the entire Concord tomorrow.'",
              moodShift: 1,
              options: [
                { label: "That's a fair perspective. What regulations should I be aware of?", goto: "biosafety_overview" },
                { label: "I'll make sure any solution is compliant.", goto: "exit_friendly" }
              ]
            },
            wrong_tone: {
              text: "'Strange?' The collar seems to stiffen. 'It is not strange. It is instructive. Every species that has joined the Concord has faced a moment where their own biology exceeded their understanding. Humans are simply having theirs later than most.'",
              moodShift: -1,
              options: [
                { label: "You're right. I'm sorry.", goto: "diplomatic_approach" },
                { label: "I'll investigate.", goto: "exit_cold" }
              ]
            },
            biosafety_overview: {
              text: "'Section 14.7 of the Concord Biosafety Protocol. Cross-zone biological material transfer is classified as a contamination risk. Living biological material \u2014 soil, fungi, organisms \u2014 may not be moved between designated zones without prior Concord approval.' Ilreth-Mar's voice is precise. 'This garden, as a Concord summit site, is a designated zone. Any biological inoculation requires authorization.'",
              revealsClue: "CONCORD_REGULATION",
              setsFlag: "ilreth_explained_reg",
              options: [
                { label: "Even moving Earth soil within Earth?", goto: "earth_to_earth" },
                { label: "Has anyone ever gotten an exemption?", goto: "exemption_history" },
                { label: "That seems like it would block the fix.", goto: "fix_blocked" },
                { label: "I'll check the database for precedents.", goto: "exit_neutral" }
              ]
            },
            specific_reg: {
              text: "'Section 14.7. Cross-zone biological material transfer. The regulation was written after the Oolian kelp incident \u2014 a well-intentioned transplant that introduced a parasitic organism to a previously clean facility.' A sharp click. 'Good intentions do not prevent contamination. That is why the regulation exists.'",
              revealsClue: "CONCORD_REGULATION",
              options: [
                { label: "But this is Earth fungi in Earth soil. Not cross-species.", goto: "earth_to_earth" },
                { label: "I understand the rationale.", goto: "exit_neutral" }
              ]
            },
            earth_to_earth: {
              text: "'The regulation does not distinguish between cross-species and within-species transfers. It classifies all biological material movement as a contamination vector.' A pause. 'I am aware this creates absurd outcomes when applied to within-world restoration. The regulation was not designed for this situation. But it is the regulation we have.'",
              bonusInsight: true,
              options: [
                { label: "Is there a path to an exemption?", goto: "exemption_history" },
                { label: "The regulation needs updating.", goto: "reform_discussion" },
                { label: "I'll check the database.", goto: "exit_neutral" }
              ]
            },
            exemption_history: {
              text: "'Exemptions have been granted. Rarely. The Oolian kelp restoration received one \u2014 same-species, same-world, emergency agricultural exception. Case GC-2201.' Ilreth-Mar's tone is carefully neutral. 'A formal application citing that precedent would... not be unreasonable.'",
              setsFlag: "ilreth_mentioned_precedent",
              options: [
                { label: "Would you support such an application?", goto: "support_question" },
                { label: "Or we could propose reforming the regulation entirely.", goto: "reform_discussion" },
                { label: "I'll prepare the application.", goto: "exit_friendly" }
              ]
            },
            fix_blocked: {
              text: "'Blocked is a strong word. The regulation creates a procedural requirement, not a prohibition. An exemption can be granted. A reform can be proposed. Or...' The beak clicks once. '...the regulation can be ignored, and the consequences accepted later. I am not recommending that option. I am acknowledging it exists.'",
              options: [
                { label: "What would happen if someone just... did it?", goto: "consequences" },
                { label: "I'd rather work within the system.", goto: "exemption_history" },
                { label: "I'll think about it.", goto: "exit_neutral" }
              ]
            },
            consequences: {
              text: "'A formal violation of Section 14.7 at a Concord summit site? Noted in the record. A review by the Biosafety Committee. Possible sanctions against the host species.' Ilreth-Mar's eyes hold yours. 'The garden would heal. The diplomatic record would not. Whether that trade is acceptable is above my authority.'",
              options: [
                { label: "There must be a better path.", goto: "exemption_history" },
                { label: "Sometimes the right thing doesn't wait for paperwork.", goto: "pragmatic_response" }
              ]
            },
            pragmatic_response: {
              text: "Ilreth-Mar is very still. 'I have heard that argument before. From species that were right and from species that were reckless. The difference is usually only visible afterward.' A long pause. 'I will not stop you. But I will report what I observe. That is my role.'",
              setsFlag: "ilreth_warned_about_pragmatism",
              options: [
                { label: "Understood.", goto: "exit_neutral" }
              ]
            },
            reform_discussion: {
              text: "'Reform.' Ilreth-Mar's collar shifts \u2014 the first sign of genuine engagement. 'You are proposing that the regulation be amended to distinguish between cross-world contamination risk and within-world restoration?' A pause. 'That is... not unreasonable. The pattern has emerged across multiple cases: the shielding standards, the light spectrum specifications, now biosafety. The Concord's one-size-fits-all approach fails species-specific biology.'",
              revealsClue: "CONCORD_REGULATION",
              bonusInsight: true,
              moodShift: 1,
              setsFlag: "ilreth_engaged_reform",
              options: [
                { label: "Would you support a formal reform recommendation?", goto: "support_question" },
                { label: "The precedent across Campaign 2 cases makes the argument.", goto: "exit_friendly" }
              ]
            },
            support_question: {
              text: "'I am an observer, not an advocate.' Ilreth-Mar's voice is careful. 'But if a formal recommendation were filed, citing precedent, supported by field evidence from multiple cases... I would not oppose it. And my committee colleagues know the pattern as well as I do.'",
              moodShift: 1,
              options: [
                { label: "That's as close to support as I'm going to get, isn't it.", goto: "almost_support" },
                { label: "Thank you, Delegate.", goto: "exit_friendly" }
              ]
            },
            almost_support: {
              text: "The faintest movement at the corner of the beak. It might be a smile. 'You are learning how the Concord works, liaison. Not every ally announces themselves.'",
              bonusInsight: true,
              options: [
                { label: "I appreciate the quiet support.", goto: "exit_friendly" }
              ]
            },
            annoyed: {
              text: "'Section 14.7. Cross-zone biological material transfer requires Concord approval. The regulation applies to this summit site. Exemptions exist but must be formally requested. I have explained this clearly. Consult the database for precedent details.'",
              revealsClue: "CONCORD_REGULATION",
              options: [
                { label: "I'll check the database.", goto: "exit_cold" }
              ]
            },
            locked: {
              text: "'We have nothing further to discuss. The regulations are clear. The database has the precedents. File your application or don't. I am done being consulted.'",
              revealsClue: "CONCORD_REGULATION",
              endsConversation: true,
              exitLabel: "Walk away"
            },
            exit_friendly: {
              text: "Ilreth-Mar inclines their head \u2014 a precise, formal gesture. 'Proceed carefully, liaison. The garden's health and Earth's reputation both depend on the path you choose.'",
              moodShift: 1,
              endsConversation: true,
              exitLabel: "Thanks"
            },
            exit_neutral: {
              text: "'I will be observing.' Ilreth-Mar turns back to the garden, collar catching the light.",
              endsConversation: true,
              exitLabel: "Head back"
            },
            exit_cold: {
              text: "A sharp click of the beak. Ilreth-Mar does not turn.",
              endsConversation: true,
              exitLabel: "Leave"
            }
          }
        },

        database: {
          type: "archive",
          speaker: "Federation Database",
          nodes: {
            start: {
              text: "\u2014\u2014\u2014 FEDERATION DATABASE \u2014\u2014\u2014\n> Concord Xenobotany, Soil Ecology & Biosafety Records\n> Query: [mycorrhizal] [soil_network] [biosafety] [exemptions]",
              options: [
                { label: "[mycorrhizal] Mycorrhizal networks", goto: "mycorrhizal_entry", requires: { clueFound: "CHEMICAL_DISCONNECTION" } },
                { label: "[soil_network] Underground plant network biology", goto: "soil_network", requires: { clueFound: "CHEMICAL_DISCONNECTION" } },
                { label: "[biosafety] Concord biosafety regulations", goto: "biosafety", requires: { clueFound: "MYCORRHIZAL_NETWORK" } },
                { label: "[exemptions] Concord exemption precedents", goto: "exemptions", requires: { clueFound: "CONCORD_REGULATION" } },
                { label: "[search] General soil restoration query", goto: "general_query" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            general_query: {
              text: "\u2014\u2014\u2014 GENERAL QUERY: SOIL RESTORATION \u2014\u2014\u2014\n\n> Standard soil restoration protocols: pH correction, nutrient supplementation, organic matter addition, cover cropping, irrigation management.\n\n> \u26a0 Query returned only conventional interventions. For deeper biological soil structure queries, additional context is required. Specify biological mechanism of interest.",
              options: [
                { label: "[mycorrhizal] Search mycorrhizal networks", goto: "mycorrhizal_entry", requires: { clueFound: "CHEMICAL_DISCONNECTION" } },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            mycorrhizal_entry: {
              text: "\u2014\u2014\u2014 MYCORRHIZAL NETWORKS \u2014 EARTH BIOLOGY \u2014\u2014\u2014\n\nMycorrhizal fungi form symbiotic networks connecting the root systems of multiple plants across a soil ecosystem. The fungal hyphae extend far beyond individual root zones, creating an underground web that facilitates:\n\n> Nutrient transport (phosphorus, nitrogen) from source to sink\n> Water redistribution during drought stress\n> Chemical signaling between plants (defense alerts, stress hormones)\n> Carbon sharing between mature and juvenile plants\n\nCommonly called the 'wood wide web.' Present in >90% of Earth plant species. Disrupted by: industrial contamination, topsoil removal, prolonged fallow periods, heavy tillage.\n\n\u26a0 NOTE: Mycorrhizal networks do not regenerate from chemical restoration alone. They require physical reintroduction of living fungal inoculum from established, healthy soil.",
              options: [
                { label: "[soil_network] Cross-species comparison", goto: "soil_network" },
                { label: "[biosafety] Check regulations on inoculation", goto: "biosafety", requires: { clueFound: "MYCORRHIZAL_NETWORK" } },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            soil_network: {
              text: "\u2014\u2014\u2014 UNDERGROUND NETWORKS \u2014 CROSS-SPECIES SURVEY \u2014\u2014\u2014\n\nEarth: Mycorrhizal fungi (multiple phyla). Symbiotic. Transport via hyphal network.\nVorn-Shael homeworld: Crystalline filament organisms. Mutualistic. Transport via mineral conduits.\nZhel'ii: Three-who-are-one VOC signaling (aerial, not subterranean).\nOolian: Kelp anchor-root networks (marine equivalent).\n\nCommon principle: healthy ecosystems rely on biological connectivity between organisms. When the connecting organism is removed, the ecosystem fragments into isolated zones \u2014 even if the chemistry of each zone is individually adequate.\n\nThis principle was demonstrated in Campaign 1 Cases 6/6b (Zhel'ii symbiosis disruption) and Campaign 2 Case 4 (circadian signaling disruption).",
              bonusInsight: true,
              options: [
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            biosafety: {
              text: "\u2014\u2014\u2014 CONCORD BIOSAFETY REGULATION \u2014 SECTION 14.7 \u2014\u2014\u2014\n\nRegulation: Cross-zone biological material transfer is classified as a contamination risk under Concord biosafety protocols. Soil, fungal material, and living biological inoculants may not be transferred between designated zones without prior Concord approval.\n\nRationale: Prevent accidental introduction of invasive organisms, pathogens, or genetically modified biological agents across Concord-monitored sites.\n\nApplicability: This regulation was written for cross-species, cross-world transfers. Its application to within-species, within-world transfers (e.g., Earth fungi to Earth soil) is ambiguous.\n\n\u26a0 NOTE: The regulation has been cited as an obstacle to restoration projects by 3 Concord member species.",
              options: [
                { label: "[exemptions] Search for exemption precedents", goto: "exemptions", requires: { clueFound: "CONCORD_REGULATION" } },
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            exemptions: {
              text: "\u2014\u2014\u2014 CONCORD EXEMPTION PRECEDENTS \u2014\u2014\u2014\n\nCase GC-2201: Oolian kelp restoration. Within-species inoculation approved under emergency agricultural exception. Precedent established that same-species, same-world biological transfers do not constitute 'cross-zone contamination' under Section 14.7.\n\nCase GC-2445: Rhessi extremophile cultivation. Radiation-adapted organisms transferred between Rhessi facilities. Approved retroactively after Campaign 2 Case 5 reform recommendation (if filed).\n\n\u26a0 CONCLUSION: Legal precedent exists for granting an exemption. A formal application citing GC-2201 would likely succeed. A reform recommendation citing the pattern across multiple cases (light spectrum, shielding, biosafety) would carry significant weight.",
              revealsClue: "DATABASE_PRECEDENT",
              bonusInsight: true,
              options: [
                { label: "[back] Return to search", goto: "start" },
                { label: "[exit] Close database", goto: "exit_done" }
              ]
            },
            exit_done: {
              text: "> query complete",
              endsConversation: true,
              exitLabel: "Back to Field Notes"
            }
          }
        }
      },

      clues: [
        {
          action: "nova",
          label: "Consult Dr. Nova",
          icon: "\ud83d\udc69\u200d\ud83c\udf3e",
          speaker: "Dr. Nova",
          sprites: {
            spritesheet:     "sprites/c2/nova/spritesheet_unmasked.png",
            spritesheetJson: "sprites/c2/nova/spritesheet_unmasked.json",
            actionIcon:      "portrait_species_human.png"
          },
          text: "See dialogue tree.",
          clueTag: "RESTORATION_HISTORY",
          learned: "Nova's family spent 40 years restoring this land. Every conventional fix has been tried. The chemistry is clean but the soil grows in disconnected patches."
        },
        {
          action: "vorn_shael",
          label: "Consult Vorn-Shael",
          icon: "\ud83d\udc7d",
          speaker: "Delegate Vorn-Shael",
          sprites: {
            spritesheet:     "sprites/c2/delegate_shael/spritesheet.png",
            spritesheetJson: "sprites/c2/delegate_shael/spritesheet.json"
          },
          text: "See dialogue tree.",
          clueTag: "CHEMICAL_DISCONNECTION",
          learned: "Chemical signatures exist in isolated patches but don't flow between zones. The biological transport mechanism connecting them is absent."
        },
        {
          action: "kess",
          label: "Consult Kess",
          icon: "\ud83e\uddea",
          speaker: "Delegate Kess",
          sprites: {
            spritesheet:     "sprites/c2/delegate_kess/spritesheet.png",
            spritesheetJson: "sprites/c2/delegate_kess/spritesheet.json"
          },
          text: "See dialogue tree.",
          clueTag: "MYCORRHIZAL_NETWORK",
          learned: "The missing connection is a mycorrhizal fungal network \u2014 underground hyphae that link plant roots across zones. It was destroyed by the original contamination and never restored."
        },
        {
          action: "ilreth_mar",
          label: "Consult Ilreth-Mar",
          icon: "\ud83e\udd85",
          speaker: "Delegate Ilreth-Mar",
          sprites: {
            spritesheet:     "sprites/c2/delegate_ilreth/spritesheet.png",
            spritesheetJson: "sprites/c2/delegate_ilreth/spritesheet.json"
          },
          text: "See dialogue tree.",
          clueTag: "CONCORD_REGULATION",
          learned: "Concord biosafety regulations forbid cross-zone biological inoculation as a contamination risk. The correct fix is technically illegal under current rules."
        },
        {
          action: "database",
          label: "Federation Database",
          icon: "\ud83d\udef0\ufe0f",
          speaker: "Federation Database",
          sprites: {
            portrait:   "portrait_database.png",
            actionIcon: "icon_database.png"
          },
          text: "See database.",
          clueTag: "DATABASE_PRECEDENT",
          learned: "Legal precedent exists for within-species soil inoculation exemptions. A reform recommendation citing the pattern across Campaign 2 cases would carry weight."
        }
      ],

      diagnoses: [
        {
          id: "mycorrhizal",
          label: "Loss of compatible mycorrhizal partners \u2014 the restored soil chemistry is suitable, but the fungal-root partnerships needed for efficient nutrient acquisition and connected growth were not re-established. A controlled inoculation trial is warranted.",
          isCorrect: true
        },
        {
          id: "ph_imbalance",
          label: "Soil pH imbalance from residual concrete leaching into the restored beds.",
          isCorrect: false,
          hint: "Nova's family corrected pH years ago and verified it. The chemistry is clean. The problem is deeper than surface chemistry."
        },
        {
          id: "irrigation",
          label: "Inconsistent irrigation creating drought stress in the struggling zones.",
          isCorrect: false,
          hint: "Vorn-Shael's chemical data shows compounds ARE present everywhere \u2014 they're just not flowing between zones. This isn't a water problem, it's a connectivity problem."
        },
        {
          id: "invasive",
          label: "Invasive organisms from the Concord delegates' ships are disrupting local biology.",
          isCorrect: false,
          hint: "The Concord biosafety protocols have been followed strictly \u2014 that's actually part of the problem. The politically convenient answer is rarely the scientifically correct one."
        }
      ],

      solutionChoice: {
        prompt: "Your diagnosis is supported \u2014 the restored beds appear to be missing compatible mycorrhizal partners after the industrial damage. A controlled inoculation trial using soil or cultured fungi from the healthy original beds is the best-supported next step, with monitoring to test whether connectivity and plant performance improve. But Concord biosafety regulations technically forbid the transfer. How do you proceed?",
        options: [
          {
            label: "Apply for the exemption: use the legal precedent from Case GC-2201 to formally request Concord approval before inoculating.",
            bonusPoints: 0,
            response: "The formal application is filed. The precedent is strong. Weeks later, approval comes through. The monitored inoculation trial begins \u2014 slowly, through legitimate channels. The garden will heal. Eventually.\n\nIlreth-Mar nods approvingly. 'The system works. It is slow, but it works.'",
            novaClosing: "The garden will heal. It took forty years to get here and it'll take a few more to finish. But we did it right.",
            zelkethClosing: "You honored the system. The garden recovers. The precedent strengthens. Patience is its own kind of courage."
          },
          {
            label: "Inoculate now, file paperwork after: the garden has waited forty years. Do the right thing immediately and accept procedural consequences.",
            bonusPoints: 10,
            bonusLabel: "Pragmatic",
            response: "You walk to the thriving beds, take a handful of living soil, and work it into the dead zones yourself. Nova watches with tears in her eyes. The paperwork can wait.\n\nThe Concord notes the violation. Ilreth-Mar is displeased. Nova is quietly, fiercely proud. The inoculation trial begins that afternoon; recovery will be measured over the coming weeks.",
            novaClosing: "You did what I couldn't do for forty years \u2014 you stopped asking permission and started fixing. Thank you.",
            zelkethClosing: "The garden heals. The Concord will have questions. But some questions are worth answering after the fact."
          },
          {
            label: "File a formal reform recommendation: propose species-specific biosafety standards that distinguish within-world restoration from cross-world contamination risk.",
            bonusPoints: 10,
            bonusLabel: "Diplomatic",
            requires: { clueFound: "DATABASE_PRECEDENT" },
            response: "Your recommendation goes to the Concord Council \u2014 not just for this garden, but for every restoration project held hostage by policies that don't distinguish between contamination and healing. The pattern is undeniable: light spectrum, shielding standards, biosafety rules. The Concord's one-size-fits-all approach fails biology.\n\nZel'keth's chromatophores bloom in colors you've never seen. 'This is why Federation Liaison exists. Not to solve one case. To change the system that creates the cases.'",
            novaClosing: "You didn't just fix my garden. You fixed the rule that prevented every garden like it. That's the difference between a technician and a liaison.",
            zelkethClosing: "When I first met humans, I gave you a seed and hoped you would understand what it meant. You understood. And now you are teaching the Concord what we taught you."
          }
        ]
      },

      rankUpText: "The deepest connections are the ones you can't see. You just learned that restoring a place means restoring its relationships \u2014 not just its chemistry. And sometimes the hardest part isn't finding the answer. It's changing the rules that stand in its way.",

      explanation: {
        title: "Mycorrhizae: Underground Partnerships in Ecosystems",
        body: "Many land plants form partnerships with mycorrhizal fungi. The fungi grow fine hyphae through soil, receive carbon compounds from plants, and help their plant partners obtain resources such as phosphorus, nitrogen, and water. A single fungal individual can colonize more than one root system, creating a common mycorrhizal network.\n\nExperiments show that carbon, nutrients, water, and signaling compounds can sometimes move among organisms associated with these networks. What those movements mean ecologically is still debated. The amount transferred, the direction of transfer, and whether a receiving plant benefits vary with fungal species, plant species, soil conditions, competition, and experimental design. Current evidence does not support a universal claim that mature 'mother trees' preferentially feed seedlings or that forests behave as one cooperative organism.\n\nIndustrial disturbance can damage soil fungal communities as well as soil chemistry. Restoration may therefore need to rebuild biological partnerships, but inoculation is not a guaranteed one-step cure. Fungal identity, host compatibility, soil conditions, contamination risk, and monitoring all matter. In this fictional case, the evidence makes missing compatible mycorrhizal partners a plausible limiting factor, so a controlled inoculation trial is the scientifically responsible next step.",
        funFact: "In 2026, researchers produced the first global map estimating the density of arbuscular mycorrhizal fungal networks, calculating about 110 quadrillion kilometers of living hyphae in Earth's topsoils. A separate 2023 synthesis estimated that plants allocate about 13.12 gigatons of CO\u2082-equivalent carbon to mycorrhizal mycelium each year \u2014 an annual carbon flux, not a measurement of permanent carbon storage."
      },

      // No callHomeHints — we are home.
      callHomeHints: null
    }

  ]
};
