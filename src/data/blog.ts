import type { BlogPost } from '@/types';
import heroImg from '@/assets/images/hero-construction.png';
import villaImg from '@/assets/images/luxury-villa.png';
import interiorImg from '@/assets/images/modern-interior.png';

export const blogPosts: BlogPost[] = [
  {
    id: 'choosing-right-construction-materials',
    title: 'How to Choose the Right Construction Materials for Your Dream Home',
    excerpt: 'A comprehensive guide to selecting premium construction materials that ensure durability, aesthetics, and value for your residential project.',
    category: 'Materials',
    date: '2024-12-15',
    readTime: '8 min',
    image: heroImg,
    content: `
      <h2>The Foundation of a Strong Home: Selecting Grade-A Materials</h2>
      <p>Building a custom home is a once-in-a-lifetime investment. The durability of your structure depends heavily on the quality of raw materials selected during the pre-construction phase. Using sub-standard materials can lead to structural cracks, moisture seepage, and high maintenance costs down the line. Here is a professional checklist to guide your material planning.</p>

      <h3>1. Cement and Concrete Grades</h3>
      <p>For foundations, columns, and RCC beams, always use <strong>OPC (Ordinary Portland Cement) Grade 53</strong> or high-quality blended cements like <strong>PPC (Portland Pozzolana Cement)</strong>. PPC is highly recommended for brick masonry and plastering works as it provides excellent resistance to sulfate attacks and prevents moisture cracks.</p>

      <h3>2. High-Tensile TMT Steel Rods</h3>
      <p>The reinforcement skeleton of your home must be built with certified <strong>TMT (Thermo-Mechanically Treated) Steel Rods</strong> of grade Fe 500D or Fe 550D. The "D" stands for ductility, which ensures the steel bends without snapping, offering earthquake resistance and high load-bearing capacity.</p>

      <h3>3. Bricks vs. Solid Concrete Blocks</h3>
      <p>Traditional red clay bricks offer excellent thermal insulation and are ideal for residential houses. However, high-quality <strong>Solid Concrete Blocks</strong> or <strong>AAC (Autoclaved Aerated Concrete) Blocks</strong> have become highly popular in Thanjavur and Kumbakonam due to their structural uniformity, light weight, and speedy laying times.</p>

      <h3>4. Fine Aggregate (M-Sand vs. River Sand)</h3>
      <p>Due to environmental regulations on river sand, certified <strong>M-Sand (Manufactured Sand)</strong> is the industry standard. Ensure you use concrete-grade M-Sand for RCC structures, and fine plastering-grade sand for wall finishes to achieve a smooth texture.</p>

      <h3>5. Premium Finishes (Vitrified Tiles vs. Granite)</h3>
      <p>For flooring, vitrified tiles offer high durability and stain resistance at affordable prices. For staircases, sit-outs, and kitchen countertops, local Indian granites provide unmatched strength and a luxury finish.</p>
    `
  },
  {
    id: 'vastu-modern-homes',
    title: 'Integrating Vastu Shastra in Modern Home Design',
    excerpt: 'How to blend traditional Vastu principles with contemporary architecture for homes that are both spiritually aligned and aesthetically modern.',
    category: 'Design',
    date: '2024-11-28',
    readTime: '6 min',
    image: villaImg,
    content: `
      <h2>Balancing Ancient Vastu Shastra with Contemporary Architecture</h2>
      <p>Vastu Shastra is the traditional Indian science of architecture that aligns structures with the magnetic fields of the Earth and the five elements of nature. Integrating Vastu does not mean compromising on modern open-floor layouts or glass facades. Here is how modern home designs are structurally aligned for prosperity and peace.</p>

      <h3>1. The Entrance (Eesanya / North-East)</h3>
      <p>The main entrance is the gateway for energy. According to Vastu, entrances facing <strong>North, East, or North-East</strong> are highly auspicious. Ensure the entrance area is spacious, well-lit, and decorated with premium custom carvings or minimal brass borders to attract positive energy.</p>

      <h3>2. The Kitchen (Agni / South-East)</h3>
      <p>The kitchen represents the fire element (Agni). Vastu states that the kitchen must ideally be positioned in the <strong>South-East corner</strong> of the house. The cooking counter should face East so that the person cooking always faces the rising sun.</p>

      <h3>3. The Master Bedroom (Nairuthi / South-West)</h3>
      <p>The master bedroom governs stability and leadership. It must always be located in the <strong>South-West corner</strong> of the duplex or villa. To ensure heavy-load stability, Vastu recommends keeping the bed headboard facing South or West.</p>

      <h3>4. Water Storage and Plumbing (North-East)</h3>
      <p>Water tanks, borewells, and underground sumps must be positioned in the <strong>North or North-East directions</strong>. Overhead water tanks, representing weight, are best placed in the South-West or West corners of the roof slab.</p>

      <h3>5. Open Space & Ventilation</h3>
      <p>Modern homes emphasize cross-ventilation. Vastu complements this by requiring larger windows on the North and East walls compared to the South and West walls, ensuring fresh air flows smoothly throughout the living space.</p>
    `
  },
  {
    id: 'sustainable-construction-2024',
    title: 'Sustainable Construction Practices in 2024',
    excerpt: 'Explore the latest eco-friendly construction techniques, green materials, and energy-efficient designs that reduce environmental impact.',
    category: 'Sustainability',
    date: '2024-11-10',
    readTime: '7 min',
    image: heroImg,
    content: `
      <h2>The Rise of Green Building: Sustainability in Construction</h2>
      <p>Sustainable construction is no longer a luxury—it is an environmental necessity. Building an energy-efficient home reduces electricity bills, protects local resources, and creates a healthier indoor atmosphere. Here are the core green practices driving construction in 2024.</p>

      <h3>1. Fly-Ash and AAC Blocks</h3>
      <p>Traditional clay brick kilns consume topsoil and generate high carbon emissions. Modern green builds utilize <strong>Fly-Ash Bricks</strong> or <strong>AAC Blocks</strong>. AAC blocks contain recycled materials, are highly thermal insulated (keeping rooms cooler), and require less plastering mortar due to their precise dimensions.</p>

      <h3>2. Solar Energy Integration</h3>
      <p>Planning for <strong>Rooftop Solar Panels</strong> during the structural design phase is crucial. This involves proper conduit routing, structural planning for panel load-bearing on the terrace slab, and designing a dry, accessible area for battery storage and inverters.</p>

      <h3>3. Rainwater Harvesting (RWH) Layouts</h3>
      <p>RWH is mandatory for all new buildings in Tamil Nadu. We design integrated RWH systems that collect terrace runoff, filter it through organic sand-gravel beds, and direct it to underground recharge sumps to maintain local groundwater tables.</p>

      <h3>4. Thermal Insulation and Glazing</h3>
      <p>Using double-glazed windows (DGU) blocks heat transmission while letting in natural light. Combining this with reflective white roof paints reduces air conditioning loads by up to 30%, saving energy year-round.</p>

      <h3>5. Low-VOC Paints & Natural Finishes</h3>
      <p>Indoor air quality is vital. Green construction utilizes low-VOC (Volatile Organic Compound) paints and natural varnishes, eliminating chemical odors and protecting your family from respiratory hazards.</p>
    `
  },
  {
    id: 'renovation-vs-rebuild',
    title: 'Renovation vs. Rebuild: Making the Right Decision',
    excerpt: 'A practical guide to help homeowners decide between renovating their existing property or building from scratch based on cost, time, and goals.',
    category: 'Tips',
    date: '2024-10-22',
    readTime: '5 min',
    image: interiorImg,
    content: `
      <h2>Should You Renovate or Demolish and Rebuild?</h2>
      <p>Homeowners with older properties often face the dilemma: is it better to renovate the existing structure or completely demolish it and build from scratch? Both approaches have unique benefits and budget implications. Here is a technical breakdown to help you make an informed decision.</p>

      <h3>1. Evaluating Structural Integrity</h3>
      <p>Before planning any work, hire a civil engineer to conduct a <strong>structural stability audit</strong>. If the foundation is solid, columns are free of deep cracks, and the steel inside the slab hasn't corroded, a comprehensive renovation is highly feasible. If the concrete is weak and crumbling, rebuilding is the only safe option.</p>

      <h3>2. Cost Comparisons</h3>
      <p>Renovating saves you the cost of earthworks, deep foundations, and core RCC framing (which make up about 35-40% of a new build's cost). However, if a renovation requires complex plumbing changes, retrofitting columns, or removing load-bearing walls, the engineering costs can escalate quickly.</p>

      <h3>3. Architectural Layout Flexibility</h3>
      <p>If you desire an open-plan layout with double-height ceilings, a complete rebuild is ideal. Rebuilding gives you a blank canvas to apply modern spacing codes, Vastu alignments, and advanced smart home wiring. Renovations are bounded by the existing columns and structural load pathways.</p>

      <h3>4. Timelines & Disruption</h3>
      <p>Renovating a single room or adding a floor takes between 2 to 4 months and allows you to occupy the property. A complete rebuild takes 10 to 12 months and requires temporary relocation. Choose the path that matches your timeline limits.</p>
    `
  },
  {
    id: 'smart-home-integration',
    title: 'Smart Home Integration in New Construction',
    excerpt: 'From voice-controlled lighting to automated security — how to plan for smart home technology during the construction phase.',
    category: 'Technology',
    date: '2024-10-05',
    readTime: '6 min',
    image: villaImg,
    content: `
      <h2>Pre-Planning for Smart Home Systems in New Builds</h2>
      <p>Retrofitting smart technology into a finished home often requires drilling through plaster and running messy surface wires. The most cost-effective and aesthetic approach is pre-planning smart conduits during the structural electrical layout phase. Here is how to prepare your home for the future.</p>

      <h3>1. Dedicated Conduit Layouts</h3>
      <p>Ensure your electrical engineer includes extra 1-inch conduits running from the main switchboard to the ceiling. This allows easy routing of smart hubs, cat-6 ethernet cables, and automated lighting controls without wall disruption.</p>

      <h3>2. Structured LAN Cabling (Cat-6)</h3>
      <p>While Wi-Fi is standard, smart security cameras, TV streaming units, and central servers run faster and safer on wired connections. Run Cat-6 ethernet cables to key points—the living room console, study desk, and exterior entrance gates.</p>

      <h3>3. Smart Security Hub Placement</h3>
      <p>Plan a secure, central location (like a closet or utility cabinet) to house your smart home router, network switches, CCTV DVR, and power back-ups. This keeps noisy servers out of sight and simplifies maintenance access.</p>

      <h3>4. Automated Water Pump Systems</h3>
      <p>Pre-cabling sensors from the underground sump to the overhead tank allows you to install smart water-level controllers. The pump will trigger automatically when water is low and turn off when full, preventing water waste.</p>

      <h3>5. Smart Lighting Conduits</h3>
      <p>Include neutral wires in all switchboxes. Standard light switches only require line wires, but smart switches and dimmers need a neutral connection to stay powered and connected to the Wi-Fi network.</p>
    `
  },
  {
    id: 'construction-cost-management',
    title: '10 Tips to Manage Construction Costs Without Compromising Quality',
    excerpt: 'Practical strategies for homeowners and developers to keep their construction budget in check while maintaining premium quality standards.',
    category: 'Tips',
    date: '2024-09-18',
    readTime: '7 min',
    image: heroImg,
    content: `
      <h2>Managing Your Construction Budget Responsibly</h2>
      <p>Building a home is exciting, but budget overruns can quickly cause stress. Managing costs does not mean buying cheap materials or hiring uncertified labor—which costs more in repairs later. It means optimizing planning, scheduling, and procurement. Here are 10 tips to keep your budget in check.</p>

      <h3>1. Use AI Construction Cost Estimators</h3>
      <p>Before meeting contractors, use dynamic cost estimators (like our <strong>AI Cost Estimator</strong>) to input your floor area, quality preferences, and specifications. This gives you a realistic benchmark budget to compare bids.</p>

      <h3>2. Detailed Bill of Quantities (BOQ)</h3>
      <p>Always request a detailed BOQ showing the exact quantities of sand, cement, steel, tiles, and fittings needed. A fixed-rate contract based on a clear BOQ prevents unexpected "extra charge" bills during construction.</p>

      <h3>3. Avoid Design Changes Midway</h3>
      <p>Finalize your architectural blueprints, electrical sockets, and plumbing points BEFORE excavation begins. Changing layouts mid-way requires demolishing finished masonry, wasting labor and materials.</p>

      <h3>4. Hire a Turnkey Project Management Consultant (PMC)</h3>
      <p>PMC services supervise materials quality, schedule milestones, and vet bills. Vetting by an experienced engineer ensures you only pay for actual completed work, preventing contractor over-billing.</p>

      <h3>5. Purchase Materials in Bulk</h3>
      <p>If you are managing the build, purchase core materials like cement, TMT steel, and bricks directly from wholesale distributors. Bulk orders save on transit costs and yield significant discounts.</p>
    `
  }
];
