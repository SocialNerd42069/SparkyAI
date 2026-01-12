FROM node:22-bookworm

# Install Bun (required for build scripts)
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

RUN corepack enable

# Install uv for skills that use PEP-723 headers (e.g., nano-banana-pro).
RUN curl -LsSf https://astral.sh/uv/install.sh | sh   && ln -s /root/.local/bin/uv /usr/local/bin/uv   && ln -s /root/.local/bin/uvx /usr/local/bin/uvx

# Preinstall Nano Banana deps so the skill works immediately.
RUN uv pip install --system --break-system-packages google-genai pillow

# Install ClawdHub CLI so skills can be installed from the registry at runtime.
RUN npm i -g clawdhub

WORKDIR /app

ARG CLAWDBOT_DOCKER_APT_PACKAGES=""
RUN if [ -n "$CLAWDBOT_DOCKER_APT_PACKAGES" ]; then \
      apt-get update && \
      DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends $CLAWDBOT_DOCKER_APT_PACKAGES && \
      apt-get clean && \
      rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*; \
    fi

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY ui/package.json ./ui/package.json
COPY patches ./patches
COPY scripts ./scripts

RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build
RUN pnpm ui:install
RUN pnpm ui:build

ENV NODE_ENV=production
ENV PATH="/home/node/clawd/.local/bin:/home/node/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

CMD ["node", "dist/index.js"]
