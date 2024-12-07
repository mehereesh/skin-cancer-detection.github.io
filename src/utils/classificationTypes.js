// Classification types and metadata for skin lesions
export const SEVERITY_LEVELS = {
  BENIGN: 'Benign',
  SUSPICIOUS: 'Suspicious',
  MALIGNANT: 'Malignant'
};

export const CANCER_STAGES = {
  STAGE_0: 'Stage 0 (in situ)',
  STAGE_1: 'Stage I',
  STAGE_2: 'Stage II',
  STAGE_3: 'Stage III',
  STAGE_4: 'Stage IV'
};

export const LESION_TYPES = {
  MELANOMA: {
    name: 'Melanoma',
    type: SEVERITY_LEVELS.MALIGNANT,
    description: 'The most serious type of skin cancer that begins in melanocytes.',
    riskLevel: 'High',
    commonStages: [CANCER_STAGES.STAGE_0, CANCER_STAGES.STAGE_1, CANCER_STAGES.STAGE_2, 
                   CANCER_STAGES.STAGE_3, CANCER_STAGES.STAGE_4]
  },
  BCC: {
    name: 'Basal Cell Carcinoma',
    type: SEVERITY_LEVELS.MALIGNANT,
    description: 'The most common type of skin cancer, usually highly treatable.',
    riskLevel: 'Moderate',
    commonStages: [CANCER_STAGES.STAGE_0, CANCER_STAGES.STAGE_1, CANCER_STAGES.STAGE_2]
  },
  SCC: {
    name: 'Squamous Cell Carcinoma',
    type: SEVERITY_LEVELS.MALIGNANT,
    description: 'The second most common type of skin cancer.',
    riskLevel: 'Moderate to High',
    commonStages: [CANCER_STAGES.STAGE_0, CANCER_STAGES.STAGE_1, CANCER_STAGES.STAGE_2, 
                   CANCER_STAGES.STAGE_3]
  },
  ACTINIC_KERATOSIS: {
    name: 'Actinic Keratosis',
    type: SEVERITY_LEVELS.SUSPICIOUS,
    description: 'Precancerous growths that may develop into squamous cell carcinoma.',
    riskLevel: 'Low to Moderate',
    commonStages: []
  },
  NEVUS: {
    name: 'Melanocytic Nevus',
    type: SEVERITY_LEVELS.BENIGN,
    description: 'Common moles that are usually harmless but should be monitored for changes.',
    riskLevel: 'Very Low',
    commonStages: []
  },
  SEBORRHEIC_KERATOSIS: {
    name: 'Seborrheic Keratosis',
    type: SEVERITY_LEVELS.BENIGN,
    description: 'Benign skin growths that commonly appear with age.',
    riskLevel: 'Very Low',
    commonStages: []
  }
};