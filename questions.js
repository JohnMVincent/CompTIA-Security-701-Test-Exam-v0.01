const questions = [
  {
    question:
      "Which element of the CIA triad is improved by installing redundant power supplies in a server?",
    options: [
      "Non-repudiation",
      "Availability",
      "Confidentiality",
      "Integrity",
    ],
    answer: 1,
    explanation:
      "Redundant power supplies help keep the server operational if one power supply fails, improving availability.",
  },
  {
    question:
      "Which security property provides proof that a sender performed an action and cannot reasonably deny it later?",
    options: ["Segmentation", "Non-repudiation", "Availability", "Obfuscation"],
    answer: 1,
    explanation:
      "Non-repudiation provides evidence that a specific party performed an action, commonly through digital signatures.",
  },
  {
    question:
      "During the AAA process, which function verifies a user's claimed identity?",
    options: ["Accounting", "Authorization", "Authentication", "Auditing"],
    answer: 2,
    explanation:
      "Authentication verifies identity. Authorization determines permitted actions, and accounting records activity.",
  },
  {
    question:
      "Which principle is most closely associated with a zero-trust architecture?",
    options: [
      "Verify explicitly before granting access",
      "Allow permanent administrative access",
      "Trust all devices on the internal network",
      "Disable network segmentation",
    ],
    answer: 0,
    explanation:
      "Zero trust assumes no implicit trust and requires explicit verification based on identity, device, context, and policy.",
  },
  {
    question: "Which of the following is a physical security control?",
    options: [
      "Bollard",
      "Antivirus signature",
      "Firewall rule",
      "Password policy",
    ],
    answer: 0,
    explanation:
      "A bollard is a physical barrier used to prevent vehicles from approaching or striking a protected area.",
  },
  {
    question:
      "Requiring multifactor authentication before account access is primarily what type of control?",
    options: ["Compensating", "Recovery", "Preventive", "Corrective"],
    answer: 2,
    explanation:
      "MFA is primarily preventive because it attempts to stop unauthorized access before it occurs.",
  },
  {
    question:
      "Which of the following is best categorized as a technical control?",
    options: [
      "Acceptable use policy",
      "Network firewall",
      "Background checks",
      "Security awareness training",
    ],
    answer: 1,
    explanation:
      "A network firewall is implemented through technology, making it a technical control.",
  },
  {
    question:
      "What is the main purpose of a rollback plan during a system change?",
    options: [
      "To calculate the cost of the change",
      "To document employee attendance",
      "To restore the previous state if the change fails",
      "To identify the change owner",
    ],
    answer: 2,
    explanation:
      "A rollback plan defines how to return a system to its prior working state if a change causes problems.",
  },
  {
    question:
      "Which cryptographic process is primarily used to verify that data has not been altered?",
    options: [
      "Steganography",
      "Symmetric decryption",
      "Tokenization",
      "Hashing",
    ],
    answer: 3,
    explanation:
      "A hash produces a digest that changes when the source data changes, making it useful for integrity verification.",
  },
  {
    question: "Why is a unique salt added before hashing each stored password?",
    options: [
      "To allow password sharing between accounts",
      "To reduce the password length",
      "To make the password easier to decrypt",
      "To prevent identical passwords from producing identical stored hashes",
    ],
    answer: 3,
    explanation:
      "A unique salt makes identical passwords produce different hashes and makes precomputed rainbow tables less useful.",
  },
  {
    question:
      "What is a common advantage of symmetric encryption compared with asymmetric encryption?",
    options: [
      "It always uses public certificates",
      "It is generally faster for bulk data encryption",
      "It does not require a key",
      "It automatically provides non-repudiation",
    ],
    answer: 1,
    explanation:
      "Symmetric encryption is computationally efficient and is commonly used to encrypt large amounts of data.",
  },
  {
    question:
      "An attacker sends a highly targeted fraudulent email to a company's chief financial officer. What type of attack is this?",
    options: ["Tailgating", "Smishing", "Whaling", "Typosquatting"],
    answer: 2,
    explanation:
      "Whaling is a spear-phishing attack aimed at executives or other high-value individuals.",
  },
  {
    question:
      "A caller pretends to be from the help desk and requests an employee's password. Which social engineering technique is being used?",
    options: ["Shoulder surfing", "Dumpster diving", "Vishing", "Smishing"],
    answer: 2,
    explanation:
      "Vishing is voice-based phishing conducted through telephone or voice communication.",
  },
  {
    question:
      "An employee receives a malicious text message containing a fake account recovery link. What is this attack called?",
    options: ["Smishing", "Pretexting", "Pharming", "Whaling"],
    answer: 0,
    explanation:
      "Smishing is phishing delivered through SMS or other text messaging services.",
  },
  {
    question:
      "An attacker compromises a website commonly visited by employees of a specific organization. What type of attack is this?",
    options: [
      "Business email compromise",
      "Credential stuffing",
      "Password spraying",
      "Watering-hole attack",
    ],
    answer: 3,
    explanation:
      "A watering-hole attack compromises a site frequently visited by the intended targets.",
  },
  {
    question:
      "Malicious code is inserted into a trusted software vendor's update package. Which attack does this describe?",
    options: [
      "Supply-chain attack",
      "Downgrade attack",
      "Replay attack",
      "Collision attack",
    ],
    answer: 0,
    explanation:
      "A supply-chain attack compromises a trusted supplier, service, component, or update mechanism.",
  },
  {
    question:
      "An attacker registers 'examp1e.com' to impersonate 'example.com.' Which technique is being used?",
    options: ["Bluejacking", "Cryptojacking", "Typosquatting", "Wardriving"],
    answer: 2,
    explanation:
      "Typosquatting uses look-alike or mistyped domain names to mislead users.",
  },
  {
    question:
      "An attacker uses username-and-password pairs stolen from one website to log in to another website. What is this called?",
    options: [
      "Password spraying",
      "Privilege escalation",
      "Credential stuffing",
      "Brute-force hashing",
    ],
    answer: 2,
    explanation:
      "Credential stuffing reuses previously stolen credentials against other services.",
  },
  {
    question:
      "An attacker tries the password 'Summer2026!' against hundreds of user accounts. Which attack is this?",
    options: [
      "Credential stuffing",
      "Pass-the-hash",
      "Rainbow-table attack",
      "Password spraying",
    ],
    answer: 3,
    explanation:
      "Password spraying tests one or a few common passwords against many accounts to reduce lockouts.",
  },
  {
    question:
      "An attacker secretly intercepts and possibly alters traffic between two systems. What type of attack is occurring?",
    options: [
      "Directory traversal",
      "Birthday attack",
      "Resource exhaustion",
      "On-path attack",
    ],
    answer: 3,
    explanation:
      "An on-path attack places the attacker between communicating parties to observe or alter traffic.",
  },
  {
    question:
      "Which control best helps prevent reuse of a captured authentication message?",
    options: [
      "A static initialization vector",
      "A nonce or timestamp",
      "A longer username",
      "A shared administrator account",
    ],
    answer: 1,
    explanation:
      "A unique nonce or valid timestamp helps ensure an authentication exchange cannot simply be replayed.",
  },
  {
    question:
      "Which development practice is most effective against SQL injection?",
    options: [
      "Disabling TLS",
      "Increasing session timeout",
      "Storing passwords in plaintext",
      "Parameterized queries",
    ],
    answer: 3,
    explanation:
      "Parameterized queries separate user-supplied data from executable SQL instructions.",
  },
  {
    question:
      "Which control most directly reduces the risk of reflected cross-site scripting?",
    options: [
      "Increasing password length",
      "Context-aware output encoding",
      "Opening additional network ports",
      "Disabling database backups",
    ],
    answer: 1,
    explanation:
      "Context-aware output encoding prevents untrusted input from being interpreted as executable browser content.",
  },
  {
    question: "Which practice helps reduce buffer-overflow vulnerabilities?",
    options: [
      "Using memory-safe languages and validating input bounds",
      "Disabling endpoint logging",
      "Reusing default credentials",
      "Allowing unrestricted input lengths",
    ],
    answer: 0,
    explanation:
      "Bounds checking and memory-safe languages reduce unsafe memory access that can lead to buffer overflows.",
  },
  {
    question:
      "Two processes access and modify the same resource in an unexpected sequence, producing an insecure result. What vulnerability is this?",
    options: [
      "Hash collision",
      "Race condition",
      "DNS poisoning",
      "Integer encoding",
    ],
    answer: 1,
    explanation:
      "A race condition occurs when the outcome depends on the timing or order of concurrent operations.",
  },
  {
    question:
      "A standard user exploits a flaw and gains administrator permissions. What has occurred?",
    options: [
      "Tokenization",
      "Privilege escalation",
      "Data masking",
      "Account federation",
    ],
    answer: 1,
    explanation:
      "Privilege escalation occurs when a user or process gains permissions beyond those originally assigned.",
  },
  {
    question:
      "Users report that files have unfamiliar extensions and cannot be opened. A payment demand appears on each screen. What is the most likely cause?",
    options: [
      "Adware",
      "Logic analyzer",
      "Ransomware",
      "Root certificate update",
    ],
    answer: 2,
    explanation:
      "Ransomware commonly encrypts files and demands payment for restoration.",
  },
  {
    question: "Which combination best limits damage from a malicious insider?",
    options: [
      "Shared accounts and disabled logging",
      "Least privilege and data loss prevention",
      "Default passwords and unrestricted removable media",
      "Permanent administrator access and open shares",
    ],
    answer: 1,
    explanation:
      "Least privilege limits access, while DLP can detect or block unauthorized movement of sensitive data.",
  },
  {
    question:
      "What should an administrator do first to reduce the risk from newly deployed IoT devices with factory credentials?",
    options: [
      "Change the default credentials",
      "Connect the devices directly to critical servers",
      "Publish the credentials internally",
      "Disable all security logs",
    ],
    answer: 0,
    explanation:
      "Changing default credentials removes a common and easily exploited weakness.",
  },
  {
    question: "What is a zero-day vulnerability?",
    options: [
      "A configuration setting with no business impact",
      "A vulnerability that has been patched for at least one year",
      "A vulnerability unknown to the vendor or without an available fix when exploited",
      "A failed login that occurs at midnight",
    ],
    answer: 2,
    explanation:
      "A zero-day vulnerability is exploited before defenders have an available vendor fix or adequate prior knowledge.",
  },
  {
    question:
      "Which process most directly reduces exposure to publicly known software vulnerabilities?",
    options: [
      "Patch management",
      "Job rotation",
      "Data classification",
      "Badge issuance",
    ],
    answer: 0,
    explanation:
      "Patch management identifies, tests, deploys, and verifies fixes for known software vulnerabilities.",
  },
  {
    question:
      "Which design most effectively limits lateral movement between employee workstations and critical servers?",
    options: [
      "A single flat network",
      "Network segmentation",
      "Shared administrator accounts",
      "Disabling internal firewalls",
    ],
    answer: 1,
    explanation:
      "Segmentation separates systems into controlled zones and restricts traffic between them.",
  },
  {
    question:
      "Where should a public-facing web server normally be placed to reduce direct exposure of the internal network?",
    options: [
      "Backup network",
      "Internal database subnet",
      "Management VLAN",
      "DMZ",
    ],
    answer: 3,
    explanation:
      "A DMZ provides a controlled network segment for public-facing services.",
  },
  {
    question:
      "Which architecture provides the strongest network isolation for a highly sensitive offline system?",
    options: [
      "Full-tunnel VPN",
      "Air gap",
      "Port forwarding",
      "Split tunneling",
    ],
    answer: 1,
    explanation:
      "An air-gapped system is physically or logically isolated from other networks.",
  },
  {
    question:
      "In a public cloud shared-responsibility model, which statement is generally correct?",
    options: [
      "The customer has no security responsibilities",
      "The customer owns and operates the provider's physical data center",
      "The provider is responsible for every customer password",
      "The provider and customer each have defined security responsibilities",
    ],
    answer: 3,
    explanation:
      "Cloud security duties are divided between the provider and customer based on the service model.",
  },
  {
    question:
      "In an IaaS environment, who is typically responsible for patching the guest operating system?",
    options: [
      "The internet service provider",
      "The cloud customer",
      "The building owner",
      "The certificate authority",
    ],
    answer: 1,
    explanation:
      "In IaaS, the customer normally manages guest operating systems, applications, identities, and data.",
  },
  {
    question:
      "Which cloud service model gives the customer the least responsibility for maintaining the application platform?",
    options: ["SaaS", "On-premises", "IaaS", "Colocation"],
    answer: 0,
    explanation:
      "With SaaS, the provider operates the application and underlying platform while the customer manages usage, access, and data.",
  },
  {
    question: "Which technology best protects data at rest on a stolen laptop?",
    options: [
      "TLS",
      "Full-disk encryption",
      "Load balancing",
      "Network address translation",
    ],
    answer: 1,
    explanation:
      "Full-disk encryption protects stored data when the device is powered off or locked.",
  },
  {
    question: "Which protocol is commonly used to protect web data in transit?",
    options: ["SNMPv1", "TLS", "TFTP", "ARP"],
    answer: 1,
    explanation:
      "TLS provides encryption and integrity protection for data transmitted between networked systems.",
  },
  {
    question:
      "Which technology is designed to isolate sensitive computations while data is being processed?",
    options: [
      "Public file share",
      "Open wireless network",
      "Secure enclave",
      "Unencrypted swap file",
    ],
    answer: 2,
    explanation:
      "A secure enclave or trusted execution environment isolates sensitive code and data during processing.",
  },
  {
    question:
      "Which device is specifically designed to generate, protect, and use cryptographic keys in tamper-resistant hardware?",
    options: ["Wireless controller", "Proxy server", "Load balancer", "HSM"],
    answer: 3,
    explanation:
      "A hardware security module protects cryptographic keys and performs cryptographic operations.",
  },
  {
    question:
      "Which component commonly stores device-specific keys and supports measured boot on a workstation?",
    options: ["GPU", "KVM switch", "NIC", "TPM"],
    answer: 3,
    explanation:
      "A trusted platform module securely stores cryptographic material and supports platform integrity measurements.",
  },
  {
    question:
      "Which component distributes client requests across multiple servers to improve service availability?",
    options: ["Load balancer", "Jump server", "Data diode", "Packet sniffer"],
    answer: 0,
    explanation:
      "A load balancer spreads requests across available servers and can route around failed nodes.",
  },
  {
    question: "What does recovery time objective measure?",
    options: [
      "The annual number of expected incidents",
      "The time required to create an employee account",
      "The maximum targeted time to restore a service after disruption",
      "The maximum acceptable amount of data loss measured in time",
    ],
    answer: 2,
    explanation:
      "RTO defines the targeted maximum duration a service may remain unavailable after an incident.",
  },
  {
    question: "What does recovery point objective define?",
    options: [
      "The number of redundant power supplies",
      "The maximum number of concurrent users",
      "The maximum acceptable data loss measured in time",
      "The target time to replace a failed server",
    ],
    answer: 2,
    explanation:
      "RPO identifies how far back data recovery may go, such as losing no more than 15 minutes of data.",
  },
  {
    question:
      "Which recovery site is already equipped and generally capable of taking over operations with minimal delay?",
    options: [
      "Cold site",
      "Hot site",
      "Empty warehouse",
      "Reciprocal parking agreement",
    ],
    answer: 1,
    explanation:
      "A hot site has systems, connectivity, and data readiness intended for rapid recovery.",
  },
  {
    question:
      "Which control can enforce authentication, rate limits, and policy for requests entering a microservices environment?",
    options: ["Screen lock", "Tape library", "API gateway", "Unmanaged hub"],
    answer: 2,
    explanation:
      "An API gateway can centralize authentication, traffic controls, logging, and request routing for services.",
  },
  {
    question:
      "Which platform centralizes logs from many systems and correlates events for security analysis?",
    options: ["RAID", "UPS", "KVM", "SIEM"],
    answer: 3,
    explanation:
      "A SIEM aggregates and analyzes security event data from multiple sources.",
  },
  {
    question:
      "Which technology automates security workflows such as enriching alerts and disabling compromised accounts?",
    options: ["NAT", "RAID", "SOAR", "DNSSEC"],
    answer: 2,
    explanation:
      "SOAR platforms orchestrate and automate repeatable security response workflows.",
  },
  {
    question:
      "Which endpoint technology is designed to detect suspicious behavior and support investigation and response?",
    options: ["NTP", "SAN", "DHCP", "EDR"],
    answer: 3,
    explanation:
      "Endpoint detection and response monitors endpoint activity and provides investigation and containment capabilities.",
  },
  {
    question:
      "Which control can inspect malicious network traffic and automatically block it inline?",
    options: [
      "Packet capture file",
      "NIPS",
      "Passive network tap",
      "Syslog collector",
    ],
    answer: 1,
    explanation:
      "A network intrusion prevention system sits inline and can block detected threats.",
  },
  {
    question:
      "Which security control is specifically designed to inspect HTTP requests for attacks against web applications?",
    options: ["Wireless access point", "Layer 2 switch", "Tape drive", "WAF"],
    answer: 3,
    explanation:
      "A web application firewall filters HTTP and HTTPS traffic for application-layer attacks.",
  },
  {
    question:
      "Which control can prevent users from resolving domain names known to host malware?",
    options: [
      "Load testing",
      "Port mirroring",
      "DNS filtering",
      "Disk defragmentation",
    ],
    answer: 2,
    explanation:
      "DNS filtering blocks or redirects requests for known malicious or prohibited domains.",
  },
  {
    question:
      "Which email security record identifies the mail servers authorized to send messages for a domain?",
    options: ["PTR", "SPF", "SOA", "CAA"],
    answer: 1,
    explanation:
      "SPF publishes which mail servers are authorized to send email for a domain.",
  },
  {
    question:
      "Which email security mechanism uses a cryptographic signature to help verify that a message was authorized by the sending domain?",
    options: ["DKIM", "SFTP", "ARP", "RADIUS"],
    answer: 0,
    explanation:
      "DKIM signs selected email content so receiving servers can verify the domain's signature.",
  },
  {
    question:
      "Which email security policy tells receiving servers how to handle messages that fail SPF or DKIM alignment checks?",
    options: ["SNMP", "DHCP", "NAT", "DMARC"],
    answer: 3,
    explanation:
      "DMARC defines policy and reporting for messages that fail aligned SPF or DKIM validation.",
  },
  {
    question:
      "Which activity uses automated tools to identify known weaknesses without attempting full exploitation?",
    options: [
      "Penetration testing",
      "Vulnerability scanning",
      "Social engineering",
      "Threat hunting",
    ],
    answer: 1,
    explanation:
      "Vulnerability scanning identifies potential known weaknesses, generally without proving exploitation.",
  },
  {
    question:
      "Which assessment is intended to actively exploit weaknesses to demonstrate their real-world impact under an agreed scope?",
    options: [
      "Asset inventory",
      "Tabletop exercise",
      "Penetration test",
      "Log rotation",
    ],
    answer: 2,
    explanation:
      "A penetration test attempts controlled exploitation to validate vulnerabilities and demonstrate impact.",
  },
  {
    question: "What does a higher CVSS base score generally indicate?",
    options: [
      "A fully patched system",
      "A lower likelihood of any impact",
      "A longer password",
      "A more severe vulnerability",
    ],
    answer: 3,
    explanation:
      "CVSS scores communicate technical vulnerability severity; higher scores generally indicate greater severity.",
  },
  {
    question:
      "A security tool alerts on malicious activity, but investigation confirms the activity was legitimate. What is this result?",
    options: [
      "False positive",
      "True negative",
      "False negative",
      "True positive",
    ],
    answer: 0,
    explanation:
      "A false positive occurs when a control incorrectly identifies benign activity as malicious.",
  },
  {
    question:
      "After deploying a security patch, what should the administrator do to confirm the risk was addressed?",
    options: [
      "Restore the vulnerable version",
      "Perform validation or a targeted rescan",
      "Delete all system logs",
      "Disable monitoring",
    ],
    answer: 1,
    explanation:
      "Validation confirms the patch installed correctly and the vulnerability is no longer detected or exploitable.",
  },
  {
    question:
      "During which incident response phase are plans, tools, contacts, and training established before an incident?",
    options: ["Containment", "Recovery", "Preparation", "Eradication"],
    answer: 2,
    explanation:
      "Preparation establishes the people, processes, and technology needed to respond effectively.",
  },
  {
    question:
      "An analyst verifies an alert, determines affected systems, and establishes the incident's scope. Which phase is this?",
    options: [
      "Recovery",
      "Procurement",
      "Lessons learned",
      "Detection and analysis",
    ],
    answer: 3,
    explanation:
      "Detection and analysis confirms the incident and determines its nature, scope, and impact.",
  },
  {
    question:
      "Disconnecting an infected workstation from the network is an example of which incident response activity?",
    options: ["Containment", "Risk acceptance", "Recovery", "Preparation"],
    answer: 0,
    explanation:
      "Containment limits the spread and impact of an active incident.",
  },
  {
    question:
      "Removing malware and deleting an attacker's persistence mechanism are part of which phase?",
    options: ["Preparation", "Eradication", "Risk transfer", "Identification"],
    answer: 1,
    explanation:
      "Eradication removes malicious artifacts, persistence, and the underlying cause where possible.",
  },
  {
    question:
      "Restoring clean systems to production and closely monitoring them occurs during which phase?",
    options: ["Data classification", "Containment", "Recovery", "Preparation"],
    answer: 2,
    explanation:
      "Recovery returns systems to normal operation and verifies that they remain stable and secure.",
  },
  {
    question:
      "What is the main purpose of an incident lessons-learned meeting?",
    options: [
      "To assign permanent administrator access",
      "To destroy all evidence",
      "To conceal the incident",
      "To improve future prevention and response",
    ],
    answer: 3,
    explanation:
      "Lessons learned identify what worked, what failed, and what should be improved.",
  },
  {
    question:
      "Which document records who collected, transferred, stored, and examined evidence?",
    options: [
      "Chain of custody",
      "Risk appetite statement",
      "Service-level agreement",
      "Acceptable use policy",
    ],
    answer: 0,
    explanation:
      "Chain-of-custody documentation tracks evidence handling from collection through final disposition.",
  },
  {
    question:
      "Why should an examiner calculate and record hashes of a forensic image?",
    options: [
      "To compress the image",
      "To demonstrate that the image has not changed",
      "To assign file permissions",
      "To make the image executable",
    ],
    answer: 1,
    explanation:
      "Matching cryptographic hashes help prove the forensic image remained unchanged.",
  },
  {
    question:
      "Which evidence should normally be collected first because it is highly volatile?",
    options: [
      "Powered-off optical disc",
      "Printed policy manual",
      "Contents of RAM",
      "Archived tape backup",
    ],
    answer: 2,
    explanation:
      "RAM contents can be lost when power is removed and should be collected early when appropriate.",
  },
  {
    question:
      "Why should security devices use a common trusted time source such as NTP?",
    options: [
      "To replace encryption",
      "To increase disk capacity",
      "To eliminate account passwords",
      "To correlate events accurately across logs",
    ],
    answer: 3,
    explanation:
      "Synchronized timestamps make it possible to reconstruct and correlate events across systems.",
  },
  {
    question:
      "Which backup characteristic best protects recovery data from ransomware modification or deletion?",
    options: [
      "Immutability",
      "Permanent administrator mapping",
      "Single-copy storage",
      "Public write access",
    ],
    answer: 0,
    explanation:
      "Immutable backups cannot be altered or deleted during the defined retention period.",
  },
  {
    question:
      "Which document provides high-level management intent and direction for security?",
    options: ["Procedure", "Policy", "Configuration file", "Packet capture"],
    answer: 1,
    explanation:
      "A policy expresses management's high-level expectations and requirements.",
  },
  {
    question:
      "Which document establishes a mandatory requirement such as an approved encryption algorithm or minimum password length?",
    options: ["Network diagram", "Press release", "Standard", "Guideline"],
    answer: 2,
    explanation:
      "A standard defines mandatory, specific requirements that support a policy.",
  },
  {
    question:
      "Which document gives step-by-step instructions for completing a security task?",
    options: ["Data label", "Risk appetite", "Policy", "Procedure"],
    answer: 3,
    explanation:
      "A procedure provides detailed steps for performing an activity consistently.",
  },
  {
    question:
      "Which document normally provides recommended but nonmandatory security practices?",
    options: ["Guideline", "Contract", "Law", "Standard"],
    answer: 0,
    explanation:
      "Guidelines offer recommended approaches and flexibility rather than mandatory requirements.",
  },
  {
    question:
      "Where should identified risks, owners, likelihood, impact, and treatment decisions be tracked?",
    options: [
      "ARP table",
      "Risk register",
      "Password vault export",
      "Routing table",
    ],
    answer: 1,
    explanation:
      "A risk register records and tracks organizational risks and their treatment status.",
  },
  {
    question:
      "A risk assessment ranks risks as low, medium, or high. What type of analysis is this?",
    options: ["Forensic", "Cryptographic", "Qualitative", "Quantitative"],
    answer: 2,
    explanation:
      "Qualitative analysis uses descriptive or ordinal ratings rather than direct monetary values.",
  },
  {
    question: "Which formula calculates annual loss expectancy?",
    options: [
      "RPO divided by ARO",
      "Exposure factor plus RTO",
      "Asset value multiplied by RTO",
      "SLE multiplied by ARO",
    ],
    answer: 3,
    explanation:
      "Annual loss expectancy equals single loss expectancy multiplied by annualized rate of occurrence.",
  },
  {
    question: "Which formula calculates single loss expectancy?",
    options: [
      "Asset value multiplied by exposure factor",
      "Exposure factor multiplied by ALE",
      "ARO multiplied by RTO",
      "Asset value divided by RPO",
    ],
    answer: 0,
    explanation:
      "Single loss expectancy equals the asset value multiplied by the percentage expected to be lost in one event.",
  },
  {
    question:
      "Management documents a risk and chooses to take no additional action because it is within tolerance. Which response is this?",
    options: ["Avoidance", "Acceptance", "Mitigation", "Transfer"],
    answer: 1,
    explanation:
      "Risk acceptance means knowingly retaining the risk within the organization's tolerance.",
  },
  {
    question:
      "Purchasing cyber insurance is primarily an example of which risk response?",
    options: ["Exploitation", "Acceptance", "Transfer", "Avoidance"],
    answer: 2,
    explanation:
      "Insurance transfers some financial consequences of a risk to another party.",
  },
  {
    question:
      "An organization stops offering a vulnerable service because the associated risk is unacceptable. Which response is this?",
    options: ["Transfer", "Sharing", "Acceptance", "Avoidance"],
    answer: 3,
    explanation:
      "Risk avoidance removes the activity or condition that creates the risk.",
  },
  {
    question:
      "What should an organization perform before allowing a new vendor to process sensitive customer data?",
    options: [
      "Third-party due diligence",
      "Delete the vendor's security questionnaire",
      "Provide unrestricted production access",
      "Disable contractual requirements",
    ],
    answer: 0,
    explanation:
      "Due diligence evaluates the vendor's controls, risks, compliance, history, and ability to meet requirements.",
  },
  {
    question:
      "Which agreement defines measurable service expectations such as uptime and response time?",
    options: ["NDA", "SLA", "BIA", "AUP"],
    answer: 1,
    explanation:
      "A service-level agreement defines measurable service commitments and remedies.",
  },
  {
    question:
      "Two organizations document their intent to cooperate on a shared security initiative without creating a detailed service contract. Which document is most appropriate?",
    options: ["Certificate signing request", "Chain of custody", "MOU", "SLA"],
    answer: 2,
    explanation:
      "A memorandum of understanding documents a shared intent or framework for cooperation.",
  },
  {
    question:
      "Which process identifies critical business functions and evaluates the operational impact of their disruption?",
    options: [
      "Code signing",
      "Password spraying",
      "Packet analysis",
      "Business impact analysis",
    ],
    answer: 3,
    explanation:
      "A business impact analysis identifies critical functions, dependencies, and the effects of outages.",
  },
  {
    question:
      "Who is normally responsible for determining a dataset's classification and authorized uses?",
    options: [
      "Data owner",
      "Internet service provider",
      "End user",
      "Data custodian",
    ],
    answer: 0,
    explanation:
      "The data owner makes decisions about classification, access, handling, and acceptable use.",
  },
  {
    question:
      "Who typically implements backups, permissions, and storage controls according to the data owner's requirements?",
    options: [
      "Data subject",
      "Data custodian",
      "Certificate applicant",
      "External attacker",
    ],
    answer: 1,
    explanation:
      "The data custodian implements and operates controls based on the data owner's direction.",
  },
  {
    question:
      "Which privacy principle recommends collecting only the personal information required for a defined purpose?",
    options: [
      "Open access",
      "Password reuse",
      "Data minimization",
      "Privilege escalation",
    ],
    answer: 2,
    explanation:
      "Data minimization limits collection and retention to information necessary for the stated purpose.",
  },
  {
    domain: "1.0 General Security Concepts",
    question:
      "Which authentication factor is represented by a fingerprint scan?",
    options: [
      "Something you have",
      "Somewhere you are",
      "Something you know",
      "Something you are",
    ],
    answer: 3,
    explanation:
      "A fingerprint is a biometric characteristic and is categorized as something you are.",
  },
  {
    domain: "1.0 General Security Concepts",
    question:
      "A sender signs a message digest using the sender's private key. Which key should the recipient use to verify the signature?",
    options: [
      "The recipient's private key",
      "The sender's symmetric key",
      "The sender's public key",
      "The recipient's public key",
    ],
    answer: 2,
    explanation:
      "A digital signature created with the sender's private key is verified using the corresponding sender's public key.",
  },
  {
    domain: "1.0 General Security Concepts",
    question: "What is the primary purpose of password key stretching?",
    options: [
      "To shorten passwords before storage",
      "To make password guessing more computationally expensive",
      "To allow passwords to be decrypted by administrators",
      "To eliminate the need for salts",
    ],
    answer: 1,
    explanation:
      "Key-stretching algorithms repeatedly process a password to increase the computational cost of each guessing attempt.",
  },
  {
    domain: "1.0 General Security Concepts",
    question:
      "Two systems need to establish a shared secret across an untrusted network without previously sharing a password. Which method is most appropriate?",
    options: [
      "Password spraying",
      "Data masking",
      "CRC32",
      "Diffie-Hellman key exchange",
    ],
    answer: 3,
    explanation:
      "Diffie-Hellman allows two parties to establish a shared secret over an untrusted channel.",
  },
  {
    domain: "1.0 General Security Concepts",
    question:
      "A security analyst reviews authentication logs each morning to identify suspicious login attempts. What functional type of control is this?",
    options: ["Preventive", "Directive", "Detective", "Corrective"],
    answer: 2,
    explanation:
      "Log review is a detective control because it identifies events that have already occurred or are currently occurring.",
  },
  {
    domain: "1.0 General Security Concepts",
    question:
      "A legacy application cannot support multifactor authentication. The organization restricts access to a managed VPN and increases account monitoring. What type of controls are these?",
    options: [
      "Compensating controls",
      "Deterrent controls",
      "Recovery controls",
      "Physical controls",
    ],
    answer: 0,
    explanation:
      "Compensating controls provide alternative protection when the preferred control cannot be implemented.",
  },
  {
    domain: "1.0 General Security Concepts",
    question:
      "A database administrator is granted access only to the tables required for current job duties. Which security principle is being applied?",
    options: [
      "Open access",
      "Job enlargement",
      "Least privilege",
      "Implicit trust",
    ],
    answer: 2,
    explanation:
      "Least privilege limits users and processes to only the permissions required to perform assigned duties.",
  },
  {
    domain: "1.0 General Security Concepts",
    question:
      "Before approving a firewall change, the security team evaluates which applications and users could be affected. What change-management activity is this?",
    options: [
      "Impact analysis",
      "Evidence preservation",
      "Data minimization",
      "Cryptographic validation",
    ],
    answer: 0,
    explanation:
      "Impact analysis identifies the systems, services, users, and risks that may be affected by a proposed change.",
  },
  {
    domain: "1.0 General Security Concepts",
    question:
      "An infected workstation is erased and restored from a known-good image. What functional type of control does this represent?",
    options: ["Deterrent", "Detective", "Corrective", "Directive"],
    answer: 2,
    explanation:
      "Reimaging the workstation corrects the effects of the compromise and returns the system to a trusted state.",
  },
  {
    domain: "1.0 General Security Concepts",
    question: "What is the primary security purpose of Secure Boot?",
    options: [
      "To encrypt every file on the operating system",
      "To hide the system's IP address",
      "To verify that trusted, signed components are used during startup",
      "To prevent users from changing their passwords",
    ],
    answer: 2,
    explanation:
      "Secure Boot validates digital signatures on boot components to prevent unauthorized code from loading during startup.",
  },
  {
    domain: "1.0 General Security Concepts",
    question:
      "A payment processor replaces stored credit card numbers with random values that have no mathematical relationship to the original numbers. What technique is being used?",
    options: ["Hash collision", "Steganography", "Key escrow", "Tokenization"],
    answer: 3,
    explanation:
      "Tokenization replaces sensitive values with non-sensitive surrogate tokens while the original data is stored separately.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "A group defaces a government website to promote a political or social cause. Which threat actor best fits this activity?",
    options: [
      "Hacktivist",
      "Unskilled insider",
      "Competitor",
      "Organized crime group",
    ],
    answer: 0,
    explanation:
      "Hacktivists commonly conduct cyberattacks to advance political, ideological, or social objectives.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "Employees begin storing company documents in an unapproved cloud-sharing service without informing the IT department. What does this represent?",
    options: [
      "Secure federation",
      "Data sovereignty",
      "Shadow IT",
      "Key escrow",
    ],
    answer: 2,
    explanation:
      "Shadow IT consists of technology, services, or applications used without organizational approval or oversight.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "An attacker creates a wireless network using the same name as a nearby hotel network and attempts to capture guest traffic. What type of attack is this?",
    options: ["NFC relay", "Evil twin", "Bluejacking", "RFID cloning"],
    answer: 1,
    explanation:
      "An evil-twin attack uses a malicious wireless access point that imitates a legitimate network.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "An attacker causes a web server to send requests to an internal management service that is not directly reachable from the internet. Which vulnerability is being exploited?",
    options: [
      "Cross-site request forgery",
      "Cross-site scripting",
      "Server-side request forgery",
      "Session fixation",
    ],
    answer: 2,
    explanation:
      "Server-side request forgery tricks a server into making requests to internal or otherwise restricted resources.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "A web application passes unsanitized user input directly into an operating-system shell command. Which attack is most likely?",
    options: [
      "ARP spoofing",
      "Birthday attack",
      "Downgrade attack",
      "Command injection",
    ],
    answer: 3,
    explanation:
      "Command injection occurs when attacker-controlled input is interpreted as an operating-system command.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "A user opens an emailed spreadsheet and enables embedded content. Soon afterward, an unfamiliar process establishes an outbound connection. What is the most likely initial attack vector?",
    options: [
      "DNSSEC validation",
      "Certificate pinning",
      "Full-disk encryption",
      "Malicious macro",
    ],
    answer: 3,
    explanation:
      "Office-document macros can execute malicious code when a user enables active content.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "A cloud administrator notices unusually high processor utilization and a sudden increase in compute charges, but normal application traffic has not increased. What is the most likely cause?",
    options: [
      "Cryptojacking",
      "Data masking",
      "Certificate renewal",
      "Token expiration",
    ],
    answer: 0,
    explanation:
      "Cryptojacking secretly consumes computing resources to mine cryptocurrency, often causing high utilization and increased cloud costs.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "An attacker sends an email that appears to come from the chief executive officer and instructs an employee to urgently transfer funds. Which attack is this?",
    options: [
      "Password spraying",
      "Business email compromise",
      "DNS tunneling",
      "Session hijacking",
    ],
    answer: 1,
    explanation:
      "Business email compromise uses impersonation or a compromised business account to trick employees into transferring money or sensitive information.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "An attacker leaves infected USB drives in a company parking lot, hoping employees will connect them to workstations. Which social engineering technique is being used?",
    options: ["Quid pro quo", "Tailgating", "Baiting", "Pretexting"],
    answer: 2,
    explanation:
      "Baiting offers something enticing, such as a seemingly useful USB drive, to persuade a victim to perform an unsafe action.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "An unauthorized person follows an employee through a secured door before it closes. What type of attack is this?",
    options: [
      "Tailgating",
      "Typosquatting",
      "Shoulder surfing",
      "Dumpster diving",
    ],
    answer: 0,
    explanation:
      "Tailgating occurs when an unauthorized individual follows an authorized person into a restricted area.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "A malicious user changes the URL from '/invoice/1250' to '/invoice/1251' and views another customer's invoice. Which vulnerability is present?",
    options: [
      "XML injection",
      "Buffer overflow",
      "Insecure direct object reference",
      "Race condition",
    ],
    answer: 2,
    explanation:
      "An insecure direct object reference allows users to access objects by changing an identifier without proper authorization checks.",
  },
  // questions 113-158
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "An application automatically creates a new user account using values from an untrusted XML file. Which attack should the developer be most concerned about?",
    options: [
      "Pass-the-hash",
      "ARP poisoning",
      "XML injection",
      "Wi-Fi deauthentication",
    ],
    answer: 2,
    explanation:
      "XML injection manipulates XML input so the application processes unintended structures, values, or commands.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "A web application accepts serialized objects from users and reconstructs them without validation. What vulnerability may allow arbitrary code execution?",
    options: [
      "Certificate pinning",
      "Insecure deserialization",
      "Directory indexing",
      "Password spraying",
    ],
    answer: 1,
    explanation:
      "Insecure deserialization can allow malicious object data to trigger unintended behavior or code execution when reconstructed.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "An attacker uses '../' sequences in a web request to access files outside the intended application directory. Which attack is this?",
    options: [
      "Resource exhaustion",
      "Directory traversal",
      "Cross-site request forgery",
      "Credential stuffing",
    ],
    answer: 1,
    explanation:
      "Directory traversal uses path manipulation sequences to access files outside an application's authorized directory.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "A vulnerable web application allows an attacker to force a logged-in user's browser to submit an unwanted password-change request. What attack is this?",
    options: [
      "Server-side request forgery",
      "SQL injection",
      "Cross-site scripting",
      "Cross-site request forgery",
    ],
    answer: 3,
    explanation:
      "Cross-site request forgery causes an authenticated user's browser to perform an unwanted action without the user's informed consent.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "A mobile application stores API credentials directly inside its publicly downloadable installation package. What is the primary weakness?",
    options: [
      "Hard-coded credentials",
      "Certificate expiration",
      "Insufficient bandwidth",
      "Log rotation failure",
    ],
    answer: 0,
    explanation:
      "Hard-coded credentials can often be extracted through reverse engineering and reused by an attacker.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "A security researcher discovers that a device's firmware accepts updates without validating a digital signature. What is the greatest risk?",
    options: [
      "The device will be unable to obtain an IP address",
      "An attacker could install malicious firmware",
      "The device will use too much memory",
      "The system clock will lose synchronization",
    ],
    answer: 1,
    explanation:
      "Without signature validation, attackers may replace legitimate firmware with modified or malicious firmware.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "An attacker submits an extremely large number of requests to consume all available application threads. What type of attack is this?",
    options: [
      "Data remanence",
      "Privilege escalation",
      "Resource exhaustion",
      "Hash collision",
    ],
    answer: 2,
    explanation:
      "Resource-exhaustion attacks consume limited resources such as memory, processor time, connections, or threads to deny service.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "Which mitigation best reduces the impact of a distributed denial-of-service attack against a public website?",
    options: [
      "Disable centralized logging",
      "Store passwords using reversible encryption",
      "Place all servers on one internal subnet",
      "Use traffic scrubbing and content delivery services",
    ],
    answer: 3,
    explanation:
      "Traffic-scrubbing providers and distributed delivery services can absorb, filter, and redirect malicious traffic before it reaches the origin service.",
  },
  {
    domain: "2.0 Threats, Vulnerabilities, and Mitigations",
    question:
      "A system administrator receives an alert that a service account logged in interactively from an employee workstation. Why is this suspicious?",
    options: [
      "Service accounts normally should not perform interactive logins",
      "Interactive logins automatically encrypt credentials",
      "Service accounts should always be domain administrators",
      "Employee workstations cannot generate authentication logs",
    ],
    answer: 0,
    explanation:
      "Service accounts are generally intended for applications or automated processes, so interactive use may indicate credential misuse.",
  },
  {
    domain: "3.0 Security Architecture",
    question:
      "An organization wants remote users to access internal applications without exposing the applications directly to the internet. Which solution best fits a zero-trust approach?",
    options: [
      "Unrestricted port forwarding",
      "Shared VPN credentials",
      "Identity-aware application proxy",
      "Public administrator interface",
    ],
    answer: 2,
    explanation:
      "An identity-aware proxy evaluates identity and context before granting access to specific applications without broadly exposing the internal network.",
  },
  {
    domain: "3.0 Security Architecture",
    question:
      "Which network design places devices with similar security requirements into separate logical broadcast domains?",
    options: [
      "VLAN segmentation",
      "Link aggregation",
      "Port mirroring",
      "Packet fragmentation",
    ],
    answer: 0,
    explanation:
      "VLANs logically separate groups of devices and can support security policies between network segments.",
  },
  {
    domain: "3.0 Security Architecture",
    question:
      "A company wants administrators to manage critical servers only through a hardened intermediary system. What should the company deploy?",
    options: [
      "Jump server",
      "Caching proxy",
      "Load balancer",
      "Wireless repeater",
    ],
    answer: 0,
    explanation:
      "A jump server provides a controlled, monitored access point for administrators connecting to sensitive systems.",
  },
  {
    domain: "3.0 Security Architecture",
    question:
      "Which architecture allows a security device to receive a copy of network traffic without being placed directly in the traffic path?",
    options: [
      "Network address translation",
      "Out-of-band monitoring",
      "Full-tunnel routing",
      "Inline inspection",
    ],
    answer: 1,
    explanation:
      "Out-of-band monitoring analyzes mirrored or tapped traffic without directly forwarding production traffic.",
  },
  {
    domain: "3.0 Security Architecture",
    question:
      "A company needs a one-way connection that allows operational data to leave an industrial network but prevents inbound traffic. Which device is most appropriate?",
    options: [
      "Wireless controller",
      "Data diode",
      "Forward proxy",
      "Layer 2 hub",
    ],
    answer: 1,
    explanation:
      "A data diode enforces one-way communication, allowing data to flow in only one direction.",
  },
  {
    domain: "3.0 Security Architecture",
    question:
      "Which architecture places a small security control close to each workload instead of relying only on a perimeter firewall?",
    options: [
      "Flat networking",
      "Split DNS",
      "Port aggregation",
      "Microsegmentation",
    ],
    answer: 3,
    explanation:
      "Microsegmentation applies granular controls between individual workloads, reducing lateral movement inside the environment.",
  },
  {
    domain: "3.0 Security Architecture",
    question:
      "A company needs to protect cryptographic keys used by a cloud application while keeping the keys separate from the application code. Which solution is best?",
    options: [
      "Email the keys to administrators",
      "Store the keys in source control",
      "Use a centralized secrets-management service",
      "Place the keys in application comments",
    ],
    answer: 2,
    explanation:
      "A secrets-management service securely stores, controls access to, rotates, and audits sensitive credentials and cryptographic keys.",
  },
  {
    domain: "3.0 Security Architecture",
    question:
      "Which security benefit is provided by running an application inside a container with only the required libraries and permissions?",
    options: [
      "Permanent administrative access",
      "Elimination of all vulnerabilities",
      "Unlimited network trust",
      "A reduced attack surface",
    ],
    answer: 3,
    explanation:
      "Minimal containers reduce unnecessary software, services, and privileges, which lowers the available attack surface.",
  },
  {
    domain: "3.0 Security Architecture",
    question:
      "A company wants to prevent one compromised virtual machine from directly accessing another virtual machine on the same host. Which control is most appropriate?",
    options: [
      "Split tunneling",
      "Public DNS registration",
      "East-west traffic filtering",
      "Unrestricted virtual switching",
    ],
    answer: 2,
    explanation:
      "Filtering east-west traffic controls communication between internal workloads and reduces lateral movement.",
  },
  {
    domain: "3.0 Security Architecture",
    question:
      "Which design principle recommends disabling unnecessary services and removing unused software before deployment?",
    options: [
      "Resource pooling",
      "System hardening",
      "Open federation",
      "Implicit trust",
    ],
    answer: 1,
    explanation:
      "System hardening reduces the attack surface by removing or disabling unnecessary components and applying secure configurations.",
  },
  {
    domain: "3.0 Security Architecture",
    question:
      "An organization wants an application to continue operating if one geographic cloud region becomes unavailable. Which design should it use?",
    options: [
      "One local administrator account",
      "Multi-region redundancy",
      "A shared storage password",
      "A single availability zone",
    ],
    answer: 1,
    explanation:
      "Multi-region redundancy places resources in separate geographic regions so another region can continue service during a regional outage.",
  },
  {
    domain: "3.0 Security Architecture",
    question:
      "Which backup strategy keeps one copy off-site and one copy on a different type of storage media?",
    options: [
      "Least functionality",
      "Full-tunnel routing",
      "The 3-2-1 backup strategy",
      "Round-robin DNS",
    ],
    answer: 2,
    explanation:
      "The 3-2-1 strategy keeps three copies of data, on two media types, with one copy stored off-site.",
  },
  {
    domain: "3.0 Security Architecture",
    question:
      "A critical application requires nearly uninterrupted service and no single server should be able to cause an outage. Which design best meets this requirement?",
    options: [
      "High-availability clustering",
      "Manual weekly backups only",
      "A standalone server",
      "A cold site with no equipment",
    ],
    answer: 0,
    explanation:
      "High-availability clustering uses multiple coordinated systems so another node can continue service if one fails.",
  },
  {
    domain: "3.0 Security Architecture",
    question:
      "Which technology allows an organization to apply security policies based on a user's identity rather than only the device's IP address?",
    options: [
      "Static port forwarding",
      "Unmanaged wireless bridging",
      "Network hub replication",
      "Identity-aware access control",
    ],
    answer: 3,
    explanation:
      "Identity-aware access control evaluates the authenticated user and other contextual information instead of relying only on network location.",
  },
  {
    domain: "3.0 Security Architecture",
    question:
      "A company encrypts a database but stores the encryption key on the same server in an unprotected text file. What is the primary architectural weakness?",
    options: [
      "Excessive network redundancy",
      "Poor key separation",
      "Insufficient data classification",
      "Too many availability zones",
    ],
    answer: 1,
    explanation:
      "Storing the key beside the encrypted data weakens protection because compromise of the server can expose both the data and its key.",
  },
  {
    domain: "3.0 Security Architecture",
    question:
      "Which security model requires every access request to be evaluated continuously using identity, device health, and context?",
    options: [
      "Zero trust",
      "Single-factor federation",
      "Open guest access",
      "Implicit perimeter trust",
    ],
    answer: 0,
    explanation:
      "Zero trust continuously evaluates access using identity, device posture, location, behavior, and policy rather than granting broad implicit trust.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "Which technology can automatically isolate an endpoint after detecting ransomware-like behavior?",
    options: ["EDR", "RAID", "NTP", "DHCP"],
    answer: 0,
    explanation:
      "Endpoint detection and response platforms can detect suspicious behavior and isolate affected devices from the network.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "A security analyst wants to search for evidence of compromise based on unusual behavior that has not triggered an alert. Which activity is most appropriate?",
    options: [
      "Asset depreciation",
      "Threat hunting",
      "Data normalization",
      "Password synchronization",
    ],
    answer: 1,
    explanation:
      "Threat hunting proactively searches systems and data for hidden threats that automated controls may not have detected.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "Which source would best help an analyst identify a process that created an unexpected outbound network connection?",
    options: [
      "Endpoint process and network telemetry",
      "A printed organizational chart",
      "A building evacuation map",
      "A software purchase receipt",
    ],
    answer: 0,
    explanation:
      "Endpoint telemetry can correlate running processes, parent-child relationships, users, and outbound network connections.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "An analyst needs to identify repeated failed logins followed by a successful login from the same address. Which tool is best suited to correlate these events?",
    options: ["UPS", "SIEM", "Load balancer", "Wireless repeater"],
    answer: 1,
    explanation:
      "A SIEM can aggregate authentication logs and correlate sequences of related events across systems.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "Which action should be performed before running a vulnerability scan against a production environment?",
    options: [
      "Share administrator passwords with the scanner vendor",
      "Delete the asset inventory",
      "Disable all backups",
      "Confirm authorization, scope, and scheduling",
    ],
    answer: 3,
    explanation:
      "Scanning should be authorized, scoped, and scheduled to reduce operational risk and ensure the activity is permitted.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "A vulnerability scanner reports that a server may be missing a patch, but the administrator confirms the patch is installed. What should happen next?",
    options: [
      "Disable the vulnerability scanner permanently",
      "Ignore all future scan results",
      "Validate the finding and investigate why it was detected",
      "Immediately erase the server",
    ],
    answer: 2,
    explanation:
      "The team should validate the result because it may be a false positive, incomplete installation, failed reboot, or alternate vulnerable component.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "Which practice helps ensure that administrator accounts are not used for ordinary email and web browsing?",
    options: [
      "Use separate privileged and standard accounts",
      "Disable account logging",
      "Assign every user domain administrator rights",
      "Use one shared administrator account",
    ],
    answer: 0,
    explanation:
      "Separate accounts reduce the exposure of privileged credentials during routine, higher-risk activities such as browsing and email.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "Which protocol should an administrator use instead of Telnet to securely manage a network device from the command line?",
    options: ["SNMPv1", "TFTP", "FTP", "SSH"],
    answer: 3,
    explanation:
      "SSH encrypts remote command-line management traffic, including authentication credentials and administrative commands.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "Which protocol should replace FTP when files must be securely transferred through an encrypted SSH connection?",
    options: ["TFTP", "SFTP", "HTTP", "RDP"],
    answer: 1,
    explanation:
      "SFTP transfers files through an encrypted SSH session and protects both authentication information and file contents.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "An organization wants to prevent unmanaged laptops from connecting to the corporate network. Which control is most appropriate?",
    options: [
      "Network access control",
      "Load balancing",
      "Port mirroring",
      "Network address translation",
    ],
    answer: 0,
    explanation:
      "Network access control can verify device identity, health, configuration, and compliance before granting network access.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "A network access control system detects a device that lacks current antivirus signatures. What action best limits the risk while allowing remediation?",
    options: [
      "Place the device in a quarantine network",
      "Disable all network monitoring",
      "Give the device unrestricted internal access",
      "Assign the device a public administrator account",
    ],
    answer: 0,
    explanation:
      "A quarantine network isolates a noncompliant device while still allowing access to approved remediation services.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "Which mobile-device control can remove organizational data while leaving a user's personal information intact?",
    options: [
      "Full factory reset",
      "Screen capture",
      "Remote shutdown",
      "Selective wipe",
    ],
    answer: 3,
    explanation:
      "A selective wipe removes managed corporate applications and data without erasing unrelated personal content.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "A company wants to enforce device encryption, screen-lock settings, and approved applications on employee smartphones. Which solution is most appropriate?",
    options: [
      "Database replication",
      "Email journaling",
      "Network load balancing",
      "Mobile device management",
    ],
    answer: 3,
    explanation:
      "Mobile device management centrally enforces security settings, application policies, encryption, and remote-management controls.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "Which control prevents sensitive files from being copied to unauthorized USB storage devices?",
    options: [
      "Load balancing",
      "Data loss prevention",
      "Port forwarding",
      "Network time synchronization",
    ],
    answer: 1,
    explanation:
      "Data loss prevention can inspect and block transfers of sensitive information to unauthorized removable media.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "An administrator wants to allow approved USB keyboards while blocking USB storage devices. Which control best supports this requirement?",
    options: [
      "Device control based on hardware class",
      "Email authentication",
      "DNS filtering",
      "Full-disk encryption",
    ],
    answer: 0,
    explanation:
      "Endpoint device controls can permit or deny hardware based on device type, class, identifier, or organizational policy.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "Which account-management practice reduces the risk from former employees retaining access after departure?",
    options: [
      "Keep accounts active for one year",
      "Remove account logging before termination",
      "Convert accounts into shared administrator accounts",
      "Immediately disable accounts during offboarding",
    ],
    answer: 3,
    explanation:
      "Prompt account deactivation during offboarding prevents former personnel from continuing to access organizational resources.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "A privileged account is used only once every several months. Which practice best reduces the risk associated with the account?",
    options: [
      "Use just-in-time access",
      "Share the password among the entire IT staff",
      "Disable audit logging for the account",
      "Leave the account permanently enabled",
    ],
    answer: 0,
    explanation:
      "Just-in-time access grants elevated permissions only when needed and removes them after the approved period.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "Which solution stores administrator credentials, rotates passwords, and records privileged sessions?",
    options: [
      "Certificate transparency",
      "Content delivery network",
      "Network address translation",
      "Privileged access management",
    ],
    answer: 3,
    explanation:
      "Privileged access management protects elevated credentials, controls their use, and provides auditing of privileged activity.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "An organization wants application service accounts to receive new passwords automatically without administrators manually updating each application. Which capability is most helpful?",
    options: [
      "Anonymous authentication",
      "Static password reuse",
      "Shared root access",
      "Automated credential rotation",
    ],
    answer: 3,
    explanation:
      "Automated credential rotation changes service-account secrets and securely updates dependent systems without relying on manual handling.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "Which log source would best show whether a user successfully authenticated to a Windows domain?",
    options: [
      "Web page source code",
      "Printer supply logs",
      "Domain controller security logs",
      "Environmental sensor logs",
    ],
    answer: 2,
    explanation:
      "Domain controller security logs record authentication events, account activity, and related identity information.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "An analyst sees thousands of DNS queries containing long, encoded subdomain strings sent to one external domain. What activity should the analyst suspect?",
    options: [
      "Network time synchronization",
      "Certificate renewal",
      "Load balancing",
      "DNS tunneling",
    ],
    answer: 3,
    explanation:
      "DNS tunneling can encode command-and-control traffic or stolen data inside DNS queries and responses.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "A workstation repeatedly connects to an external address every five minutes with nearly identical packet sizes. What behavior does this most strongly suggest?",
    options: [
      "Normal software installation",
      "Printer discovery",
      "Command-and-control beaconing",
      "Disk defragmentation",
    ],
    answer: 2,
    explanation:
      "Regularly timed outbound connections with similar characteristics commonly indicate automated command-and-control beaconing.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "Which containment action is most appropriate when an employee account is confirmed to be compromised?",
    options: [
      "Increase the account's privileges",
      "Delete all authentication logs",
      "Send the password to the security team by email",
      "Disable the account and revoke active sessions",
    ],
    answer: 3,
    explanation:
      "Disabling the account and revoking active sessions prevents continued use of stolen credentials while investigation proceeds.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "A compromised cloud access token remains valid after the user's password is changed. What should the response team do next?",
    options: [
      "Create additional permanent tokens",
      "Revoke active tokens and sessions",
      "Restore the previous password",
      "Disable cloud audit logging",
    ],
    answer: 1,
    explanation:
      "Changing a password may not invalidate existing tokens, so active sessions and tokens should also be explicitly revoked.",
  },
  {
    domain: "4.0 Security Operations",
    question:
      "During malware analysis, why should suspicious code be executed inside an isolated sandbox?",
    options: [
      "To improve the malware's performance",
      "To observe its behavior while limiting harm to production systems",
      "To guarantee the malware cannot detect analysis",
      "To permanently remove every vulnerability",
    ],
    answer: 1,
    explanation:
      "A sandbox provides an isolated environment for observing malicious behavior while reducing the risk to operational systems.",
  },
  {
    domain: "5.0 Security Program Management and Oversight",
    question:
      "Which metric best measures whether security awareness training is reducing phishing risk?",
    options: [
      "The number of company email accounts",
      "The size of the training department",
      "The percentage of users reporting simulated phishing messages",
      "The number of training slides",
    ],
    answer: 2,
    explanation:
      "The reporting rate for simulated phishing messages provides evidence that users recognize and appropriately respond to suspicious email.",
  },
  {
    domain: "5.0 Security Program Management and Oversight",
    question:
      "An employee repeatedly fails phishing simulations. What is the most appropriate next step?",
    options: [
      "Immediately terminate the employee",
      "Publish the employee's results company-wide",
      "Disable all organizational email",
      "Provide targeted remedial training",
    ],
    answer: 3,
    explanation:
      "Targeted remedial training addresses the specific weakness while giving the employee an opportunity to improve.",
  },
  {
    domain: "5.0 Security Program Management and Oversight",
    question:
      "Which policy defines how long business records must be stored before they are securely destroyed?",
    options: [
      "Password policy",
      "Acceptable use policy",
      "Data retention policy",
      "Remote access policy",
    ],
    answer: 2,
    explanation:
      "A data retention policy defines how long different categories of information must be preserved and how they should be disposed of.",
  },
  {
    domain: "5.0 Security Program Management and Oversight",
    question:
      "Before launching a system that collects detailed customer location data, which assessment should the organization perform?",
    options: [
      "Privacy impact assessment",
      "Business continuity exercise",
      "Wireless site survey",
      "Password audit",
    ],
    answer: 0,
    explanation:
      "A privacy impact assessment evaluates how personal information is collected, processed, stored, shared, and protected.",
  },
  {
    domain: "5.0 Security Program Management and Oversight",
    question:
      "Which contract provision allows an organization to inspect a vendor's security controls or supporting evidence?",
    options: [
      "Warranty disclaimer",
      "Noncompete agreement",
      "Right-to-audit clause",
      "Force majeure clause",
    ],
    answer: 2,
    explanation:
      "A right-to-audit clause permits the customer to assess or obtain evidence regarding the vendor's compliance and security controls.",
  },
  {
    domain: "5.0 Security Program Management and Oversight",
    question:
      "Which agreement commonly establishes the general legal and business terms governing multiple future projects with the same vendor?",
    options: [
      "Chain-of-custody form",
      "NDA",
      "SLA",
      "Master service agreement",
    ],
    answer: 3,
    explanation:
      "A master service agreement establishes overarching terms that can apply to multiple statements of work or future engagements.",
  },
  {
    domain: "5.0 Security Program Management and Oversight",
    question:
      "In a RACI matrix, which role has final ownership and approves the completed work?",
    options: ["Responsible", "Informed", "Accountable", "Consulted"],
    answer: 2,
    explanation:
      "The accountable role has final ownership and approval authority, while the responsible role performs the work.",
  },
  {
    domain: "5.0 Security Program Management and Oversight",
    question:
      "Which term describes the broad amount and type of risk an organization is willing to pursue or retain?",
    options: [
      "Risk appetite",
      "Mean time to repair",
      "Exposure factor",
      "Recovery point objective",
    ],
    answer: 0,
    explanation:
      "Risk appetite describes the general level and types of risk an organization is willing to accept while pursuing its objectives.",
  },
  {
    domain: "5.0 Security Program Management and Oversight",
    question:
      "A security incident is expected to cause a $20,000 loss and occur once every two years. What is the annual loss expectancy?",
    options: ["$10,000", "$20,000", "$5,000", "$40,000"],
    answer: 0,
    explanation:
      "The annualized rate of occurrence is 0.5. Multiplying the $20,000 single loss expectancy by 0.5 gives a $10,000 annual loss expectancy.",
  },
  {
    domain: "5.0 Security Program Management and Oversight",
    question:
      "After new safeguards are applied, some risk still remains. What is this remaining risk called?",
    options: [
      "Inherent risk",
      "Residual risk",
      "Avoided risk",
      "Transferred risk",
    ],
    answer: 1,
    explanation:
      "Residual risk is the risk that remains after controls and other treatment measures have been implemented.",
  },
  {
    domain: "5.0 Security Program Management and Oversight",
    question:
      "Who is normally responsible for deciding how an identified business risk should be treated?",
    options: [
      "Data subject",
      "Certificate authority",
      "Risk owner",
      "External attacker",
    ],
    answer: 2,
    explanation:
      "The risk owner is accountable for monitoring the risk and selecting or approving its treatment.",
  },
  {
    domain: "5.0 Security Program Management and Oversight",
    question:
      "Which characteristic most clearly distinguishes an external audit from an internal audit?",
    options: [
      "It only examines physical controls",
      "It is performed by an independent outside party",
      "It cannot evaluate compliance",
      "It never reviews documentation",
    ],
    answer: 1,
    explanation:
      "External audits are conducted by independent parties outside the organization, often to provide assurance to regulators, customers, or other stakeholders.",
  },
  {
    domain: "5.0 Security Program Management and Oversight",
    question:
      "Which item provides the strongest evidence that a security control operated effectively during a specific period?",
    options: [
      "An unsigned marketing brochure",
      "A copy of the written policy alone",
      "Timestamped logs and test results",
      "A manager's verbal statement",
    ],
    answer: 2,
    explanation:
      "Timestamped operational records and test results provide direct evidence that a control functioned during the period being assessed.",
  },
  {
    domain: "5.0 Security Program Management and Oversight",
    question:
      "A security team discusses how it would respond to a ransomware incident using a fictional scenario, but no production systems are changed. What type of exercise is this?",
    options: [
      "Full interruption test",
      "Tabletop exercise",
      "Vulnerability scan",
      "Penetration test",
    ],
    answer: 1,
    explanation:
      "A tabletop exercise uses discussion-based scenarios to evaluate plans, roles, decisions, and communication without disrupting production systems.",
  },
  {
    domain: "5.0 Security Program Management and Oversight",
    question:
      "Which plan focuses primarily on restoring technology systems, applications, and data after a major disruption?",
    options: [
      "Data classification plan",
      "Security awareness plan",
      "Acceptable use plan",
      "Disaster recovery plan",
    ],
    answer: 3,
    explanation:
      "A disaster recovery plan focuses on restoring technology infrastructure, systems, applications, and data after a disruptive event.",
  },
  {
    domain: "5.0 Security Program Management and Oversight",
    question:
      "A document is labeled confidential. What should determine how employees store, transmit, and destroy it?",
    options: [
      "The organization's data-handling requirements",
      "The document's font size",
      "The employee's personal preference",
      "The age of the employee",
    ],
    answer: 0,
    explanation:
      "Classification labels should map to defined handling requirements for storage, transmission, access, retention, and destruction.",
  },
  {
    domain: "5.0 Security Program Management and Oversight",
    question:
      "What is a likely consequence of failing to comply with an applicable privacy regulation?",
    options: [
      "Automatic elimination of security risks",
      "Permanent exemption from audits",
      "Fines, legal action, or corrective orders",
      "Reduced need for documentation",
    ],
    answer: 2,
    explanation:
      "Regulatory noncompliance can result in financial penalties, legal action, mandatory corrective measures, and reputational damage.",
  },
  {
    domain: "5.0 Security Program Management and Oversight",
    question:
      "An emergency firewall change is implemented to stop an active attack before the normal approval process can be completed. What should occur afterward?",
    options: [
      "A retrospective review and documentation should be completed",
      "All firewall logging should be disabled",
      "The firewall should be removed permanently",
      "The change should remain undocumented",
    ],
    answer: 0,
    explanation:
      "Emergency changes should be reviewed, tested, documented, and formally approved after implementation to preserve accountability and identify unintended effects.",
  },
];
