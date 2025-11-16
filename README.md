<!-- @format -->

# Dot Connection Dashboard

A modern, responsive admin dashboard built with Next.js, React, and TypeScript. This comprehensive dashboard solution provides a clean interface for managing users, monitoring payments, and tracking key business metrics.

## 🚀 Features

### Dashboard Overview

- **Real-time Statistics Cards**: Display key metrics including total users, free/paid user counts, and revenue
- **Interactive Data Visualization**: Dynamic cards with growth indicators and trend analysis
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

### User Management

- **Advanced User Table**: Comprehensive user listing with sorting and filtering capabilities
- **User Details Modal**: Quick view of user information including profile, status, and purchase history
- **Search Functionality**: Real-time search by user name
- **Multi-filter Options**: Filter users by status (Active/Inactive) and type (Paid/Free)
- **Pagination**: Efficient data pagination with customizable items per page

### Payment Tracking

- **Payment Analytics**: Track total payments, paid amounts, and cancelled transactions
- **Transaction Table**: Detailed payment records with user information and amounts
- **Total Amount Summary**: Real-time calculation of total payments

### UI/UX Features

- **Collapsible Sidebar**: Space-efficient navigation with icon-only mode
- **Mobile-Responsive**: Seamless experience across all screen sizes
- **Dark Mode Support**: Eye-friendly interface for extended usage
- **Smooth Animations**: Polished transitions and hover effects
- **Custom Components**: Reusable card and table components

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.5.2](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Component Library**: shadcn/ui
- **Icons**: Lucide React, React Icons
- **State Management**: Redux
- **Image Optimization**: Next.js Image component

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun package manager

## 🚀 Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/rahul3507/Dot-Connection-dashboard.git
cd Dot-Connection-dashboard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
Dot-Connection-dashboard/
├── src/
│   ├── app/
│   │   ├── overview/          # Dashboard overview page
│   │   ├── users/             # User management page
│   │   ├── payment/           # Payment tracking page
│   │   ├── package/           # Package management page
│   │   ├── layout.tsx         # Root layout with sidebar
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── common/
│   │   │   ├── custom-card.tsx        # Reusable statistics card
│   │   │   ├── custom-table.tsx       # Dynamic table component
│   │   │   ├── dashboard-sidebar.tsx  # Navigation sidebar
│   │   │   └── logout-modal.tsx       # Logout confirmation
│   │   └── ui/                # shadcn/ui components
│   ├── redux/
│   │   └── data.tsx           # User data and mock data
│   ├── hooks/
│   │   └── use-mobile.tsx     # Mobile detection hook
│   └── lib/
│       └── utils.ts           # Utility functions
├── public/                    # Static assets
└── package.json
```

## 🎨 Key Components

### CustomCard

Reusable statistics card component with optional growth indicators and icons.

**Features**:

- Dynamic value formatting
- Optional growth percentage display with trend arrows
- Configurable icon display
- Responsive design

### CustomTable

Advanced data table component with built-in functionality.

**Features**:

- Search by name
- Multi-criteria filtering
- Pagination (15 items per page)
- User details modal
- Responsive column layout
- Empty state handling

### DashboardSidebar

Collapsible navigation sidebar with responsive behavior.

**Features**:

- Icon-only collapsed mode
- Active route highlighting
- Mobile hamburger menu
- Smooth transitions

## 🎯 Pages

### Overview (`/overview`)

Main dashboard displaying:

- Total users, free users, paid users, and revenue cards
- Complete user list with search and filters

### Users (`/users`)

Dedicated user management page with:

- User statistics cards (Total, Paid, Free)
- Detailed user table
- Advanced filtering and search

### Payment (`/payment`)

Payment tracking interface showing:

- Payment statistics (Total, Paid, Cancelled)
- Transaction table with amounts
- Total amount summary

### Package (`/package`)

Package management section (Coming soon)

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS with custom configuration. Modify `tailwind.config.ts` for theme customization.

### Environment Variables

Create a `.env.local` file for environment-specific configurations:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Rahul** - [GitHub Profile](https://github.com/rahul3507)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

**Built with ❤️ using Next.js and React**
