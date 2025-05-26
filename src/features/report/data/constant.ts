export enum ETargetType {
  ACCOUNT = "account",
  POST = "post",
  REVIEW = "review",
}

export enum EReasonAccount {
  SPAM = "Sends spam or unwanted content",
  INAPPROPRIATE_CONTENT = "Posts offensive or banned content",
  HARASSMENT = "Harasses or insults others",
  IMPERSONATION = "Impersonates someone else",
  FRAUD = "Engages in fraud or scams",
  FAKE_INFO = "Provides false information",
  UNDERAGE = "User is under the allowed age",
  OTHER = "Other reason",
}

export enum EReasonPost {
  SPAM = "Spam or repetitive content",
  INAPPROPRIATE_CONTENT = "Offensive or illegal content",
  HARASSMENT = "Attacks or insults others",
  FAKE_PRODUCT = "Fake or misleading product",
  SCAM = "Scam or money trap",
  PROHIBITED = "Prohibited item or product",
  MISLEADING = "False or misleading info",
}

export enum EReasonReview {
  SPAM = "Spam or irrelevant content",
  INAPPROPRIATE_CONTENT = "Offensive or inappropriate words",
  HARASSMENT = "Insulting or harassing review",
  FAKE_REVIEW = "Fake or dishonest review",
  OFF_TOPIC = "Not related to product/service",
  OTHER = "Other reason",
}
