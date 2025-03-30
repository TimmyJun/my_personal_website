const Data = {
  // 作品集
  portfolio: [
    {
      id: "expense-tracker",
      title: "個人記帳 Web App",
      description: "直覺化的預算管理工具，幫助用戶追蹤每月開銷，並視覺化消費模式",
      technologies: ["HTML", "CSS", "JavaScript(ES6)"],
      image: "/my_personal_website/src/assets/images/balance-tracking.png",
      github: "https://github.com/TimmyJun/Balance-Tracking-App?tab=readme-ov-file",
      demo: "https://timmyjun.github.io/Balance-Tracking-App/",
      features: [
        "直觀的支出追蹤介面",
        "數據視覺化圖表",
        "支出分類管理",
        "預算設定與提醒"
      ]
    },
    {
      id: "split-bill",
      title: "群組分帳 Web App",
      description: "幫助用戶快速分攤聚會費用，計算個人應付款項",
      technologies: ["HTML", "CSS", "JavaScript(ES6)", "Chart.js"],
      image: "/my_personal_website/src/assets/images/split-bills.png",
      github: "https://github.com/TimmyJun/Split-the-bills",
      demo: "https://timmyjun.github.io/Split-the-bills/",
      features: [
        "即時多人同步",
        "自定義分帳規則",
        "支出歷史記錄",
        "匯出報表功能"
      ]
    }
  ],

  // 經歷
  experience: [
    {
      company: "大阪商業大學",
      position: "學生櫃檯行政助手",
      startDate: "2024/10",
      endDate: "2025/01",
      description: [
        "主要負責學生櫃檯的行政工作，另外還要負責幫忙綜合交流中心指派的其他工作，包含特殊節慶佈置、活動宣傳。",
        "開設中文課，使用日文教導當地學生中文的基本會話，每次參加人數超過15人。"
      ]
    },
    {
      company: "BenQ 明基電通",
      position: "全球網站管理與客戶服務實習生",
      startDate: "2022/12",
      endDate: "2024/02",
      description: [
        "負責管理與維護全球售後 FAQ (Frequently asked questions)頁面，涵蓋 B2C、B2B 與電競產品線，確保多區市場內容的準確性與即時性。",
        "作為總部與各國辦公室的聯繫窗口，協調歐洲、亞洲、美洲等市場的 FAQ 更新，提升客戶自助服務效率。",
        "協助主管優化內部工作流程，提升70%作業準確度並減少重複性查詢。",
        "參與流程自動化與內容策略優化專案，透過數據分析並提供回饋建議，幫助部門提升工作效率。"
      ]
    },
    {
      company: "大阪商業大學",
      position: "交換學生",
      startDate: "2024/09",
      endDate: "2025/02",
      description: []
    },
    {
      company: "銘傳大學",
      position: "企業管理(品牌行銷組)",
      startDate: "2020/09",
      endDate: "2025/02",
      description: []
    },
    {
      company: "銘傳大學國際交流處",
      position: "國際學伴",
      startDate: "2021/09",
      endDate: "2024/06",
      description: ["利用外語能力協助外籍學生適應留學生活。", "協助國際交流中心籌辦5次以上迎新活動和文化體驗活動。"]
    }
  ],

  // 技能
  skills: [
    {
      category: "產品管理",
      items: ["產品策略", "用戶研究", "需求分析", "產品規劃"]
    },
    {
      category: "技術能力",
      items: ["React.js", "JavaScript", "HTML/CSS", "Git"]
    },
    {
      category: "其他技能",
      items: ["專案管理", "團隊協作", "問題解決", "溝通能力"]
    }
  ],
}

export { Data }; 