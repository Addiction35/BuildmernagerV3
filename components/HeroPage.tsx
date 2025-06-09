import React from 'react';

const HeroPage = () => {
  return (
      <div className="min-h-screen bg-background text-foreground p-8">
        <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4 text-primary">
            Build with Confidence.
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
            Powering projects with trust and innovation – your construction partner.
            </p>

            <button className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold shadow hover:bg-orange-600 transition">
            Get a Free Quote
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-card p-6 rounded-xl shadow border hover:shadow-lg transition">
                <h2 className="text-xl font-bold text-primary">Project Management</h2>
                <p className="text-muted-foreground mt-2">Track progress and budgets with real-time updates.</p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow border hover:shadow-lg transition">
                <h2 className="text-xl font-bold text-primary">Reliable Teams</h2>
                <p className="text-muted-foreground mt-2">Access skilled professionals for every stage of construction.</p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow border hover:shadow-lg transition">
                <h2 className="text-xl font-bold text-primary">Smart Estimates</h2>
                <p className="text-muted-foreground mt-2">Generate and manage quotes with accuracy and speed.</p>
            </div>
            </div>
        </div>
        </div>
  );
}

export default HeroPage;
