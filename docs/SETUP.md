## 🛠️ Running Locally

### 1. Clone the project

```bash
git clone https://github.com/vlopess/kristnotes.git
cd kristnotes
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

> 💡 You need to create your own Supabase project to run this locally.
> See [docs/supabase.md](docs/supabase.md) for full setup instructions.

### 4. Start the project

```bash
npm run dev
```
