import re
import json
from collections import Counter, defaultdict

# === ANALYSE-FUNKTIONEN ===

def analyze_templates(templates_js_path):
    """Analysiert Templates und findet Redundanzen"""
    
    with open(templates_js_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Property-Häufigkeit analysieren
    property_pattern = r'"(\w+)":\s*"([^"]*)"'
    all_properties = re.findall(property_pattern, content)
    
    property_counts = Counter([prop[0] for prop in all_properties])
    
    print("🔍 TOP 20 HÄUFIGSTE PROPERTIES:")
    print("-" * 60)
    for prop, count in property_counts.most_common(20):
        print(f"{prop:40} → {count}x verwendet")
    
    # Template-IDs extrahieren
    template_ids = re.findall(r'"id":\s*"([^"]+)"', content)
    print(f"\n📦 ANZAHL TEMPLATES: {len(template_ids)}")
    
    # Kategorien analysieren
    categories = re.findall(r'"category":\s*"([^"]+)"', content)
    category_counts = Counter(categories)
    print(f"\n📁 KATEGORIEN:")
    for cat, count in category_counts.most_common():
        print(f"  - {cat}: {count} Templates")
    
    # Ähnliche Properties finden
    print(f"\n🔄 PROPERTY-GRUPPEN (potentiell zusammenfassbar):")
    button_props = [p for p in property_counts.keys() if 'button' in p.lower()]
    icon_props = [p for p in property_counts.keys() if 'icon' in p.lower()]
    color_props = [p for p in property_counts.keys() if 'color' in p.lower()]
    spacing_props = [p for p in property_counts.keys() if 'spacing' in p.lower() or 'gap' in p.lower()]
    
    print(f"  Button-Properties: {len(button_props)} verschiedene")
    print(f"  Icon-Properties: {len(icon_props)} verschiedene")
    print(f"  Color-Properties: {len(color_props)} verschiedene")
    print(f"  Spacing-Properties: {len(spacing_props)} verschiedene")
    
    return {
        'property_counts': property_counts,
        'template_ids': template_ids,
        'categories': category_counts,
        'button_props': button_props,
        'icon_props': icon_props
    }

def analyze_processors(processors_js_path):
    """Analysiert Processor-Funktionen"""
    
    with open(processors_js_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Funktionen finden
    function_pattern = r'function\s+(process\w+)\s*\('
    functions = re.findall(function_pattern, content)
    
    print("\n\n" + "="*60)
    print("🔧 PROCESSOR-FUNKTIONEN ANALYSE")
    print("="*60)
    print(f"\n📊 ANZAHL PROCESSOR-FUNKTIONEN: {len(functions)}")
    
    # Ähnliche Patterns finden
    loop_functions = []
    for func in functions:
        # Suche nach for-Schleifen im Funktions-Body
        func_start = content.find(f'function {func}')
        if func_start != -1:
            # Finde Ende der Funktion (nächste function oder Ende)
            next_func = content.find('function ', func_start + 10)
            func_body = content[func_start:next_func] if next_func != -1 else content[func_start:]
            
            if 'for (let i = 1; i <=' in func_body:
                # Extrahiere maximale Anzahl
                max_match = re.search(r'for \(let i = 1; i <= (\d+)', func_body)
                if max_match:
                    max_items = max_match.group(1)
                    loop_functions.append((func, max_items))
    
    print(f"\n🔁 FUNKTIONEN MIT WIEDERHOLENDEN ITEMS (for-Schleifen):")
    print("-" * 60)
    for func, max_items in sorted(loop_functions, key=lambda x: int(x[1]), reverse=True):
        print(f"{func:50} → bis zu {max_items} Items")
    
    return {
        'total_functions': len(functions),
        'loop_functions': loop_functions,
        'all_functions': functions
    }

# === HAUPTANALYSE ===
if __name__ == "__main__":
    print("="*60)
    print("🎯 KERBEROS MODULE SYSTEM - STRUKTUR-ANALYSE")
    print("="*60)
    
    templates_result = analyze_templates('templates.js')
    processors_result = analyze_processors('module-processors.js')
    
    print("\n\n" + "="*60)
    print("💡 EMPFEHLUNGEN")
    print("="*60)
    
    # Speichere Ergebnisse
    with open('analysis_results.json', 'w', encoding='utf-8') as f:
        json.dump({
            'templates': {
                'total': len(templates_result['template_ids']),
                'top_properties': dict(templates_result['property_counts'].most_common(30))
            },
            'processors': {
                'total': processors_result['total_functions'],
                'loop_functions': processors_result['loop_functions']
            }
        }, f, indent=2, ensure_ascii=False)
    
    print("\n✅ Analyse-Ergebnisse gespeichert in: analysis_results.json")