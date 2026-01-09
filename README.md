# n8n-nodes-morelogin

This is an n8n community node. It lets you use GitHub Issues in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- Schedules
    - Search market template page
    - Search personal template page
    - Create a schedule task211

## Credentials

To authenticate with the MoreLogin API, you need an **API Key**.

### How to get your MoreLogin API Key

1. Open moreLogin client, login to your MoreLogin dashboard account. [Download](https://www.morelogin.com/download/)
2. Go to **API** .
3. Copy API ID and API Key.
5. Save the key securely — it will be used in n8n credentials.

> **Security Note**: Treat your API key like a password. Never expose it in public repositories.


## Compatibility

Compatible with n8n@1.60.0 or later

## Usage Examples

### Example 1: Create a Once schedule
1. Use **"Create profile"** operation.
2. Set:
   - CloudPhoneId: `1678331966138097`
   - ScheduleName: `test`
   - TemplateId: `1678347487160296`
   - TemplateParameter: `{\"1\":\"reae\"}`
   - Description: `schedule task description`
3. The node returns the new schedule ID


## Resources

- [MoreLogin Official Website](https://www.morelogin.com/)
- [MoreLogin API Documentation](https://guide.morelogin.com/api-reference/open-api/open-api)
- [n8n Community Nodes Overview](https://docs.n8n.io/integrations/#community-nodes)
- [Anti-Detection Browser Automation Guide (n8n Blog)](https://n8n.io/blog/)

---

> **Developers**: Found a bug or want to contribute? Visit the [GitHub repository](https://github.com/your-username/n8n-nodes-morelogin) (replace with your actual repo link).
