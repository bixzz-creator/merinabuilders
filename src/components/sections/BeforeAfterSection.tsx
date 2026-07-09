import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import SectionHeading from '@/components/ui/SectionHeading';
import beforeRenovation from '@/assets/images/modern-interior.png'; // Using available images
import afterRenovation from '@/assets/images/luxury-villa.png';

export default function BeforeAfterSection() {
  return (
    <section className="section-padding bg-navy-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <SectionHeading
              badge="Transformations"
              title="Witness the Transformation"
              subtitle="From old structures and blueprints to stunning architectural realities, we take pride in our impeccable execution."
              align="left"
              className="mb-8"
            />
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30 mt-1">
                  <span className="text-gold text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-ivory">Structural Remodeling</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    We reinforce foundation columns, re-engineer floor layouts, and expand living spaces safely.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30 mt-1">
                  <span className="text-gold text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-ivory">Premium Finish Upgrades</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Replacing outdated materials with marble tiles, premium modular kitchens, and custom fixtures.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Slider Column */}
          <div className="lg:col-span-7">
            <BeforeAfterSlider
              beforeImage={beforeRenovation}
              afterImage={afterRenovation}
              beforeLabel="Before Restoration"
              afterLabel="After Handover"
            />
            <p className="text-center text-xs text-muted-foreground mt-4 italic">
              *Drag the slider handle horizontally to view the before and after states.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
