import React from "react";
import {
  Users,
  FileText,
  Globe,
  BarChart3,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  AlertCircle,
  TrendingUp,
  Briefcase,
  CalendarDays,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Applications",
      value: "1,248",
      change: "+12.5%",
      icon: <FileText size={22} />,
      bg: "bg-blue-50",
      iconColor: "text-[#0B3B82]",
      changeColor: "text-green-600",
    },
    {
      title: "Active Users",
      value: "326",
      change: "+8.2%",
      icon: <Users size={22} />,
      bg: "bg-orange-50",
      iconColor: "text-[#E67E22]",
      changeColor: "text-green-600",
    },
    {
      title: "Website Visits",
      value: "18,940",
      change: "+18.4%",
      icon: <Globe size={22} />,
      bg: "bg-sky-50",
      iconColor: "text-sky-600",
      changeColor: "text-green-600",
    },
    {
      title: "Reports Generated",
      value: "74",
      change: "+5.1%",
      icon: <BarChart3 size={22} />,
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      changeColor: "text-green-600",
    },
  ];

  const recentApplications = [
    {
      id: "APP-1001",
      name: "Jean Claude",
      program: "Web Development",
      date: "20 Mar 2026",
      status: "Pending",
    },
    {
      id: "APP-1002",
      name: "Divine Uwase",
      program: "Digital Marketing",
      date: "19 Mar 2026",
      status: "Approved",
    },
    {
      id: "APP-1003",
      name: "Eric Ndayisaba",
      program: "UI/UX Design",
      date: "19 Mar 2026",
      status: "Reviewing",
    },
    {
      id: "APP-1004",
      name: "Aline Mukamana",
      program: "Software Development",
      date: "18 Mar 2026",
      status: "Approved",
    },
  ];

  const quickActions = [
    {
      title: "Manage Website",
      desc: "Update pages, content and website information.",
      icon: <Globe size={20} />,
    },
    {
      title: "Review Applications",
      desc: "Check new student and user applications.",
      icon: <FileText size={20} />,
    },
    {
      title: "Generate Reports",
      desc: "Create and export dashboard reports quickly.",
      icon: <BarChart3 size={20} />,
    },
    {
      title: "Manage Users",
      desc: "Add, update or control system users.",
      icon: <Users size={20} />,
    },
  ];

  const activities = [
    {
      title: "New application submitted",
      time: "10 minutes ago",
      icon: <Clock3 size={16} />,
      color: "text-[#E67E22]",
      bg: "bg-orange-50",
    },
    {
      title: "Website homepage updated",
      time: "1 hour ago",
      icon: <CheckCircle2 size={16} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Monthly report generated",
      time: "3 hours ago",
      icon: <TrendingUp size={16} />,
      color: "text-sky-600",
      bg: "bg-sky-50",
    },
    {
      title: "System needs one setting review",
      time: "Today",
      icon: <AlertCircle size={16} />,
      color: "text-red-500",
      bg: "bg-red-50",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-100 text-emerald-700";
      case "Pending":
        return "bg-orange-100 text-orange-700";
      case "Reviewing":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <section className="rounded-3xl bg-gradient-to-r from-[#0B3B82] to-[#0f4da8] p-6 text-white shadow-lg md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-orange-200">
              Admin Overview
            </p>
            <h1 className="text-2xl font-bold md:text-3xl">
              Welcome back, Admin 👋
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-blue-100 md:text-base">
              Here is a quick summary of your platform performance, applications,
              users, and website activities for today.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/15 p-3">
                <CalendarDays size={22} />
              </div>
              <div>
                <p className="text-sm text-blue-100">Today</p>
                <h3 className="text-lg font-semibold">20 March 2026</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {item.title}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-800">
                  {item.value}
                </h3>
                <p className={`mt-2 text-sm font-semibold ${item.changeColor}`}>
                  {item.change} this month
                </p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.bg} ${item.iconColor}`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Quick Actions + Activity */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Quick Actions</h2>
              <p className="text-sm text-slate-500">
                Access your important management areas fast.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {quickActions.map((action) => (
              <button
                key={action.title}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-[#0B3B82] hover:bg-[#F4F8FF]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B3B82]/10 text-[#0B3B82]">
                  {action.icon}
                </div>

                <h3 className="text-base font-semibold text-slate-800">
                  {action.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{action.desc}</p>

                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#E67E22]">
                  Open
                  <ArrowUpRight
                    size={16}
                    className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-800">Recent Activity</h2>
            <p className="text-sm text-slate-500">
              Latest actions and updates in the system.
            </p>
          </div>

          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-2xl border border-slate-100 p-3"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${activity.bg} ${activity.color}`}
                >
                  {activity.icon}
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-800">
                    {activity.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table + Side Cards */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Recent Applications
              </h2>
              <p className="text-sm text-slate-500">
                Latest submitted applications in the system.
              </p>
            </div>

            <button className="rounded-xl bg-[#0B3B82] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#082d64]">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    ID
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Name
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Program
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Date
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentApplications.map((item) => (
                  <tr key={item.id} className="rounded-2xl bg-slate-50">
                    <td className="rounded-l-2xl px-4 py-4 text-sm font-semibold text-[#0B3B82]">
                      {item.id}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">
                      {item.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">
                      {item.program}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-500">
                      {item.date}
                    </td>
                    <td className="rounded-r-2xl px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-[#0B3B82]/10 p-3 text-[#0B3B82]">
                <Briefcase size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  Website Status
                </h3>
                <p className="text-sm text-slate-500">
                  Current website health summary
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-slate-600">Server Uptime</span>
                  <span className="font-semibold text-slate-800">98%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[98%] rounded-full bg-[#0B3B82]"></div>
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-slate-600">Content Updated</span>
                  <span className="font-semibold text-slate-800">84%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[84%] rounded-full bg-[#E67E22]"></div>
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-slate-600">SEO Progress</span>
                  <span className="font-semibold text-slate-800">72%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[72%] rounded-full bg-emerald-500"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800">System Note</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              You can connect this dashboard to your backend API later for real
              statistics, recent applications, reports, and website activity.
            </p>

            <button className="mt-5 rounded-xl bg-[#E67E22] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#cc6d1e]">
              Manage Settings
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}