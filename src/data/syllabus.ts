// =====================================================
// MAGIC LEARNING WORLD — COMPLETE SYLLABUS DATA
// Philippines K-12 Curriculum (LKG to Grade 12)
// FROZEN STRUCTURE — Production Ready
// =====================================================

export type ExamComponent = {
  name: string;
  weight: number; // percentage
};

export type Material = {
  type: "video" | "audio" | "interactive" | "worksheet" | "flashcard" | "project" | "reading";
  title: string;
};

export type Chapter = {
  id: string;
  name: string;
  topics: string[];
  materials: Material[];
  estimatedHours: number;
};

export type ExamPattern = {
  components: ExamComponent[];
  difficulty: { easy: number; moderate: number; advanced: number };
};

export type Subject = {
  id: string;
  name: string;
  emoji: string;
  color: string; // tailwind class
  overview: string;
  objectives: string[];
  chapters: Chapter[];
  examPattern: ExamPattern;
  assessmentFlow: string[];
  projectWork?: string;
  skillMapping: string[];
};

export type GradeLevel = {
  id: string;
  name: string;
  emoji: string;
  stage: "kindergarten" | "foundation" | "intermediate" | "junior-high" | "senior-high";
  strand?: string;
  subjects: Subject[];
};

// =====================================================
// ASSESSMENT FLOW (applies to all grades, adapted)
// =====================================================
export const universalAssessmentFlow = [
  "Diagnostic (Pre-Test)",
  "Practice Quiz",
  "Chapter Test",
  "Monthly Test",
  "Quarterly Exam",
  "Annual Exam",
  "Performance Task",
];

export const universalDifficulty = { easy: 30, moderate: 40, advanced: 30 };

// STRONGER EXAM MODEL (Knowledge + Application + Project + Critical Thinking + Creativity)
export const strongerExamPattern: ExamPattern = {
  components: [
    { name: "Knowledge", weight: 25 },
    { name: "Application", weight: 25 },
    { name: "Project", weight: 25 },
    { name: "Critical Thinking", weight: 15 },
    { name: "Creativity", weight: 10 },
  ],
  difficulty: universalDifficulty,
};

// =====================================================
// MATERIAL TEMPLATES
// =====================================================
const kgMaterials = (topic: string): Material[] => [
  { type: "video", title: `Animated ${topic} Introduction` },
  { type: "audio", title: `${topic} Sound Box` },
  { type: "flashcard", title: `${topic} Picture Flashcards` },
  { type: "interactive", title: `${topic} Drag & Drop Activity` },
  { type: "worksheet", title: `${topic} Tracing Worksheet` },
];

const stdMaterials = (topic: string): Material[] => [
  { type: "video", title: `${topic} Video Lesson` },
  { type: "reading", title: `${topic} Concept Explanation` },
  { type: "interactive", title: `${topic} Guided Practice` },
  { type: "interactive", title: `${topic} Independent Practice` },
  { type: "worksheet", title: `${topic} Worksheet` },
  { type: "project", title: `${topic} Project Task` },
];

const shsMaterials = (topic: string): Material[] => [
  { type: "video", title: `${topic} Lecture` },
  { type: "reading", title: `${topic} Reading Material` },
  { type: "interactive", title: `${topic} Application Exercise` },
  { type: "interactive", title: `${topic} Critical Thinking Activity` },
  { type: "project", title: `${topic} Research/Project` },
];

// Helper
let chapterId = 0;
const ch = (name: string, topics: string[], materials: Material[], hours = 3): Chapter => ({
  id: `ch-${++chapterId}`,
  name,
  topics,
  materials,
  estimatedHours: hours,
});

// =====================================================
// KINDERGARTEN — LKG
// =====================================================
const lkgSubjects: Subject[] = [
  {
    id: "lkg-english",
    name: "English Literacy",
    emoji: "📖",
    color: "text-magic-blue",
    overview: "Foundation in letter recognition, phonics, and basic vocabulary through play-based learning.",
    objectives: [
      "Recognize uppercase and lowercase letters",
      "Associate letters with sounds (phonics)",
      "Read simple CVC words",
      "Listen and respond to stories",
    ],
    chapters: [
      ch("Alphabet Recognition", ["Uppercase A-Z", "Lowercase a-z", "Letter Matching"], kgMaterials("Alphabet"), 4),
      ch("Phonics", ["Consonant Sounds", "Vowel Sounds", "Blending"], kgMaterials("Phonics"), 5),
      ch("CVC Words", ["Three-letter words", "Word Families", "Reading CVC Words"], kgMaterials("CVC Words"), 4),
      ch("Simple Sentences", ["Subject + Verb", "Sight Words", "Sentence Reading"], kgMaterials("Sentences"), 3),
      ch("Story Listening", ["Story Comprehension", "Sequencing", "Retelling"], kgMaterials("Stories"), 3),
    ],
    examPattern: {
      components: [
        { name: "Oral Recognition", weight: 40 },
        { name: "Picture Match", weight: 30 },
        { name: "Sound Identification", weight: 30 },
      ],
      difficulty: { easy: 50, moderate: 35, advanced: 15 },
    },
    assessmentFlow: ["Oral Recognition", "Picture-Based Quiz", "Sound Identification", "Performance Task"],
    skillMapping: ["Letter Recognition", "Phonemic Awareness", "Listening Comprehension", "Basic Vocabulary"],
  },
  {
    id: "lkg-filipino",
    name: "Filipino Literacy",
    emoji: "🇵🇭",
    color: "text-coral",
    overview: "Pagkilala sa alpabetong Filipino, pagbasa ng mga salita, at pakikinig sa mga kwento.",
    objectives: [
      "Kilalanin ang alpabetong Filipino",
      "Basahin ang mga simpleng salita",
      "Makinig at umunawa sa mga kwento",
    ],
    chapters: [
      ch("Alpabetong Filipino", ["Mga Patinig", "Mga Katinig", "Pagkilala sa Letra"], kgMaterials("Alpabeto"), 4),
      ch("Mga Salita", ["Dalawang-pantig", "Tatlong-pantig", "Pagbasa ng Salita"], kgMaterials("Salita"), 4),
      ch("Mga Kwento", ["Pakikinig", "Pag-unawa", "Muling Pagsasalaysay"], kgMaterials("Kwento"), 3),
    ],
    examPattern: {
      components: [
        { name: "Oral Pagkilala", weight: 40 },
        { name: "Pagpapares ng Larawan", weight: 30 },
        { name: "Tunog ng Letra", weight: 30 },
      ],
      difficulty: { easy: 50, moderate: 35, advanced: 15 },
    },
    assessmentFlow: ["Oral Recognition", "Picture Quiz", "Performance Task"],
    skillMapping: ["Pagkilala sa Letra", "Phonemic Awareness", "Pakikinig"],
  },
  {
    id: "lkg-math",
    name: "Mathematics",
    emoji: "🔢",
    color: "text-primary",
    overview: "Introduction to numbers, counting, shapes, and patterns through hands-on activities.",
    objectives: [
      "Count numbers 1–50",
      "Recognize basic shapes",
      "Identify simple patterns",
      "Perform basic addition with objects",
    ],
    chapters: [
      ch("Numbers 1–50", ["Number Recognition", "Counting Objects", "Number Order"], kgMaterials("Numbers"), 5),
      ch("Shapes", ["Circle, Square, Triangle", "Rectangle, Star", "Shape Sorting"], kgMaterials("Shapes"), 3),
      ch("Colors & Patterns", ["Primary Colors", "Patterns (AB, ABC)", "Color Sorting"], kgMaterials("Patterns"), 3),
      ch("Basic Addition", ["Adding with Objects", "Number Bonds to 10", "Story Problems"], kgMaterials("Addition"), 4),
    ],
    examPattern: {
      components: [
        { name: "Object Counting", weight: 35 },
        { name: "Number Order", weight: 30 },
        { name: "Shape Identification", weight: 35 },
      ],
      difficulty: { easy: 50, moderate: 35, advanced: 15 },
    },
    assessmentFlow: ["Counting Activity", "Shape Quiz", "Pattern Game", "Performance Task"],
    skillMapping: ["Number Sense", "Shape Recognition", "Pattern Identification", "Basic Operations"],
  },
  {
    id: "lkg-science",
    name: "Science Awareness",
    emoji: "🔬",
    color: "text-xp-green",
    overview: "Exploring the world through observation — plants, animals, body, and weather.",
    objectives: [
      "Identify common plants and animals",
      "Name body parts",
      "Describe weather types",
      "Practice healthy habits",
    ],
    chapters: [
      ch("Plants", ["Parts of a Plant", "Plant Needs", "Types of Plants"], kgMaterials("Plants"), 2),
      ch("Animals", ["Farm Animals", "Wild Animals", "Animal Sounds"], kgMaterials("Animals"), 2),
      ch("My Body", ["Body Parts", "Five Senses", "Hygiene"], kgMaterials("Body"), 3),
      ch("Weather", ["Sunny, Rainy, Cloudy", "Seasons", "Weather Clothing"], kgMaterials("Weather"), 2),
    ],
    examPattern: {
      components: [
        { name: "Picture-Based Quiz", weight: 50 },
        { name: "Oral Questions", weight: 50 },
      ],
      difficulty: { easy: 60, moderate: 30, advanced: 10 },
    },
    assessmentFlow: ["Picture Quiz", "Oral Assessment", "Performance Task"],
    skillMapping: ["Observation", "Classification", "Scientific Curiosity"],
  },
  {
    id: "lkg-values",
    name: "Values Education",
    emoji: "💖",
    color: "text-coral",
    overview: "Learning good manners, respect, sharing, and positive character traits.",
    objectives: ["Practice good manners", "Show respect and kindness", "Learn about sharing"],
    chapters: [
      ch("Good Manners", ["Saying Please & Thank You", "Greetings", "Table Manners"], kgMaterials("Manners"), 2),
      ch("Sharing & Caring", ["Sharing Toys", "Helping Others", "Being Kind"], kgMaterials("Sharing"), 2),
      ch("Respect", ["Respecting Elders", "Following Rules", "Listening"], kgMaterials("Respect"), 2),
    ],
    examPattern: {
      components: [
        { name: "Role Play", weight: 50 },
        { name: "Picture Scenario", weight: 50 },
      ],
      difficulty: { easy: 60, moderate: 30, advanced: 10 },
    },
    assessmentFlow: ["Role Play Activity", "Scenario Quiz", "Performance Task"],
    skillMapping: ["Social Skills", "Empathy", "Respect"],
  },
  {
    id: "lkg-mapeh",
    name: "MAPEH",
    emoji: "🎵",
    color: "text-magic-purple",
    overview: "Music, Arts, Physical Education, and Health foundations through fun activities.",
    objectives: ["Sing simple songs", "Draw and color", "Perform basic exercises", "Learn hygiene"],
    chapters: [
      ch("Music Rhymes", ["Nursery Rhymes", "Rhythm Clapping", "Singing"], kgMaterials("Music"), 2),
      ch("Drawing & Coloring", ["Lines & Shapes", "Free Drawing", "Coloring Within Lines"], kgMaterials("Art"), 2),
      ch("Physical Activities", ["Stretching", "Running Games", "Balance"], kgMaterials("PE"), 2),
      ch("Health Basics", ["Handwashing", "Brushing Teeth", "Healthy Food"], kgMaterials("Health"), 2),
    ],
    examPattern: {
      components: [
        { name: "Performance Activity", weight: 60 },
        { name: "Picture Quiz", weight: 40 },
      ],
      difficulty: { easy: 60, moderate: 30, advanced: 10 },
    },
    assessmentFlow: ["Performance Activity", "Picture Quiz"],
    skillMapping: ["Creativity", "Physical Fitness", "Health Awareness"],
  },
  {
    id: "lkg-motor",
    name: "Motor Skills",
    emoji: "✋",
    color: "text-streak-orange",
    overview: "Fine and gross motor skill development through tracing, cutting, and movement.",
    objectives: ["Trace lines and curves", "Cut with scissors", "Build with blocks"],
    chapters: [
      ch("Tracing", ["Straight Lines", "Curves", "Zigzag"], kgMaterials("Tracing"), 2),
      ch("Cutting & Pasting", ["Scissor Skills", "Paper Tearing", "Gluing"], kgMaterials("Cutting"), 2),
      ch("Building", ["Block Stacking", "Puzzle Solving", "Lego Building"], kgMaterials("Building"), 2),
    ],
    examPattern: {
      components: [
        { name: "Performance Task", weight: 70 },
        { name: "Observation", weight: 30 },
      ],
      difficulty: { easy: 70, moderate: 20, advanced: 10 },
    },
    assessmentFlow: ["Performance Task", "Teacher Observation"],
    skillMapping: ["Fine Motor", "Gross Motor", "Hand-Eye Coordination"],
  },
  {
    id: "lkg-creative",
    name: "Creative Expression",
    emoji: "🎨",
    color: "text-magic-purple",
    overview: "Exploring creativity through play, storytelling, drama, and art.",
    objectives: ["Express ideas through art", "Participate in pretend play", "Tell short stories"],
    chapters: [
      ch("Creative Play", ["Pretend Play", "Role Playing", "Puppet Show"], kgMaterials("Play"), 2),
      ch("Storytelling", ["Picture Stories", "Sequencing", "Creating Stories"], kgMaterials("Storytelling"), 2),
      ch("Art Expression", ["Finger Painting", "Clay Modeling", "Collage"], kgMaterials("ArtExpression"), 2),
    ],
    examPattern: {
      components: [
        { name: "Portfolio", weight: 50 },
        { name: "Performance", weight: 50 },
      ],
      difficulty: { easy: 60, moderate: 30, advanced: 10 },
    },
    assessmentFlow: ["Portfolio Review", "Performance Showcase"],
    skillMapping: ["Creativity", "Self-Expression", "Imagination"],
  },
];

// =====================================================
// UKG
// =====================================================
const ukgSubjects: Subject[] = lkgSubjects.map((s) => {
  const enhanced = { ...s, id: s.id.replace("lkg", "ukg") };
  // Add advanced chapters for UKG
  if (s.name === "English Literacy") {
    enhanced.chapters = [
      ...s.chapters,
      ch("Sentence Reading", ["Reading Short Sentences", "Comprehension Questions", "Fluency Practice"], kgMaterials("SentenceReading"), 4),
      ch("Storytelling", ["Story Retelling", "Character Identification", "Predicting Endings"], kgMaterials("AdvStory"), 3),
    ];
  }
  if (s.name === "Mathematics") {
    enhanced.chapters = [
      ch("Numbers 1–100", ["Number Recognition 50-100", "Counting by 2s, 5s, 10s", "Number Comparison"], kgMaterials("Numbers100"), 5),
      ...s.chapters.slice(1),
      ch("Subtraction", ["Taking Away", "Number Bonds", "Subtraction Stories"], kgMaterials("Subtraction"), 4),
    ];
  }
  if (s.name === "Science Awareness") {
    enhanced.chapters = [
      ...s.chapters,
      ch("Community Helpers", ["Doctor, Teacher, Firefighter", "How They Help", "Career Role Play"], kgMaterials("Community"), 2),
      ch("Basic Hygiene", ["Personal Hygiene", "Food Safety", "Clean Environment"], kgMaterials("Hygiene"), 2),
    ];
  }
  return enhanced;
});

// =====================================================
// GRADE 1
// =====================================================
const g1Subjects: Subject[] = [
  {
    id: "g1-english",
    name: "English",
    emoji: "📖",
    color: "text-magic-blue",
    overview: "Building reading fluency, sentence construction, and foundational grammar skills.",
    objectives: ["Read grade-level texts", "Write complete sentences", "Identify parts of speech", "Retell stories"],
    chapters: [
      ch("Nouns", ["Common Nouns", "Proper Nouns", "Singular & Plural"], stdMaterials("Nouns"), 3),
      ch("Verbs", ["Action Words", "Past & Present", "Subject-Verb Agreement"], stdMaterials("Verbs"), 3),
      ch("Sentence Formation", ["Subject + Predicate", "Types of Sentences", "Punctuation"], stdMaterials("Sentences"), 4),
      ch("Reading Stories", ["Story Elements", "Comprehension", "Sequencing"], stdMaterials("Reading"), 4),
      ch("Writing", ["Handwriting Practice", "Simple Paragraphs", "Creative Writing"], stdMaterials("Writing"), 3),
    ],
    examPattern: {
      components: [
        { name: "MCQ", weight: 30 },
        { name: "Fill in the Blanks", weight: 20 },
        { name: "Short Answer", weight: 20 },
        { name: "Reading Passage", weight: 30 },
      ],
      difficulty: universalDifficulty,
    },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Reading", "Writing", "Grammar", "Comprehension"],
  },
  {
    id: "g1-filipino",
    name: "Filipino",
    emoji: "🇵🇭",
    color: "text-coral",
    overview: "Pagpapaunlad ng kasanayan sa pagbasa at pagsulat sa Filipino.",
    objectives: ["Bumasa ng mga pangungusap", "Sumulat ng mga talata", "Umunawa sa mga binasang teksto"],
    chapters: [
      ch("Pagbasa", ["Pagkilala sa Salita", "Pag-unawa sa Binasa", "Malikhaing Pagbasa"], stdMaterials("Pagbasa"), 4),
      ch("Pagsulat", ["Tamang Pagbabaybay", "Pagbuo ng Pangungusap", "Simpleng Talata"], stdMaterials("Pagsulat"), 3),
      ch("Wika", ["Pangngalan", "Pandiwa", "Pang-uri"], stdMaterials("Wika"), 3),
    ],
    examPattern: {
      components: [
        { name: "MCQ", weight: 30 },
        { name: "Pagpuno ng Patlang", weight: 20 },
        { name: "Maikling Sagot", weight: 20 },
        { name: "Pagbasa", weight: 30 },
      ],
      difficulty: universalDifficulty,
    },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Pagbasa", "Pagsulat", "Wika", "Pag-unawa"],
  },
  {
    id: "g1-math",
    name: "Mathematics",
    emoji: "🔢",
    color: "text-primary",
    overview: "Mastering place value, basic operations, time, and money concepts.",
    objectives: ["Understand place value to 100", "Add and subtract within 100", "Tell time", "Count money"],
    chapters: [
      ch("Place Value", ["Ones & Tens", "Hundreds", "Expanded Form"], stdMaterials("PlaceValue"), 4),
      ch("Addition", ["Adding 2-Digit Numbers", "Regrouping", "Word Problems"], stdMaterials("Addition"), 5),
      ch("Subtraction", ["Subtracting 2-Digit Numbers", "Borrowing", "Word Problems"], stdMaterials("Subtraction"), 5),
      ch("Time", ["Hours & Minutes", "AM & PM", "Reading Clocks"], stdMaterials("Time"), 3),
      ch("Money", ["Philippine Coins", "Philippine Bills", "Simple Transactions"], stdMaterials("Money"), 3),
    ],
    examPattern: {
      components: [
        { name: "Objective", weight: 40 },
        { name: "Problem Solving", weight: 40 },
        { name: "Word Problems", weight: 20 },
      ],
      difficulty: universalDifficulty,
    },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Number Sense", "Operations", "Measurement", "Problem Solving"],
  },
  {
    id: "g1-science",
    name: "Science",
    emoji: "🔬",
    color: "text-xp-green",
    overview: "Exploring the natural world through observation and simple experiments.",
    objectives: ["Classify living and non-living things", "Identify body parts", "Describe weather patterns"],
    chapters: [
      ch("Living vs Non-Living", ["Characteristics of Life", "Classification", "Examples"], stdMaterials("Living"), 3),
      ch("Body Parts", ["External Parts", "Internal Organs Intro", "Five Senses"], stdMaterials("Body"), 3),
      ch("Weather", ["Types of Weather", "Weather Instruments", "Weather Diary"], stdMaterials("Weather"), 3),
      ch("Plants & Animals", ["Plant Parts", "Animal Groups", "Habitat Intro"], stdMaterials("PlantsAnimals"), 3),
    ],
    examPattern: {
      components: [
        { name: "MCQ", weight: 40 },
        { name: "Diagram Labeling", weight: 20 },
        { name: "Short Explanation", weight: 40 },
      ],
      difficulty: universalDifficulty,
    },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Observation", "Classification", "Scientific Thinking"],
  },
  {
    id: "g1-ap",
    name: "Araling Panlipunan",
    emoji: "🌏",
    color: "text-secondary",
    overview: "Learning about family, community, and Philippine national symbols.",
    objectives: ["Describe family structure", "Identify community helpers", "Recognize Philippine symbols"],
    chapters: [
      ch("Family", ["Family Members", "Roles & Responsibilities", "Family Tree"], stdMaterials("Family"), 2),
      ch("Community", ["Community Places", "Community Helpers", "Rules & Laws"], stdMaterials("Community"), 3),
      ch("Philippine Symbols", ["National Flag", "National Anthem", "National Heroes"], stdMaterials("PHSymbols"), 3),
    ],
    examPattern: {
      components: [
        { name: "Objective", weight: 50 },
        { name: "Short Answer", weight: 30 },
        { name: "Project", weight: 20 },
      ],
      difficulty: universalDifficulty,
    },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Social Awareness", "National Identity", "Civic Responsibility"],
  },
  {
    id: "g1-mapeh",
    name: "MAPEH",
    emoji: "🎵",
    color: "text-magic-purple",
    overview: "Music, Arts, Physical Education, and Health for holistic development.",
    objectives: ["Sing and move to music", "Create art projects", "Participate in physical activities", "Practice health habits"],
    chapters: [
      ch("Music", ["Rhythm & Beat", "Singing Songs", "Musical Instruments"], stdMaterials("Music"), 2),
      ch("Arts", ["Drawing & Painting", "Color Theory", "Art Appreciation"], stdMaterials("Arts"), 2),
      ch("PE", ["Movement Activities", "Games & Sports Intro", "Fitness"], stdMaterials("PE"), 2),
      ch("Health", ["Nutrition", "Personal Hygiene", "Safety"], stdMaterials("Health"), 2),
    ],
    examPattern: {
      components: [
        { name: "Performance", weight: 50 },
        { name: "Written Quiz", weight: 30 },
        { name: "Project", weight: 20 },
      ],
      difficulty: { easy: 40, moderate: 40, advanced: 20 },
    },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Musical Ability", "Creativity", "Physical Fitness", "Health Awareness"],
  },
  {
    id: "g1-values",
    name: "Values Education",
    emoji: "💖",
    color: "text-coral",
    overview: "Building character through values of honesty, respect, and responsibility.",
    objectives: ["Demonstrate honesty", "Show respect for others", "Practice responsibility"],
    chapters: [
      ch("Honesty", ["Telling the Truth", "Being Truthful", "Trust"], stdMaterials("Honesty"), 2),
      ch("Responsibility", ["Taking Care of Things", "Doing Duties", "Being Reliable"], stdMaterials("Responsibility"), 2),
      ch("Respect", ["Respecting Others", "Accepting Differences", "Being Polite"], stdMaterials("Respect"), 2),
    ],
    examPattern: {
      components: [
        { name: "Scenario Questions", weight: 40 },
        { name: "Role Play", weight: 30 },
        { name: "Reflection Essay", weight: 30 },
      ],
      difficulty: { easy: 40, moderate: 40, advanced: 20 },
    },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Character", "Social Skills", "Moral Reasoning"],
  },
  {
    id: "g1-ict",
    name: "ICT Intro",
    emoji: "💻",
    color: "text-magic-blue",
    overview: "Basic computer awareness and digital citizenship fundamentals.",
    objectives: ["Identify computer parts", "Use mouse and keyboard", "Practice digital safety"],
    chapters: [
      ch("Computer Basics", ["Parts of Computer", "Mouse & Keyboard", "Starting a Computer"], stdMaterials("ComputerBasics"), 3),
      ch("Digital Safety", ["Online Safety", "Password Basics", "Being Responsible Online"], stdMaterials("DigitalSafety"), 2),
    ],
    examPattern: {
      components: [
        { name: "Practical", weight: 50 },
        { name: "Written Quiz", weight: 50 },
      ],
      difficulty: { easy: 50, moderate: 35, advanced: 15 },
    },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Computer Literacy", "Digital Citizenship"],
  },
];

// =====================================================
// GRADES 2–3 (extend Grade 1 with additions)
// =====================================================
const extendSubjects = (base: Subject[], grade: string, additions: Record<string, Chapter[]>): Subject[] =>
  base.map((s) => {
    const extra = additions[s.name] || [];
    return {
      ...s,
      id: s.id.replace(/g\d+/, grade),
      chapters: [...s.chapters, ...extra],
    };
  });

const g2Subjects = extendSubjects(g1Subjects, "g2", {
  "English": [
    ch("Adjectives & Adverbs", ["Describing Words", "Comparison", "Using Adverbs"], stdMaterials("Adjectives"), 3),
    ch("Paragraph Writing", ["Topic Sentence", "Supporting Details", "Conclusion"], stdMaterials("Paragraphs"), 3),
  ],
  "Mathematics": [
    ch("Multiplication Intro", ["Multiplication as Repeated Addition", "Times Tables 2-5", "Word Problems"], stdMaterials("Multiplication"), 5),
    ch("Fractions Intro", ["Halves & Quarters", "Fraction Pictures", "Comparing Fractions"], stdMaterials("Fractions"), 4),
  ],
  "Science": [
    ch("Environment", ["Natural Resources", "Pollution Awareness", "Conservation"], stdMaterials("Environment"), 3),
  ],
  "Araling Panlipunan": [
    ch("Map Basics", ["Directions", "Simple Maps", "Landmarks"], stdMaterials("Maps"), 3),
  ],
});

const g3Subjects = extendSubjects(g2Subjects, "g3", {
  "Mathematics": [
    ch("Division", ["Division Concept", "Division Facts", "Long Division Intro"], stdMaterials("Division"), 5),
  ],
  "Science": [
    ch("Human Body Systems", ["Digestive System", "Respiratory System", "Circulatory System"], stdMaterials("BodySystems"), 4),
    ch("Simple Machines", ["Lever", "Pulley", "Inclined Plane", "Wheel & Axle"], stdMaterials("SimpleMachines"), 3),
  ],
  "Araling Panlipunan": [
    ch("Philippine Regions", ["Luzon", "Visayas", "Mindanao", "Cultural Diversity"], stdMaterials("Regions"), 4),
  ],
  "ICT Intro": [
    ch("ICT Basics", ["Word Processing", "Drawing Tools", "Internet Basics"], stdMaterials("ICTBasics"), 3),
  ],
});

// =====================================================
// GRADE 4–6 (Intermediate)
// =====================================================
const g4Subjects: Subject[] = [
  {
    id: "g4-english",
    name: "English",
    emoji: "📖",
    color: "text-magic-blue",
    overview: "Advancing reading comprehension, creative writing, and literary analysis.",
    objectives: ["Analyze literary texts", "Write essays", "Build vocabulary", "Present ideas orally"],
    chapters: [
      ch("Literature", ["Short Stories", "Poetry", "Drama Intro"], stdMaterials("Literature"), 5),
      ch("Essay Writing", ["Narrative Essay", "Descriptive Essay", "Persuasive Writing Intro"], stdMaterials("Essays"), 5),
      ch("Informative Text", ["News Articles", "Reports", "Research Reading"], stdMaterials("InformativeText"), 4),
      ch("Grammar Advanced", ["Complex Sentences", "Tenses Review", "Active & Passive Voice"], stdMaterials("GrammarAdv"), 4),
      ch("Research Intro", ["Finding Sources", "Note-Taking", "Simple Bibliography"], stdMaterials("Research"), 3),
    ],
    examPattern: {
      components: [
        { name: "MCQ", weight: 30 },
        { name: "Problem Solving", weight: 30 },
        { name: "Short Answer", weight: 20 },
        { name: "Essay", weight: 20 },
      ],
      difficulty: universalDifficulty,
    },
    assessmentFlow: universalAssessmentFlow,
    projectWork: "Book Report Project",
    skillMapping: ["Critical Reading", "Creative Writing", "Research Skills", "Oral Communication"],
  },
  {
    id: "g4-filipino",
    name: "Filipino",
    emoji: "🇵🇭",
    color: "text-coral",
    overview: "Pagpapalalim ng kasanayan sa pagbasa, pagsulat, at panitikan.",
    objectives: ["Suriin ang mga akdang pampanitikan", "Sumulat ng sanaysay", "Magpahayag ng sariling ideya"],
    chapters: [
      ch("Panitikan", ["Kuwento", "Tula", "Dula"], stdMaterials("Panitikan"), 4),
      ch("Sanaysay", ["Naisasalaysay", "Naglalarawan", "Nangangatwiran"], stdMaterials("Sanaysay"), 4),
      ch("Gramatika", ["Pang-abay", "Pang-ukol", "Pangatnig"], stdMaterials("Gramatika"), 3),
    ],
    examPattern: {
      components: [
        { name: "MCQ", weight: 30 },
        { name: "Pagsulat", weight: 30 },
        { name: "Pagbasa", weight: 40 },
      ],
      difficulty: universalDifficulty,
    },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Pagbasa", "Pagsulat", "Pagsusuri"],
  },
  {
    id: "g4-math",
    name: "Mathematics",
    emoji: "🔢",
    color: "text-primary",
    overview: "Mastering fractions, decimals, and introduction to ratios and percentages.",
    objectives: ["Perform fraction operations", "Understand decimals", "Solve multi-step problems"],
    chapters: [
      ch("Fractions Operations", ["Adding Fractions", "Subtracting Fractions", "Multiplying Fractions"], stdMaterials("FractionOps"), 5),
      ch("Decimals", ["Decimal Place Value", "Decimal Operations", "Decimal-Fraction Conversion"], stdMaterials("Decimals"), 5),
      ch("Ratio", ["Understanding Ratios", "Equivalent Ratios", "Ratio Problems"], stdMaterials("Ratio"), 4),
      ch("Percentage Intro", ["Percent Concept", "Percent of a Number", "Real-Life Percentages"], stdMaterials("Percentage"), 4),
      ch("Geometry", ["Angles", "Perimeter", "Area", "Volume Intro"], stdMaterials("Geometry"), 5),
      ch("Statistics Intro", ["Data Collection", "Bar Graphs", "Mean & Mode"], stdMaterials("Statistics"), 3),
    ],
    examPattern: {
      components: [
        { name: "MCQ", weight: 30 },
        { name: "Problem Solving", weight: 30 },
        { name: "Short Answer", weight: 20 },
        { name: "Essay/Explanation", weight: 20 },
      ],
      difficulty: universalDifficulty,
    },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Number Operations", "Fractions & Decimals", "Geometry", "Data Analysis"],
  },
  {
    id: "g4-science",
    name: "Science",
    emoji: "🔬",
    color: "text-xp-green",
    overview: "Exploring energy, ecosystems, earth science, and the solar system.",
    objectives: ["Explain energy forms", "Describe ecosystems", "Identify planets", "Understand forces"],
    chapters: [
      ch("Energy", ["Forms of Energy", "Energy Transformation", "Conservation"], stdMaterials("Energy"), 4),
      ch("Ecosystems", ["Food Chains", "Food Webs", "Biomes", "Human Impact"], stdMaterials("Ecosystems"), 5),
      ch("Solar System", ["Planets", "Sun & Moon", "Earth's Rotation"], stdMaterials("SolarSystem"), 4),
      ch("Earth Science", ["Rocks & Minerals", "Layers of Earth", "Natural Disasters"], stdMaterials("EarthScience"), 4),
      ch("Forces & Motion", ["Gravity", "Friction", "Simple Experiments"], stdMaterials("Forces"), 4),
    ],
    examPattern: {
      components: [
        { name: "MCQ", weight: 30 },
        { name: "Diagram/Lab", weight: 30 },
        { name: "Short Explanation", weight: 20 },
        { name: "Essay", weight: 20 },
      ],
      difficulty: universalDifficulty,
    },
    assessmentFlow: universalAssessmentFlow,
    projectWork: "Science Fair Project",
    skillMapping: ["Scientific Method", "Earth & Space", "Life Science", "Physical Science"],
  },
  {
    id: "g4-ap",
    name: "Araling Panlipunan",
    emoji: "🌏",
    color: "text-secondary",
    overview: "Philippine history, government, ASEAN, and basic geography.",
    objectives: ["Trace Philippine history", "Understand government structure", "Know ASEAN countries"],
    chapters: [
      ch("Philippine History Intro", ["Pre-Colonial Period", "Spanish Period", "American Period"], stdMaterials("PHHistory"), 5),
      ch("Government", ["Three Branches", "Local Government", "Elections"], stdMaterials("Government"), 4),
      ch("ASEAN", ["ASEAN Countries", "ASEAN Goals", "Philippines in ASEAN"], stdMaterials("ASEAN"), 3),
      ch("Geography", ["Philippine Islands", "Climate", "Natural Resources"], stdMaterials("Geography"), 3),
      ch("Colonial Period", ["Spanish Colonization", "Katipunan", "Independence Movement"], stdMaterials("Colonial"), 4),
    ],
    examPattern: {
      components: [
        { name: "MCQ", weight: 30 },
        { name: "Problem Solving", weight: 30 },
        { name: "Short Answer", weight: 20 },
        { name: "Essay", weight: 20 },
      ],
      difficulty: universalDifficulty,
    },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Historical Thinking", "Civic Awareness", "Geographic Literacy"],
  },
  {
    id: "g4-mapeh",
    name: "MAPEH",
    emoji: "🎵",
    color: "text-magic-purple",
    overview: "Advanced music theory, visual arts, team sports, and health education.",
    objectives: ["Read basic musical notation", "Create art compositions", "Play team sports", "Understand nutrition"],
    chapters: [
      ch("Music Theory", ["Notes & Rests", "Time Signatures", "Philippine Folk Songs"], stdMaterials("MusicTheory"), 3),
      ch("Visual Arts", ["Elements of Art", "Art Styles", "Philippine Art"], stdMaterials("VisualArts"), 3),
      ch("Team Sports", ["Basketball Basics", "Volleyball", "Track & Field"], stdMaterials("TeamSports"), 3),
      ch("Health Education", ["Nutrition & Diet", "Disease Prevention", "First Aid"], stdMaterials("HealthEd"), 3),
    ],
    examPattern: {
      components: [
        { name: "Performance", weight: 40 },
        { name: "Written", weight: 30 },
        { name: "Project", weight: 30 },
      ],
      difficulty: universalDifficulty,
    },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Musical Skills", "Artistic Skills", "Physical Fitness", "Health Knowledge"],
  },
  {
    id: "g4-ict",
    name: "ICT",
    emoji: "💻",
    color: "text-magic-blue",
    overview: "Computer applications, internet research, and digital presentations.",
    objectives: ["Use productivity software", "Research online safely", "Create digital presentations"],
    chapters: [
      ch("Word Processing", ["Document Creation", "Formatting", "Tables & Images"], stdMaterials("WordProcessing"), 3),
      ch("Spreadsheets Intro", ["Cells & Data", "Simple Formulas", "Charts"], stdMaterials("Spreadsheets"), 3),
      ch("Presentations", ["Slide Design", "Adding Media", "Presenting"], stdMaterials("Presentations"), 3),
      ch("Internet Research", ["Search Engines", "Evaluating Sources", "Citing Sources"], stdMaterials("InternetResearch"), 3),
    ],
    examPattern: {
      components: [
        { name: "Practical", weight: 50 },
        { name: "Written", weight: 30 },
        { name: "Project", weight: 20 },
      ],
      difficulty: universalDifficulty,
    },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Digital Literacy", "Productivity Tools", "Research Skills"],
  },
  {
    id: "g4-values",
    name: "Values Education",
    emoji: "💖",
    color: "text-coral",
    overview: "Deepening values of integrity, patriotism, and social responsibility.",
    objectives: ["Demonstrate integrity", "Show patriotism", "Practice environmental stewardship"],
    chapters: [
      ch("Integrity", ["Honesty in Actions", "Keeping Promises", "Moral Courage"], stdMaterials("Integrity"), 2),
      ch("Patriotism", ["Love of Country", "National Symbols", "Filipino Heroes"], stdMaterials("Patriotism"), 3),
      ch("Environmental Stewardship", ["Caring for Nature", "Waste Management", "Sustainability"], stdMaterials("Environmental"), 2),
    ],
    examPattern: {
      components: [
        { name: "Reflection Essay", weight: 40 },
        { name: "Scenario Analysis", weight: 30 },
        { name: "Project", weight: 30 },
      ],
      difficulty: universalDifficulty,
    },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Values Formation", "Critical Thinking", "Social Awareness"],
  },
  {
    id: "g4-research",
    name: "Research Basics",
    emoji: "📋",
    color: "text-muted-foreground",
    overview: "Introduction to the research process and basic inquiry skills.",
    objectives: ["Ask research questions", "Gather information", "Present findings"],
    chapters: [
      ch("Asking Questions", ["Inquiry Skills", "Forming Hypotheses", "Research Topics"], stdMaterials("AskingQuestions"), 2),
      ch("Gathering Data", ["Observation", "Interviews", "Simple Surveys"], stdMaterials("GatheringData"), 3),
      ch("Presenting Findings", ["Posters", "Oral Reports", "Simple Charts"], stdMaterials("Presenting"), 2),
    ],
    examPattern: {
      components: [
        { name: "Research Output", weight: 50 },
        { name: "Presentation", weight: 30 },
        { name: "Written Report", weight: 20 },
      ],
      difficulty: universalDifficulty,
    },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Inquiry", "Data Gathering", "Communication"],
  },
];

const g5Subjects = extendSubjects(g4Subjects, "g5", {
  "Mathematics": [
    ch("Volume", ["Volume of Cubes", "Volume of Rectangular Prisms", "Volume Word Problems"], stdMaterials("Volume"), 4),
    ch("Financial Literacy", ["Budgeting", "Saving", "Earning & Spending"], stdMaterials("FinLit"), 3),
  ],
});

const g6Subjects = extendSubjects(g5Subjects, "g6", {
  "Mathematics": [
    ch("Pre-Algebra", ["Variables", "Simple Equations", "Number Patterns"], stdMaterials("PreAlgebra"), 5),
    ch("Advanced Fractions", ["Mixed Numbers", "Fraction Division", "Complex Word Problems"], stdMaterials("AdvFractions"), 4),
  ],
  "Science": [
    ch("Advanced Earth Science", ["Plate Tectonics", "Weathering & Erosion", "Climate Change"], stdMaterials("AdvEarth"), 4),
  ],
  "Araling Panlipunan": [
    ch("Philippine Colonial History", ["Spanish Era", "American Era", "Japanese Occupation"], stdMaterials("ColonialHistory"), 5),
  ],
  "ICT": [
    ch("Computer Applications", ["Advanced Word Processing", "Spreadsheet Formulas", "Database Intro"], stdMaterials("CompApps"), 4),
  ],
});

// =====================================================
// GRADE 7–10 (Junior High)
// =====================================================
const jhsEnglish: Subject = {
  id: "jhs-english",
  name: "English",
  emoji: "📖",
  color: "text-magic-blue",
  overview: "World literature, analytical writing, critical reading, and speech skills.",
  objectives: ["Analyze world literature", "Write analytical essays", "Deliver speeches", "Read critically"],
  chapters: [
    ch("World Literature", ["Greek Myths", "Asian Literature", "African Stories", "European Classics"], stdMaterials("WorldLit"), 6),
    ch("Analytical Essay", ["Thesis Statement", "Evidence & Analysis", "Counterargument"], stdMaterials("AnalyticalEssay"), 5),
    ch("Critical Reading", ["Author's Purpose", "Bias Detection", "Text Analysis"], stdMaterials("CriticalReading"), 5),
    ch("Speech Writing", ["Types of Speeches", "Persuasive Speaking", "Debate"], stdMaterials("SpeechWriting"), 4),
    ch("Research Writing", ["Research Paper Format", "APA/MLA Basics", "Literature Review"], stdMaterials("ResearchWriting"), 5),
  ],
  examPattern: {
    components: [
      { name: "MCQ", weight: 30 },
      { name: "Problem Solving / Analysis", weight: 30 },
      { name: "Case Study", weight: 20 },
      { name: "Essay", weight: 20 },
    ],
    difficulty: universalDifficulty,
  },
  assessmentFlow: universalAssessmentFlow,
  skillMapping: ["Literary Analysis", "Critical Thinking", "Academic Writing", "Public Speaking"],
};

const jhsMath: Subject = {
  id: "jhs-math",
  name: "Mathematics",
  emoji: "🔢",
  color: "text-primary",
  overview: "Algebra, geometry, statistics, probability, and trigonometry introduction.",
  objectives: ["Solve algebraic equations", "Prove geometric theorems", "Analyze statistical data"],
  chapters: [
    ch("Algebra", ["Variables & Expressions", "Linear Equations", "Inequalities", "Systems of Equations"], stdMaterials("Algebra"), 8),
    ch("Linear Equations", ["Slope & Intercept", "Graphing Lines", "Parallel & Perpendicular"], stdMaterials("LinearEq"), 5),
    ch("Quadratic Equations", ["Factoring", "Quadratic Formula", "Graphing Parabolas"], stdMaterials("Quadratics"), 6),
    ch("Geometry", ["Triangles", "Circles", "Proofs", "Coordinate Geometry"], stdMaterials("GeometryJHS"), 7),
    ch("Statistics", ["Mean, Median, Mode", "Standard Deviation", "Data Presentation"], stdMaterials("StatisticsJHS"), 4),
    ch("Probability", ["Basic Probability", "Compound Events", "Tree Diagrams"], stdMaterials("Probability"), 4),
    ch("Trigonometry Intro", ["SOH-CAH-TOA", "Right Triangles", "Applications"], stdMaterials("TrigIntro"), 5),
  ],
  examPattern: {
    components: [
      { name: "MCQ", weight: 30 },
      { name: "Problem Solving", weight: 30 },
      { name: "Case Study", weight: 20 },
      { name: "Essay / Proof", weight: 20 },
    ],
    difficulty: universalDifficulty,
  },
  assessmentFlow: universalAssessmentFlow,
  skillMapping: ["Algebraic Thinking", "Geometric Reasoning", "Statistical Analysis", "Problem Solving"],
};

const jhsScience: Subject = {
  id: "jhs-science",
  name: "Science",
  emoji: "🔬",
  color: "text-xp-green",
  overview: "Biology, chemistry, physics, and earth science with laboratory work.",
  objectives: ["Understand cell biology", "Explain chemical reactions", "Apply physics laws"],
  chapters: [
    ch("Biology: Cells", ["Cell Structure", "Cell Division", "Cell Functions", "Microscopy"], stdMaterials("Cells"), 5),
    ch("Biology: Genetics", ["DNA & Genes", "Heredity", "Punnett Squares", "Mutations"], stdMaterials("Genetics"), 5),
    ch("Chemistry: Atoms", ["Atomic Structure", "Periodic Table", "Chemical Bonds"], stdMaterials("Atoms"), 5),
    ch("Chemistry: Reactions", ["Types of Reactions", "Balancing Equations", "Reaction Rates"], stdMaterials("Reactions"), 5),
    ch("Physics: Motion", ["Speed & Velocity", "Acceleration", "Newton's Laws"], stdMaterials("Motion"), 5),
    ch("Physics: Forces", ["Gravity", "Friction", "Applied Forces", "Free Body Diagrams"], stdMaterials("ForcesJHS"), 5),
    ch("Earth Science", ["Plate Tectonics", "Volcanoes & Earthquakes", "Climate Systems"], stdMaterials("EarthSciJHS"), 4),
  ],
  examPattern: {
    components: [
      { name: "MCQ", weight: 30 },
      { name: "Lab / Practical", weight: 30 },
      { name: "Case Study", weight: 20 },
      { name: "Essay", weight: 20 },
    ],
    difficulty: universalDifficulty,
  },
  assessmentFlow: universalAssessmentFlow,
  skillMapping: ["Scientific Method", "Lab Skills", "Critical Analysis", "Research"],
};

const jhsAP: Subject = {
  id: "jhs-ap",
  name: "Araling Panlipunan",
  emoji: "🌏",
  color: "text-secondary",
  overview: "Asian history, world history, economics, and political systems.",
  objectives: ["Analyze historical events", "Understand economic principles", "Compare political systems"],
  chapters: [
    ch("Asian History", ["Ancient Civilizations", "Trade Routes", "Colonial Asia", "Modern Asia"], stdMaterials("AsianHistory"), 6),
    ch("World History", ["Ancient Egypt & Greece", "Medieval Period", "World Wars", "Modern Era"], stdMaterials("WorldHistory"), 6),
    ch("Economics", ["Supply & Demand", "Money & Banking", "Trade", "Philippine Economy"], stdMaterials("Economics"), 5),
    ch("Political Systems", ["Democracy", "Authoritarianism", "Philippine Politics", "International Relations"], stdMaterials("PoliticalSystems"), 4),
  ],
  examPattern: {
    components: [
      { name: "MCQ", weight: 30 },
      { name: "Problem Solving", weight: 30 },
      { name: "Case Study", weight: 20 },
      { name: "Essay", weight: 20 },
    ],
    difficulty: universalDifficulty,
  },
  assessmentFlow: universalAssessmentFlow,
  skillMapping: ["Historical Analysis", "Economic Thinking", "Political Awareness"],
};

const makeJHSGrade = (gradeNum: number): Subject[] => {
  const base = [jhsEnglish, jhsMath, jhsScience, jhsAP].map((s) => ({
    ...s,
    id: s.id.replace("jhs", `g${gradeNum}`),
  }));
  // Add common JHS subjects
  const common: Subject[] = [
    {
      id: `g${gradeNum}-filipino`,
      name: "Filipino",
      emoji: "🇵🇭",
      color: "text-coral",
      overview: "Panitikang Filipino, pag-aaral ng wika, at malikhaing pagsulat.",
      objectives: ["Suriin ang panitikang Filipino", "Sumulat ng iba't ibang uri ng teksto"],
      chapters: [
        ch("Panitikang Filipino", ["Maikling Kuwento", "Nobela", "Tula", "Dula"], stdMaterials("PanitikanJHS"), 5),
        ch("Wika at Gramatika", ["Pangungusap", "Pagbuo ng Talata", "Retorika"], stdMaterials("WikaJHS"), 4),
      ],
      examPattern: { components: [{ name: "MCQ", weight: 30 }, { name: "Pagsulat", weight: 40 }, { name: "Pagbasa", weight: 30 }], difficulty: universalDifficulty },
      assessmentFlow: universalAssessmentFlow,
      skillMapping: ["Panitikan", "Wika", "Malikhaing Pagsulat"],
    },
    {
      id: `g${gradeNum}-mapeh`,
      name: "MAPEH",
      emoji: "🎵",
      color: "text-magic-purple",
      overview: "Advanced music, arts, sports, and comprehensive health education.",
      objectives: ["Appreciate music genres", "Create art works", "Compete in sports", "Understand health issues"],
      chapters: [
        ch("Music", ["Music History", "Genres", "Philippine Music"], stdMaterials("MusicJHS"), 3),
        ch("Arts", ["Art History", "Contemporary Art", "Digital Art"], stdMaterials("ArtsJHS"), 3),
        ch("PE", ["Individual Sports", "Team Sports", "Fitness Testing"], stdMaterials("PEJHS"), 3),
        ch("Health", ["Adolescent Health", "Mental Health", "Substance Abuse Prevention"], stdMaterials("HealthJHS"), 3),
      ],
      examPattern: { components: [{ name: "Performance", weight: 40 }, { name: "Written", weight: 30 }, { name: "Project", weight: 30 }], difficulty: universalDifficulty },
      assessmentFlow: universalAssessmentFlow,
      skillMapping: ["Artistic Skills", "Physical Fitness", "Health Literacy"],
    },
    {
      id: `g${gradeNum}-ict`,
      name: "ICT",
      emoji: "💻",
      color: "text-magic-blue",
      overview: "Programming basics, digital citizenship, and advanced computer skills.",
      objectives: ["Write simple programs", "Practice digital citizenship", "Use advanced tools"],
      chapters: [
        ch("Programming Basics", ["Scratch/Block Coding", "Variables & Loops", "Simple Projects"], stdMaterials("Programming"), 5),
        ch("Digital Citizenship", ["Online Ethics", "Cybersecurity", "Digital Footprint"], stdMaterials("DigiCitizen"), 3),
        ch("Advanced Tools", ["Spreadsheet Formulas", "Database Basics", "Web Design Intro"], stdMaterials("AdvTools"), 4),
      ],
      examPattern: { components: [{ name: "Practical", weight: 50 }, { name: "Written", weight: 30 }, { name: "Project", weight: 20 }], difficulty: universalDifficulty },
      assessmentFlow: universalAssessmentFlow,
      skillMapping: ["Programming", "Digital Literacy", "Problem Solving"],
    },
    {
      id: `g${gradeNum}-research`,
      name: "Research",
      emoji: "📋",
      color: "text-muted-foreground",
      overview: "Research methodology, academic writing, and data analysis.",
      objectives: ["Conduct research", "Write academic papers", "Analyze data"],
      chapters: [
        ch("Research Methods", ["Qualitative vs Quantitative", "Survey Design", "Sampling"], stdMaterials("ResearchMethods"), 4),
        ch("Academic Writing", ["Research Paper Structure", "Citations", "Literature Review"], stdMaterials("AcademicWriting"), 4),
        ch("Data Analysis", ["Data Organization", "Basic Statistics", "Interpretation"], stdMaterials("DataAnalysis"), 3),
      ],
      examPattern: { components: [{ name: "Research Paper", weight: 50 }, { name: "Presentation", weight: 30 }, { name: "Written Exam", weight: 20 }], difficulty: universalDifficulty },
      assessmentFlow: universalAssessmentFlow,
      skillMapping: ["Research Skills", "Academic Writing", "Data Analysis"],
    },
  ];
  return [...base, ...common];
};

const g7Subjects = makeJHSGrade(7);
const g8Subjects = makeJHSGrade(8);
const g9Subjects = makeJHSGrade(9);

const g10Subjects: Subject[] = makeJHSGrade(10).map((s) => {
  if (s.name === "Mathematics") {
    return {
      ...s,
      chapters: [
        ...s.chapters,
        ch("Advanced Quadratics", ["Complex Roots", "Vertex Form", "Applications"], stdMaterials("AdvQuadratics"), 5),
        ch("Trigonometry", ["Unit Circle", "Trig Functions", "Identities", "Applications"], stdMaterials("Trigonometry"), 6),
      ],
    };
  }
  if (s.name === "Science") {
    return {
      ...s,
      chapters: [
        ...s.chapters,
        ch("Genetics Advanced", ["Genetic Engineering", "Biotechnology", "Bioethics"], stdMaterials("AdvGenetics"), 4),
        ch("Physics Laws", ["Conservation Laws", "Thermodynamics Intro", "Waves"], stdMaterials("PhysicsLaws"), 5),
      ],
    };
  }
  if (s.name === "English") {
    return {
      ...s,
      chapters: [
        ...s.chapters,
        ch("Research Writing Advanced", ["Thesis Writing", "Methodology", "Data Presentation"], stdMaterials("AdvResearch"), 5),
      ],
    };
  }
  return s;
});

// =====================================================
// SENIOR HIGH (GRADE 11–12 STRANDS)
// =====================================================
const stemSubjects: Subject[] = [
  {
    id: "shs-precalc",
    name: "Pre-Calculus",
    emoji: "📐",
    color: "text-primary",
    overview: "Functions, trigonometry, and preparation for calculus.",
    objectives: ["Master trigonometric functions", "Understand conic sections", "Analyze polynomial functions"],
    chapters: [
      ch("Functions", ["Domain & Range", "Composite Functions", "Inverse Functions"], shsMaterials("Functions"), 5),
      ch("Trigonometry", ["Unit Circle", "Trig Identities", "Law of Sines & Cosines"], shsMaterials("TrigSHS"), 6),
      ch("Conic Sections", ["Circle", "Parabola", "Ellipse", "Hyperbola"], shsMaterials("Conics"), 5),
      ch("Series & Sequences", ["Arithmetic", "Geometric", "Summation"], shsMaterials("Series"), 4),
    ],
    examPattern: { components: [{ name: "Conceptual", weight: 30 }, { name: "Application", weight: 40 }, { name: "Critical Thinking", weight: 30 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Mathematical Analysis", "Problem Solving", "Abstract Thinking"],
  },
  {
    id: "shs-calculus",
    name: "Basic Calculus",
    emoji: "∫",
    color: "text-primary",
    overview: "Limits, derivatives, and integrals with real-world applications.",
    objectives: ["Evaluate limits", "Compute derivatives", "Apply integration"],
    chapters: [
      ch("Limits", ["Limit Concept", "Limit Laws", "Continuity"], shsMaterials("Limits"), 5),
      ch("Derivatives", ["Definition", "Rules", "Chain Rule", "Applications"], shsMaterials("Derivatives"), 7),
      ch("Integration", ["Antiderivatives", "Definite Integrals", "Area Under Curve"], shsMaterials("Integration"), 6),
    ],
    examPattern: { components: [{ name: "Conceptual", weight: 30 }, { name: "Application", weight: 40 }, { name: "Critical Thinking", weight: 30 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Calculus", "Analytical Thinking", "Mathematical Modeling"],
  },
  {
    id: "shs-physics",
    name: "General Physics",
    emoji: "⚛️",
    color: "text-magic-blue",
    overview: "Mechanics, thermodynamics, waves, and modern physics.",
    objectives: ["Apply Newton's laws", "Solve energy problems", "Understand wave phenomena"],
    chapters: [
      ch("Mechanics", ["Kinematics", "Dynamics", "Work & Energy", "Momentum"], shsMaterials("Mechanics"), 8),
      ch("Thermodynamics", ["Heat & Temperature", "Laws of Thermodynamics", "Heat Transfer"], shsMaterials("Thermo"), 5),
      ch("Waves & Optics", ["Wave Properties", "Sound", "Light & Optics"], shsMaterials("Waves"), 5),
      ch("Electricity & Magnetism", ["Electric Circuits", "Magnetic Fields", "Electromagnetic Induction"], shsMaterials("ElecMag"), 6),
    ],
    examPattern: { components: [{ name: "Conceptual", weight: 30 }, { name: "Application", weight: 40 }, { name: "Critical Thinking", weight: 30 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Physics Concepts", "Lab Skills", "Mathematical Application"],
  },
  {
    id: "shs-chemistry",
    name: "General Chemistry",
    emoji: "🧪",
    color: "text-xp-green",
    overview: "Atomic structure, chemical bonding, stoichiometry, and organic chemistry.",
    objectives: ["Understand atomic structure", "Balance equations", "Perform stoichiometric calculations"],
    chapters: [
      ch("Atomic Structure", ["Subatomic Particles", "Electron Configuration", "Periodic Trends"], shsMaterials("AtomicStr"), 5),
      ch("Chemical Bonding", ["Ionic Bonds", "Covalent Bonds", "Metallic Bonds"], shsMaterials("Bonding"), 5),
      ch("Stoichiometry", ["Mole Concept", "Limiting Reagent", "Percent Yield"], shsMaterials("Stoichiometry"), 6),
      ch("Organic Chemistry", ["Hydrocarbons", "Functional Groups", "Reactions"], shsMaterials("OrganicChem"), 5),
    ],
    examPattern: { components: [{ name: "Conceptual", weight: 30 }, { name: "Application", weight: 40 }, { name: "Critical Thinking", weight: 30 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Chemical Analysis", "Lab Skills", "Problem Solving"],
  },
  {
    id: "shs-biology",
    name: "General Biology",
    emoji: "🧬",
    color: "text-xp-green",
    overview: "Cell biology, genetics, evolution, ecology, and human systems.",
    objectives: ["Explain cellular processes", "Analyze genetic inheritance", "Understand ecosystems"],
    chapters: [
      ch("Cell Biology", ["Cell Theory", "Organelles", "Cellular Respiration", "Photosynthesis"], shsMaterials("CellBio"), 6),
      ch("Molecular Biology", ["DNA Replication", "Transcription", "Translation"], shsMaterials("MolBio"), 5),
      ch("Genetics & Evolution", ["Mendelian Genetics", "Evolution", "Natural Selection"], shsMaterials("GenEvo"), 5),
      ch("Ecology", ["Populations", "Communities", "Biosphere", "Conservation"], shsMaterials("Ecology"), 4),
    ],
    examPattern: { components: [{ name: "Conceptual", weight: 30 }, { name: "Application", weight: 40 }, { name: "Critical Thinking", weight: 30 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Biological Concepts", "Lab Skills", "Scientific Analysis"],
  },
  {
    id: "shs-research-stem",
    name: "Research",
    emoji: "📋",
    color: "text-muted-foreground",
    overview: "Scientific research methodology, thesis writing, and defense.",
    objectives: ["Design experiments", "Write research proposals", "Defend findings"],
    chapters: [
      ch("Research Proposal", ["Problem Identification", "Literature Review", "Methodology Design"], shsMaterials("Proposal"), 6),
      ch("Implementation", ["Data Collection", "Experimentation", "Analysis"], shsMaterials("Implementation"), 8),
      ch("Defense", ["Paper Writing", "Presentation Skills", "Q&A Preparation"], shsMaterials("Defense"), 4),
    ],
    examPattern: {
      components: [{ name: "Proposal", weight: 30 }, { name: "Implementation", weight: 40 }, { name: "Defense", weight: 30 }],
      difficulty: universalDifficulty,
    },
    assessmentFlow: ["Proposal Review", "Progress Check", "Final Defense"],
    skillMapping: ["Research Design", "Data Analysis", "Academic Communication"],
  },
  {
    id: "shs-capstone-stem",
    name: "Capstone Project",
    emoji: "🏆",
    color: "text-primary",
    overview: "Comprehensive project demonstrating mastery of STEM concepts.",
    objectives: ["Complete end-to-end project", "Present findings", "Defend methodology"],
    chapters: [
      ch("Project Planning", ["Topic Selection", "Timeline", "Resource Planning"], shsMaterials("CapPlan"), 4),
      ch("Execution", ["Building/Experimenting", "Documentation", "Iteration"], shsMaterials("CapExec"), 10),
      ch("Presentation", ["Final Report", "Poster/Demo", "Defense"], shsMaterials("CapPresent"), 4),
    ],
    examPattern: {
      components: [{ name: "Project Output", weight: 50 }, { name: "Documentation", weight: 25 }, { name: "Defense", weight: 25 }],
      difficulty: universalDifficulty,
    },
    assessmentFlow: ["Proposal", "Progress Reviews", "Final Defense"],
    skillMapping: ["Project Management", "Technical Skills", "Communication"],
  },
];

const abmSubjects: Subject[] = [
  {
    id: "shs-bizmath",
    name: "Business Math",
    emoji: "💰",
    color: "text-primary",
    overview: "Mathematical applications in business — interest, taxation, and financial analysis.",
    objectives: ["Calculate interest", "Analyze financial statements", "Apply business formulas"],
    chapters: [
      ch("Business Calculations", ["Markup & Markdown", "Commission", "Discounts"], shsMaterials("BizCalc"), 4),
      ch("Interest", ["Simple Interest", "Compound Interest", "Annuities"], shsMaterials("Interest"), 5),
      ch("Financial Statements", ["Income Statement", "Balance Sheet", "Cash Flow"], shsMaterials("FinStatements"), 5),
    ],
    examPattern: { components: [{ name: "Conceptual", weight: 30 }, { name: "Application", weight: 40 }, { name: "Critical Thinking", weight: 30 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Financial Math", "Business Analysis", "Problem Solving"],
  },
  {
    id: "shs-accounting",
    name: "Accounting",
    emoji: "📊",
    color: "text-xp-green",
    overview: "Fundamentals of accounting — recording, classifying, and reporting financial data.",
    objectives: ["Record journal entries", "Prepare financial statements", "Analyze financial data"],
    chapters: [
      ch("Accounting Fundamentals", ["Accounting Equation", "Debit & Credit", "Journal Entries"], shsMaterials("AcctFund"), 5),
      ch("Financial Reporting", ["Trial Balance", "Adjusting Entries", "Financial Statements"], shsMaterials("FinReport"), 6),
      ch("Merchandising", ["Inventory", "Cost of Goods Sold", "Sales & Purchases"], shsMaterials("Merchandising"), 5),
    ],
    examPattern: { components: [{ name: "Conceptual", weight: 30 }, { name: "Application", weight: 40 }, { name: "Critical Thinking", weight: 30 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Financial Accounting", "Analytical Skills", "Attention to Detail"],
  },
  {
    id: "shs-marketing",
    name: "Marketing",
    emoji: "📣",
    color: "text-coral",
    overview: "Marketing principles, consumer behavior, and digital marketing strategies.",
    objectives: ["Understand marketing mix", "Analyze consumer behavior", "Create marketing plans"],
    chapters: [
      ch("Marketing Fundamentals", ["4Ps of Marketing", "Market Research", "Target Market"], shsMaterials("MktFund"), 4),
      ch("Consumer Behavior", ["Buying Process", "Market Segmentation", "Brand Loyalty"], shsMaterials("ConsumerBehavior"), 4),
      ch("Digital Marketing", ["Social Media", "Content Marketing", "E-Commerce"], shsMaterials("DigitalMkt"), 4),
    ],
    examPattern: { components: [{ name: "Conceptual", weight: 30 }, { name: "Application", weight: 40 }, { name: "Critical Thinking", weight: 30 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Marketing Strategy", "Consumer Analysis", "Digital Skills"],
  },
  {
    id: "shs-entrepreneurship",
    name: "Entrepreneurship",
    emoji: "🚀",
    color: "text-streak-orange",
    overview: "Business planning, startup development, and entrepreneurial mindset.",
    objectives: ["Create business plans", "Understand startup processes", "Develop entrepreneurial thinking"],
    chapters: [
      ch("Entrepreneurial Mindset", ["Innovation", "Risk Assessment", "Opportunity Recognition"], shsMaterials("EntMindset"), 3),
      ch("Business Planning", ["Business Model Canvas", "Financial Projections", "Marketing Plan"], shsMaterials("BizPlan"), 6),
      ch("Business Operations", ["Production", "Human Resources", "Legal Requirements"], shsMaterials("BizOps"), 4),
    ],
    examPattern: { components: [{ name: "Conceptual", weight: 30 }, { name: "Application", weight: 40 }, { name: "Critical Thinking", weight: 30 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    projectWork: "Business Plan Proposal",
    skillMapping: ["Business Planning", "Financial Literacy", "Leadership"],
  },
  {
    id: "shs-finance",
    name: "Finance",
    emoji: "🏦",
    color: "text-primary",
    overview: "Personal finance, investment, and financial management principles.",
    objectives: ["Manage personal finances", "Understand investments", "Analyze financial risks"],
    chapters: [
      ch("Personal Finance", ["Budgeting", "Saving & Investing", "Credit & Debt"], shsMaterials("PersonalFin"), 4),
      ch("Investments", ["Stocks", "Bonds", "Mutual Funds", "Risk Assessment"], shsMaterials("Investments"), 5),
      ch("Business Finance", ["Capital Budgeting", "Financial Ratios", "Cash Flow Management"], shsMaterials("BizFinance"), 5),
    ],
    examPattern: { components: [{ name: "Conceptual", weight: 30 }, { name: "Application", weight: 40 }, { name: "Critical Thinking", weight: 30 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Financial Management", "Investment Analysis", "Risk Assessment"],
  },
];

const humssSubjects: Subject[] = [
  {
    id: "shs-philosophy",
    name: "Philosophy",
    emoji: "🤔",
    color: "text-magic-purple",
    overview: "Introduction to philosophical thinking, ethics, and existentialism.",
    objectives: ["Understand philosophical concepts", "Apply ethical reasoning", "Analyze philosophical arguments"],
    chapters: [
      ch("Introduction to Philosophy", ["What is Philosophy?", "Branches", "Ancient Philosophers"], shsMaterials("IntroPhilo"), 4),
      ch("Ethics", ["Moral Theories", "Ethical Dilemmas", "Applied Ethics"], shsMaterials("Ethics"), 5),
      ch("Existentialism", ["Sartre", "Camus", "Meaning of Life"], shsMaterials("Existentialism"), 4),
    ],
    examPattern: { components: [{ name: "Conceptual", weight: 30 }, { name: "Application", weight: 40 }, { name: "Critical Thinking", weight: 30 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Philosophical Thinking", "Ethical Reasoning", "Critical Analysis"],
  },
  {
    id: "shs-creative-writing",
    name: "Creative Writing",
    emoji: "✍️",
    color: "text-coral",
    overview: "Fiction, poetry, drama, and non-fiction creative writing.",
    objectives: ["Write fiction and poetry", "Develop narrative voice", "Create publishable work"],
    chapters: [
      ch("Fiction", ["Short Story Structure", "Character Development", "Setting & Mood"], shsMaterials("Fiction"), 5),
      ch("Poetry", ["Poetic Forms", "Imagery & Metaphor", "Free Verse"], shsMaterials("Poetry"), 4),
      ch("Drama", ["Scriptwriting", "Stage Directions", "Dialogue"], shsMaterials("Drama"), 4),
      ch("Non-Fiction", ["Personal Essay", "Feature Writing", "Memoir"], shsMaterials("NonFiction"), 4),
    ],
    examPattern: { components: [{ name: "Portfolio", weight: 40 }, { name: "Written Exam", weight: 30 }, { name: "Workshop", weight: 30 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Creative Expression", "Literary Craft", "Critical Feedback"],
  },
  {
    id: "shs-world-religions",
    name: "World Religions",
    emoji: "🕊️",
    color: "text-magic-blue",
    overview: "Comparative study of major world religions and belief systems.",
    objectives: ["Compare world religions", "Understand religious traditions", "Appreciate diversity"],
    chapters: [
      ch("Christianity", ["History", "Beliefs", "Denominations"], shsMaterials("Christianity"), 3),
      ch("Islam", ["History", "Five Pillars", "Islamic Culture"], shsMaterials("Islam"), 3),
      ch("Buddhism & Hinduism", ["Origins", "Key Teachings", "Practices"], shsMaterials("BuddhismHinduism"), 4),
      ch("Indigenous & Other Religions", ["Animism", "Judaism", "Sikhism"], shsMaterials("OtherReligions"), 3),
    ],
    examPattern: { components: [{ name: "Conceptual", weight: 30 }, { name: "Application", weight: 40 }, { name: "Critical Thinking", weight: 30 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Comparative Analysis", "Cultural Understanding", "Critical Thinking"],
  },
  {
    id: "shs-polsci",
    name: "Political Science",
    emoji: "⚖️",
    color: "text-secondary",
    overview: "Political theories, government systems, and international relations.",
    objectives: ["Analyze political systems", "Understand governance", "Evaluate policies"],
    chapters: [
      ch("Political Theory", ["Classical Theories", "Modern Ideologies", "Power & Authority"], shsMaterials("PolTheory"), 5),
      ch("Government Systems", ["Democracy", "Authoritarianism", "Federal vs Unitary"], shsMaterials("GovSystems"), 4),
      ch("International Relations", ["Diplomacy", "International Organizations", "Global Issues"], shsMaterials("IntRelations"), 4),
    ],
    examPattern: { components: [{ name: "Conceptual", weight: 30 }, { name: "Application", weight: 40 }, { name: "Critical Thinking", weight: 30 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Political Analysis", "Critical Thinking", "Civic Engagement"],
  },
  {
    id: "shs-sociology",
    name: "Sociology",
    emoji: "👥",
    color: "text-magic-purple",
    overview: "Study of society, social structures, culture, and social change.",
    objectives: ["Understand social structures", "Analyze social issues", "Apply sociological perspectives"],
    chapters: [
      ch("Sociological Foundations", ["What is Sociology?", "Sociological Perspectives", "Research Methods"], shsMaterials("SocFound"), 4),
      ch("Social Structures", ["Family", "Education", "Religion", "Economy"], shsMaterials("SocStructures"), 5),
      ch("Social Issues", ["Inequality", "Poverty", "Gender", "Globalization"], shsMaterials("SocIssues"), 4),
    ],
    examPattern: { components: [{ name: "Conceptual", weight: 30 }, { name: "Application", weight: 40 }, { name: "Critical Thinking", weight: 30 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Sociological Analysis", "Research Skills", "Critical Thinking"],
  },
];

const gasSubjects: Subject[] = [
  ...g10Subjects.filter(s => ["English", "Mathematics", "Science", "Filipino"].includes(s.name)).map(s => ({ ...s, id: s.id.replace("g10", "gas") })),
  {
    id: "gas-humanities",
    name: "Humanities",
    emoji: "🎭",
    color: "text-magic-purple",
    overview: "Mixed academic exposure across humanities, social sciences, and STEM.",
    objectives: ["Gain broad academic knowledge", "Prepare for any college track"],
    chapters: [
      ch("Introduction to Humanities", ["Art", "Literature", "Philosophy", "History"], shsMaterials("IntroHumanities"), 4),
      ch("Social Science Survey", ["Psychology", "Sociology", "Anthropology"], shsMaterials("SocSciSurvey"), 4),
    ],
    examPattern: { components: [{ name: "Conceptual", weight: 30 }, { name: "Application", weight: 40 }, { name: "Critical Thinking", weight: 30 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Interdisciplinary Thinking", "Broad Knowledge", "Critical Analysis"],
  },
];

const tvlSubjects: Subject[] = [
  {
    id: "tvl-ict",
    name: "ICT Specialization",
    emoji: "💻",
    color: "text-magic-blue",
    overview: "Advanced ICT skills — programming, web development, and system administration.",
    objectives: ["Build web applications", "Program in modern languages", "Administer systems"],
    chapters: [
      ch("Web Development", ["HTML & CSS", "JavaScript", "Responsive Design", "Web Projects"], shsMaterials("WebDev"), 8),
      ch("Programming", ["Python/Java Basics", "Data Structures", "Algorithms"], shsMaterials("ProgrammingSHS"), 8),
      ch("System Administration", ["Networks", "Operating Systems", "Security Basics"], shsMaterials("SysAdmin"), 5),
    ],
    examPattern: { components: [{ name: "Practical", weight: 50 }, { name: "Written", weight: 25 }, { name: "Project", weight: 25 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Programming", "Web Development", "System Administration"],
  },
  {
    id: "tvl-he",
    name: "Home Economics",
    emoji: "🏠",
    color: "text-coral",
    overview: "Culinary arts, garments, beauty care, and tourism hospitality.",
    objectives: ["Develop practical life skills", "Prepare for technical careers"],
    chapters: [
      ch("Culinary Arts", ["Food Preparation", "Baking", "Food Safety"], shsMaterials("Culinary"), 6),
      ch("Garments", ["Sewing Basics", "Pattern Making", "Textile Knowledge"], shsMaterials("Garments"), 4),
      ch("Tourism & Hospitality", ["Hotel Operations", "Tour Guiding", "Customer Service"], shsMaterials("Tourism"), 4),
    ],
    examPattern: { components: [{ name: "Practical", weight: 50 }, { name: "Written", weight: 25 }, { name: "Project", weight: 25 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Practical Skills", "Service Industry", "Entrepreneurship"],
  },
  {
    id: "tvl-ia",
    name: "Industrial Arts",
    emoji: "🔧",
    color: "text-streak-orange",
    overview: "Technical skills in electronics, automotive, and construction.",
    objectives: ["Apply technical knowledge", "Use tools safely", "Complete industrial projects"],
    chapters: [
      ch("Electronics", ["Basic Circuits", "Soldering", "Troubleshooting"], shsMaterials("Electronics"), 5),
      ch("Automotive", ["Engine Basics", "Maintenance", "Safety"], shsMaterials("Automotive"), 5),
      ch("Construction", ["Blueprint Reading", "Carpentry", "Masonry Basics"], shsMaterials("Construction"), 5),
    ],
    examPattern: { components: [{ name: "Practical", weight: 50 }, { name: "Written", weight: 25 }, { name: "Project", weight: 25 }], difficulty: universalDifficulty },
    assessmentFlow: universalAssessmentFlow,
    skillMapping: ["Technical Skills", "Safety", "Problem Solving"],
  },
];

// =====================================================
// UNIQUE MODULES — ALL GRADES
// =====================================================

// --- KG UNIQUE MODULES ---
const kgUniqueModules: Subject[] = [
  {
    id: "kg-art-color-lab",
    name: "Art & Color Lab",
    emoji: "🎨",
    color: "text-coral",
    overview: "Exploring colors, painting, patterns, and nature art through hands-on creative activities.",
    objectives: ["Identify primary & secondary colors", "Create pattern art", "Express through finger painting"],
    chapters: [
      ch("Color Mixing", ["Primary Colors", "Secondary Colors", "Color Wheel"], kgMaterials("ColorMixing"), 2),
      ch("Finger Painting", ["Free Painting", "Guided Themes", "Texture Painting"], kgMaterials("FingerPaint"), 2),
      ch("Pattern Art", ["Simple Patterns", "Repeating Patterns", "Pattern with Shapes"], kgMaterials("PatternArt"), 2),
      ch("Nature Collage", ["Leaf Art", "Flower Pressing", "Nature Prints"], kgMaterials("NatureCollage"), 2),
    ],
    examPattern: { components: [{ name: "Portfolio", weight: 50 }, { name: "Creativity Badge", weight: 30 }, { name: "Participation", weight: 20 }], difficulty: { easy: 60, moderate: 30, advanced: 10 } },
    assessmentFlow: ["Portfolio Review", "Artwork Upload", "Creativity Badge"],
    projectWork: "Upload Your Best Artwork",
    skillMapping: ["Color Recognition", "Fine Motor", "Creativity", "Self-Expression"],
  },
  {
    id: "kg-story-world",
    name: "Story World (Kahani)",
    emoji: "📚",
    color: "text-magic-purple",
    overview: "Interactive storytelling with moral stories, Philippine folk tales, and voice recording activities.",
    objectives: ["Listen and retell stories", "Identify story morals", "Record own story voice"],
    chapters: [
      ch("Moral Stories", ["Honesty Tales", "Kindness Stories", "Courage Stories"], kgMaterials("MoralStories"), 2),
      ch("Philippine Folk Tales", ["Juan Tamad", "Mariang Makiling", "Ibong Adarna Intro"], kgMaterials("FolkTales"), 3),
      ch("Animal Stories", ["Jungle Stories", "Ocean Stories", "Farm Stories"], kgMaterials("AnimalStories"), 2),
      ch("Interactive Audio Stories", ["Listen & Act", "Sound Effects", "Story Sounds"], kgMaterials("AudioStories"), 2),
    ],
    examPattern: { components: [{ name: "Story Retelling", weight: 40 }, { name: "Character Drawing", weight: 30 }, { name: "Voice Recording", weight: 30 }], difficulty: { easy: 60, moderate: 30, advanced: 10 } },
    assessmentFlow: ["Story Listening", "Retelling Activity", "Voice Recording", "Character Drawing"],
    projectWork: "Record Your Favorite Story",
    skillMapping: ["Listening", "Imagination", "Moral Understanding", "Voice Expression"],
  },
  {
    id: "kg-life-skills",
    name: "Life Skills",
    emoji: "🧹",
    color: "text-xp-green",
    overview: "Daily practical skills — packing bags, hygiene, organizing, and greeting elders.",
    objectives: ["Practice daily hygiene", "Organize personal items", "Show respect to elders"],
    chapters: [
      ch("Packing School Bag", ["What to Pack", "Organizing Items", "Checklist Practice"], kgMaterials("PackBag"), 1),
      ch("Brushing Teeth", ["Proper Brushing", "Morning & Night Routine", "Dental Health"], kgMaterials("BrushTeeth"), 1),
      ch("Washing Hands", ["Steps of Handwashing", "When to Wash", "Germ Awareness"], kgMaterials("WashHands"), 1),
      ch("Organizing Toys", ["Sorting by Type", "Clean-Up Song", "Tidy Habits"], kgMaterials("OrganizeToys"), 1),
      ch("Greeting Elders", ["Mano Po", "Polite Greetings", "Respect Customs"], kgMaterials("Greetings"), 1),
    ],
    examPattern: { components: [{ name: "Checklist Completion", weight: 50 }, { name: "Parent Confirmation", weight: 50 }], difficulty: { easy: 70, moderate: 20, advanced: 10 } },
    assessmentFlow: ["Daily Checklist", "Parent Confirmation", "Skill Badge"],
    skillMapping: ["Self-Care", "Organization", "Respect", "Independence"],
  },
];

// --- G1-3 UNIQUE MODULES ---
const foundationUniqueModules = (grade: string): Subject[] => [
  {
    id: `${grade}-creative-writing-lab`,
    name: "Creative Writing Lab",
    emoji: "✏️",
    color: "text-magic-blue",
    overview: "Story completion, picture writing, dialogue creation, and comic strip design.",
    objectives: ["Complete story prompts", "Write from picture prompts", "Create simple dialogues"],
    chapters: [
      ch("Story Completion", ["Story Starters", "Adding Endings", "Plot Twists"], stdMaterials("StoryCompletion"), 3),
      ch("Picture Story Writing", ["Describe a Picture", "Sequence Pictures", "Create Captions"], stdMaterials("PictureStory"), 3),
      ch("Dialogue Writing", ["Character Conversations", "Speech Bubbles", "Everyday Dialogues"], stdMaterials("DialogueWriting"), 2),
      ch("Comic Strip Creation", ["Panel Layout", "Drawing Characters", "Adding Text"], stdMaterials("ComicStrip"), 3),
    ],
    examPattern: strongerExamPattern,
    assessmentFlow: ["Story Draft", "Peer Review", "Final Portfolio", "Performance Task"],
    projectWork: "Create Your Own Comic Book",
    skillMapping: ["Creative Expression", "Narrative Skills", "Visual Storytelling"],
  },
  {
    id: `${grade}-culture-heritage`,
    name: "Culture & Heritage",
    emoji: "🏛️",
    color: "text-streak-orange",
    overview: "Philippine festivals, traditional clothing, local food, national symbols, and folk dances.",
    objectives: ["Identify Philippine festivals", "Appreciate cultural traditions", "Recognize folk dances"],
    chapters: [
      ch("Philippine Festivals", ["Sinulog", "Ati-Atihan", "Pahiyas", "MassKara"], stdMaterials("Festivals"), 3),
      ch("Traditional Clothing", ["Barong Tagalog", "Terno", "Regional Attire"], stdMaterials("TraditionalClothing"), 2),
      ch("Local Food", ["Regional Cuisine", "Traditional Recipes", "Food Heritage"], stdMaterials("LocalFood"), 2),
      ch("National Symbols", ["National Flower", "National Bird", "National Tree"], stdMaterials("NatSymbols"), 2),
      ch("Folk Dances", ["Tinikling", "Pandango sa Ilaw", "Itik-Itik"], stdMaterials("FolkDances"), 2),
    ],
    examPattern: strongerExamPattern,
    assessmentFlow: ["Cultural Quiz", "Mini Festival Poster", "Cultural Report"],
    projectWork: "Create a Mini Festival Poster",
    skillMapping: ["Cultural Awareness", "National Identity", "Artistic Expression"],
  },
  {
    id: `${grade}-art-design`,
    name: "Art & Design",
    emoji: "🖌️",
    color: "text-magic-purple",
    overview: "Watercolor, paper craft, clay modeling, and digital drawing introduction.",
    objectives: ["Use watercolor techniques", "Create paper crafts", "Introduction to digital art"],
    chapters: [
      ch("Watercolor Basics", ["Wet-on-Wet", "Color Blending", "Simple Landscapes"], stdMaterials("Watercolor"), 3),
      ch("Paper Craft", ["Origami", "Paper Cutting", "3D Paper Art"], stdMaterials("PaperCraft"), 2),
      ch("Clay Modeling", ["Basic Shapes", "Animals", "Cultural Objects"], stdMaterials("ClayModeling"), 2),
      ch("Digital Drawing Intro", ["Drawing Apps", "Basic Tools", "Simple Digital Art"], stdMaterials("DigitalDrawing"), 2),
    ],
    examPattern: strongerExamPattern,
    assessmentFlow: ["Art Portfolio", "Skill Demonstration", "Creativity Assessment"],
    projectWork: "Art Exhibition Portfolio",
    skillMapping: ["Visual Arts", "Fine Motor", "Digital Literacy", "Creativity"],
  },
  {
    id: `${grade}-life-skills-fd`,
    name: "Life Skills",
    emoji: "💡",
    color: "text-xp-green",
    overview: "Money handling, basic saving, teamwork, and problem-solving skills.",
    objectives: ["Handle money responsibly", "Work in teams", "Solve everyday problems"],
    chapters: [
      ch("Money Handling", ["Counting Money", "Making Change", "Smart Spending"], stdMaterials("MoneyHandling"), 2),
      ch("Basic Saving", ["Why Save?", "Piggy Bank Goals", "Needs vs Wants"], stdMaterials("BasicSaving"), 2),
      ch("Teamwork", ["Group Projects", "Communication", "Conflict Resolution"], stdMaterials("Teamwork"), 2),
      ch("Problem Solving", ["Everyday Problems", "Thinking Steps", "Creative Solutions"], stdMaterials("ProblemSolving"), 2),
    ],
    examPattern: strongerExamPattern,
    assessmentFlow: ["Scenario Quiz", "Team Project", "Reflection"],
    skillMapping: ["Financial Awareness", "Collaboration", "Critical Thinking"],
  },
  {
    id: `${grade}-science-practical`,
    name: "Science Practical",
    emoji: "🌱",
    color: "text-xp-green",
    overview: "Plant growing projects, weather recording, and simple experiment videos.",
    objectives: ["Grow a plant from seed", "Record weather observations", "Conduct simple experiments"],
    chapters: [
      ch("Plant Growing Project", ["Planting Seeds", "Growth Diary", "Harvest"], stdMaterials("PlantProject"), 4),
      ch("Weather Chart Recording", ["Daily Weather Log", "Temperature Tracking", "Weather Patterns"], stdMaterials("WeatherChart"), 3),
      ch("Simple Experiments", ["Volcano Model", "Water Cycle", "Magnet Fun"], stdMaterials("SimpleExperiments"), 3),
    ],
    examPattern: strongerExamPattern,
    assessmentFlow: ["Experiment Log", "Project Submission", "Presentation"],
    projectWork: "My Plant Growth Diary",
    skillMapping: ["Scientific Observation", "Record Keeping", "Hands-On Learning"],
  },
];

// --- G4-6 UNIQUE MODULES ---
const intermediateUniqueModules = (grade: string): Subject[] => [
  {
    id: `${grade}-advanced-art`,
    name: "Advanced Art",
    emoji: "🎨",
    color: "text-coral",
    overview: "Perspective drawing, poster design, logo creation, and cultural pattern design.",
    objectives: ["Draw with perspective", "Design posters and logos", "Create cultural patterns"],
    chapters: [
      ch("Perspective Drawing", ["One-Point Perspective", "Two-Point Perspective", "Depth & Shadow"], stdMaterials("Perspective"), 4),
      ch("Poster Design", ["Layout Principles", "Typography Basics", "Color Theory Applied"], stdMaterials("PosterDesign"), 3),
      ch("Logo Creation", ["Brand Concepts", "Simplicity & Impact", "Digital Logo Tools"], stdMaterials("LogoCreation"), 3),
      ch("Cultural Pattern Design", ["Philippine Patterns", "Weaving Patterns", "Modern Cultural Art"], stdMaterials("CulturalPattern"), 3),
    ],
    examPattern: strongerExamPattern,
    assessmentFlow: ["Design Brief", "Portfolio Review", "Peer Critique", "Final Exhibition"],
    projectWork: "Cultural Poster Exhibition",
    skillMapping: ["Visual Design", "Cultural Appreciation", "Digital Art", "Creativity"],
  },
  {
    id: `${grade}-culture-studies`,
    name: "Culture Studies",
    emoji: "🏛️",
    color: "text-magic-purple",
    overview: "Philippine history through stories, ASEAN cultural comparison, and traditional music.",
    objectives: ["Explore Philippine history through narrative", "Compare ASEAN cultures", "Appreciate traditional music"],
    chapters: [
      ch("Philippine History Through Stories", ["Hero Stories", "Revolution Tales", "Independence Narratives"], stdMaterials("PHHistoryStories"), 4),
      ch("ASEAN Cultural Comparison", ["Traditions", "Festivals", "Languages", "Food"], stdMaterials("ASEANCulture"), 3),
      ch("Traditional Music Study", ["Kulintang", "Rondalla", "Indigenous Instruments"], stdMaterials("TradMusic"), 3),
    ],
    examPattern: strongerExamPattern,
    assessmentFlow: ["Cultural Report", "Comparison Project", "Music Appreciation"],
    projectWork: "ASEAN Culture Comparison Poster",
    skillMapping: ["Cultural Analysis", "Comparative Thinking", "Musical Appreciation"],
  },
  {
    id: `${grade}-financial-literacy`,
    name: "Financial Literacy",
    emoji: "💰",
    color: "text-xp-green",
    overview: "Budget planning, simple entrepreneurship, and mini business simulation.",
    objectives: ["Create a simple budget", "Understand basic entrepreneurship", "Simulate a mini business"],
    chapters: [
      ch("Budget Planning", ["Income & Expenses", "Creating a Budget", "Tracking Spending"], stdMaterials("BudgetPlanning"), 3),
      ch("Simple Entrepreneurship", ["Business Ideas", "Costs & Pricing", "Selling Strategy"], stdMaterials("SimpleEntrepreneurship"), 3),
      ch("Mini Business Simulation", ["Setup", "Operations", "Profit & Loss", "Reflection"], stdMaterials("MiniBusiness"), 4),
    ],
    examPattern: strongerExamPattern,
    assessmentFlow: ["Budget Exercise", "Business Plan", "Simulation Report"],
    projectWork: "Mini Business Plan",
    skillMapping: ["Financial Planning", "Entrepreneurial Thinking", "Decision Making"],
  },
  {
    id: `${grade}-public-speaking`,
    name: "Public Speaking",
    emoji: "🎤",
    color: "text-magic-blue",
    overview: "Speech practice, debate introduction, and confidence-building exercises.",
    objectives: ["Deliver a prepared speech", "Participate in simple debates", "Build presentation confidence"],
    chapters: [
      ch("Speech Practice", ["Speech Structure", "Voice Projection", "Body Language"], stdMaterials("SpeechPractice"), 3),
      ch("Debate Intro", ["Argument Building", "Rebuttal", "Formal Debate Rules"], stdMaterials("DebateIntro"), 3),
      ch("Confidence Exercises", ["Impromptu Speaking", "Group Presentations", "Stage Presence"], stdMaterials("Confidence"), 2),
    ],
    examPattern: strongerExamPattern,
    assessmentFlow: ["Speech Recording", "Debate Participation", "Peer Feedback"],
    projectWork: "My TED-Style Talk",
    skillMapping: ["Communication", "Persuasion", "Confidence", "Critical Thinking"],
  },
  {
    id: `${grade}-environmental-action`,
    name: "Environmental Action",
    emoji: "🌍",
    color: "text-xp-green",
    overview: "Environmental awareness, conservation projects, and sustainability practices.",
    objectives: ["Understand environmental issues", "Plan conservation actions", "Practice sustainability"],
    chapters: [
      ch("Environmental Issues", ["Pollution", "Deforestation", "Climate Change Basics"], stdMaterials("EnvIssues"), 3),
      ch("Conservation Projects", ["Tree Planting", "Waste Segregation", "Water Conservation"], stdMaterials("Conservation"), 3),
      ch("Sustainability", ["Reduce Reuse Recycle", "Sustainable Living", "Green Technology"], stdMaterials("Sustainability"), 3),
    ],
    examPattern: strongerExamPattern,
    assessmentFlow: ["Awareness Quiz", "Action Project", "Impact Report"],
    projectWork: "My Environmental Action Plan",
    skillMapping: ["Environmental Awareness", "Civic Responsibility", "Project Planning"],
  },
];

// --- G7-10 UNIQUE MODULES ---
const jhsUniqueModules = (grade: string): Subject[] => [
  {
    id: `${grade}-project-based`,
    name: "Project-Based Learning",
    emoji: "🔬",
    color: "text-primary",
    overview: "Science fair, business simulation, cultural documentary, and community survey projects.",
    objectives: ["Complete a full project cycle", "Present research findings", "Work in teams"],
    chapters: [
      ch("Science Fair Project", ["Hypothesis", "Experiment Design", "Data Analysis", "Presentation"], stdMaterials("ScienceFair"), 6),
      ch("Business Startup Simulation", ["Idea Generation", "Business Model", "Pitch Deck", "Simulation Run"], stdMaterials("BizStartup"), 5),
      ch("Cultural Documentary", ["Research", "Storyboarding", "Video/Photo Collection", "Editing"], stdMaterials("CulturalDoc"), 5),
      ch("Community Survey Project", ["Survey Design", "Data Collection", "Analysis", "Report"], stdMaterials("CommSurvey"), 4),
    ],
    examPattern: strongerExamPattern,
    assessmentFlow: ["Project Proposal", "Progress Check", "Final Presentation", "Peer Review"],
    projectWork: "Quarterly Project Submission",
    skillMapping: ["Research", "Teamwork", "Presentation", "Critical Analysis"],
  },
  {
    id: `${grade}-creative-tech`,
    name: "Creative Tech",
    emoji: "💡",
    color: "text-magic-blue",
    overview: "Basic coding, app design concepts, graphic design, and video editing.",
    objectives: ["Write basic code", "Design app wireframes", "Create graphic designs", "Edit simple videos"],
    chapters: [
      ch("Basic Coding", ["HTML/CSS Intro", "JavaScript Basics", "Simple Web Pages"], stdMaterials("BasicCoding"), 5),
      ch("App Design Concept", ["Wireframing", "User Flow", "UI Design Basics"], stdMaterials("AppDesign"), 4),
      ch("Graphic Design", ["Canva/Design Tools", "Poster & Banner", "Social Media Graphics"], stdMaterials("GraphicDesign"), 3),
      ch("Video Editing", ["Video Tools", "Cutting & Transitions", "Audio & Effects"], stdMaterials("VideoEditing"), 4),
    ],
    examPattern: strongerExamPattern,
    assessmentFlow: ["Tech Project", "Portfolio", "Peer Review", "Presentation"],
    projectWork: "My Creative Tech Portfolio",
    skillMapping: ["Coding", "Design Thinking", "Digital Creation", "Innovation"],
  },
  {
    id: `${grade}-cultural-analysis`,
    name: "Cultural Analysis",
    emoji: "🌐",
    color: "text-magic-purple",
    overview: "World religions awareness, political awareness, and media literacy.",
    objectives: ["Understand cultural diversity", "Analyze media messages", "Develop political awareness"],
    chapters: [
      ch("World Religions Awareness", ["Major Religions Overview", "Interfaith Respect", "Cultural Practices"], stdMaterials("WorldReligions"), 3),
      ch("Political Awareness", ["Government Structure", "Citizens' Rights", "Current Events Analysis"], stdMaterials("PoliticalAwareness"), 3),
      ch("Media Literacy", ["Fake News Detection", "Source Evaluation", "Responsible Social Media"], stdMaterials("MediaLiteracy"), 3),
    ],
    examPattern: strongerExamPattern,
    assessmentFlow: ["Analysis Paper", "Media Project", "Discussion Forum"],
    skillMapping: ["Cultural Sensitivity", "Critical Media Analysis", "Civic Awareness"],
  },
  {
    id: `${grade}-life-management`,
    name: "Life Management",
    emoji: "🧠",
    color: "text-xp-green",
    overview: "Time management, goal setting, mental health awareness, and leadership training.",
    objectives: ["Manage time effectively", "Set SMART goals", "Understand mental health", "Develop leadership"],
    chapters: [
      ch("Time Management", ["Prioritization", "Study Schedules", "Productivity Tools"], stdMaterials("TimeManagement"), 3),
      ch("Goal Setting", ["SMART Goals", "Vision Board", "Tracking Progress"], stdMaterials("GoalSetting"), 2),
      ch("Mental Health Awareness", ["Stress Management", "Emotional Intelligence", "Seeking Help"], stdMaterials("MentalHealth"), 3),
      ch("Leadership Training", ["Leadership Styles", "Team Building", "Decision Making"], stdMaterials("Leadership"), 3),
    ],
    examPattern: strongerExamPattern,
    assessmentFlow: ["Self-Assessment", "Goal Plan", "Reflection Journal", "Peer Feedback"],
    projectWork: "My Life Management Plan",
    skillMapping: ["Self-Management", "Emotional Intelligence", "Leadership", "Goal Setting"],
  },
  {
    id: `${grade}-diy-projects`,
    name: "DIY Practical Projects",
    emoji: "🔨",
    color: "text-streak-orange",
    overview: "Hands-on building, repair, crafting, and maker-space activities.",
    objectives: ["Build practical projects", "Learn basic repair skills", "Develop maker mindset"],
    chapters: [
      ch("DIY Electronics", ["Simple Circuits", "LED Projects", "Arduino Intro"], stdMaterials("DIYElectronics"), 4),
      ch("DIY Crafts", ["Woodwork Basics", "Recycled Art", "Home Decor Projects"], stdMaterials("DIYCrafts"), 3),
      ch("Repair Skills", ["Basic Tool Use", "Simple Fixes", "Maintenance Habits"], stdMaterials("RepairSkills"), 2),
    ],
    examPattern: strongerExamPattern,
    assessmentFlow: ["Build Log", "Project Demo", "Portfolio"],
    projectWork: "My DIY Project Showcase",
    skillMapping: ["Practical Skills", "Problem Solving", "Innovation", "Resourcefulness"],
  },
];

// --- SHS UNIQUE MODULES (shared across strands) ---
const shsUniqueModules = (strandPrefix: string): Subject[] => [
  {
    id: `${strandPrefix}-portfolio-builder`,
    name: "Portfolio Builder",
    emoji: "📁",
    color: "text-primary",
    overview: "Building a comprehensive academic and skills portfolio for college and career readiness.",
    objectives: ["Compile best work samples", "Write reflections", "Prepare for college applications"],
    chapters: [
      ch("Portfolio Planning", ["Selecting Work Samples", "Organization", "Digital Portfolio Tools"], shsMaterials("PortfolioPlan"), 3),
      ch("Reflection Writing", ["Growth Reflection", "Skill Documentation", "Achievement Narrative"], shsMaterials("ReflectionWriting"), 3),
      ch("Presentation", ["Portfolio Defense", "Interview Prep", "College Application"], shsMaterials("PortfolioPresent"), 3),
    ],
    examPattern: { components: [{ name: "Portfolio Quality", weight: 40 }, { name: "Reflection Depth", weight: 30 }, { name: "Defense", weight: 30 }], difficulty: universalDifficulty },
    assessmentFlow: ["Portfolio Draft", "Peer Review", "Final Defense"],
    skillMapping: ["Self-Reflection", "Documentation", "Presentation", "Career Readiness"],
  },
  {
    id: `${strandPrefix}-public-speaking-adv`,
    name: "Public Speaking & Confidence",
    emoji: "🎤",
    color: "text-magic-blue",
    overview: "Advanced speech, debate, and professional presentation skills.",
    objectives: ["Deliver persuasive speeches", "Win debates", "Present professionally"],
    chapters: [
      ch("Persuasive Speaking", ["Argumentation", "Rhetoric", "Emotional Appeal"], shsMaterials("PersuasiveSpeaking"), 4),
      ch("Formal Debate", ["Parliamentary Debate", "Cross-Examination", "Adjudication"], shsMaterials("FormalDebate"), 4),
      ch("Professional Presentations", ["Slide Design", "Storytelling in Business", "Q&A Handling"], shsMaterials("ProPresentation"), 3),
    ],
    examPattern: strongerExamPattern,
    assessmentFlow: ["Speech Recording", "Debate Tournament", "Presentation"],
    skillMapping: ["Oratory", "Persuasion", "Professional Communication"],
  },
];

// =====================================================
// COMPLETE GRADE LEVELS (WITH UNIQUE MODULES)
// =====================================================
export const allGrades: GradeLevel[] = [
  { id: "lkg", name: "LKG", emoji: "🌱", stage: "kindergarten", subjects: [...lkgSubjects, ...kgUniqueModules.map(s => ({ ...s, id: s.id.replace("kg-", "lkg-") }))] },
  { id: "ukg", name: "UKG", emoji: "🌿", stage: "kindergarten", subjects: [...ukgSubjects, ...kgUniqueModules.map(s => ({ ...s, id: s.id.replace("kg-", "ukg-") }))] },
  { id: "g1", name: "Grade 1", emoji: "⭐", stage: "foundation", subjects: [...g1Subjects, ...foundationUniqueModules("g1")] },
  { id: "g2", name: "Grade 2", emoji: "🔥", stage: "foundation", subjects: [...g2Subjects, ...foundationUniqueModules("g2")] },
  { id: "g3", name: "Grade 3", emoji: "💎", stage: "foundation", subjects: [...g3Subjects, ...foundationUniqueModules("g3")] },
  { id: "g4", name: "Grade 4", emoji: "🚀", stage: "intermediate", subjects: [...g4Subjects, ...intermediateUniqueModules("g4")] },
  { id: "g5", name: "Grade 5", emoji: "👑", stage: "intermediate", subjects: [...g5Subjects, ...intermediateUniqueModules("g5")] },
  { id: "g6", name: "Grade 6", emoji: "🏰", stage: "intermediate", subjects: [...g6Subjects, ...intermediateUniqueModules("g6")] },
  { id: "g7", name: "Grade 7", emoji: "🗡️", stage: "junior-high", subjects: [...g7Subjects, ...jhsUniqueModules("g7")] },
  { id: "g8", name: "Grade 8", emoji: "🛡️", stage: "junior-high", subjects: [...g8Subjects, ...jhsUniqueModules("g8")] },
  { id: "g9", name: "Grade 9", emoji: "⚔️", stage: "junior-high", subjects: [...g9Subjects, ...jhsUniqueModules("g9")] },
  { id: "g10", name: "Grade 10", emoji: "🎯", stage: "junior-high", subjects: [...g10Subjects, ...jhsUniqueModules("g10")] },
  { id: "g11-stem", name: "Grade 11 STEM", emoji: "🧬", stage: "senior-high", strand: "STEM", subjects: [...stemSubjects, ...shsUniqueModules("shs-stem")] },
  { id: "g11-abm", name: "Grade 11 ABM", emoji: "💼", stage: "senior-high", strand: "ABM", subjects: [...abmSubjects, ...shsUniqueModules("shs-abm")] },
  { id: "g11-humss", name: "Grade 11 HUMSS", emoji: "📜", stage: "senior-high", strand: "HUMSS", subjects: [...humssSubjects, ...shsUniqueModules("shs-humss")] },
  { id: "g11-gas", name: "Grade 11 GAS", emoji: "🎓", stage: "senior-high", strand: "GAS", subjects: [...gasSubjects, ...shsUniqueModules("shs-gas")] },
  { id: "g11-tvl", name: "Grade 11 TVL", emoji: "🔧", stage: "senior-high", strand: "TVL", subjects: [...tvlSubjects, ...shsUniqueModules("shs-tvl")] },
  { id: "g12-stem", name: "Grade 12 STEM", emoji: "🧬", stage: "senior-high", strand: "STEM", subjects: [...stemSubjects, ...shsUniqueModules("shs12-stem")] },
  { id: "g12-abm", name: "Grade 12 ABM", emoji: "💼", stage: "senior-high", strand: "ABM", subjects: [...abmSubjects, ...shsUniqueModules("shs12-abm")] },
  { id: "g12-humss", name: "Grade 12 HUMSS", emoji: "📜", stage: "senior-high", strand: "HUMSS", subjects: [...humssSubjects, ...shsUniqueModules("shs12-humss")] },
  { id: "g12-gas", name: "Grade 12 GAS", emoji: "🎓", stage: "senior-high", strand: "GAS", subjects: [...gasSubjects, ...shsUniqueModules("shs12-gas")] },
  { id: "g12-tvl", name: "Grade 12 TVL", emoji: "🔧", stage: "senior-high", strand: "TVL", subjects: [...tvlSubjects, ...shsUniqueModules("shs12-tvl")] },
];

export const stageLabels: Record<string, string> = {
  kindergarten: "Kindergarten",
  foundation: "Foundation (G1–3)",
  intermediate: "Intermediate (G4–6)",
  "junior-high": "Junior High (G7–10)",
  "senior-high": "Senior High (G11–12)",
};

export const stageColors: Record<string, string> = {
  kindergarten: "bg-xp-green",
  foundation: "bg-primary",
  intermediate: "bg-magic-blue",
  "junior-high": "bg-magic-purple",
  "senior-high": "bg-streak-orange",
};
