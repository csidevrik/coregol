import 'package:flutter/material.dart';

class Sidebar extends StatefulWidget {
  const Sidebar({super.key});

  @override
  State<Sidebar> createState() => _SidebarState();
}

class _SidebarState extends State<Sidebar> {
  bool isExpanded = false;
  int? expandedIndex;

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      width: isExpanded ? 200 : 60,
      color: const Color(0xFFF5F5F5),
      child: Column(
        children: [
          const SizedBox(height: 20),
          _SidebarItem(
            icon: Icons.home,
            label: 'Inicio',
            activeColor: const Color.fromARGB(255, 97, 207, 202),
            isExpanded: isExpanded,
            isSelected: expandedIndex == 0,
            onTap: () => _handleItemClick(0),
            subItems: const ['Dashboard', 'Actividad', 'Reportes'],
            expandedIndex: expandedIndex,
            badge: '3',
          ),
          _SidebarItem(
            icon: Icons.settings,
            label: 'Configuración',
            activeColor: const Color.fromARGB(255, 97, 207, 202),
            isExpanded: isExpanded,
            isSelected: expandedIndex == 1,
            onTap: () => _handleItemClick(1),
            subItems: const ['General', 'Seguridad', 'Notificaciones'],
            expandedIndex: expandedIndex,
            badge: '2',
          ),
          _SidebarItem(
            icon: Icons.person,
            label: 'Perfil',
            activeColor: const Color.fromARGB(255, 97, 207, 202),
            isExpanded: isExpanded,
            isSelected: expandedIndex == 2,
            onTap: () => _handleItemClick(2),
            subItems: const ['Información', 'Preferencias', 'Cuenta'],
            expandedIndex: expandedIndex,
          ),
          const Spacer(),
          _SidebarItem(
            icon: Icons.help_outline,
            label: 'Ayuda',
            activeColor: const Color.fromARGB(255, 97, 207, 202),
            isExpanded: isExpanded,
            isSelected: expandedIndex == 3,
            onTap: () => _handleItemClick(3),
            subItems: const ['Soporte', 'FAQ', 'Contacto'],
            expandedIndex: expandedIndex,
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }

  void _handleItemClick(int index) {
    setState(() {
      if (!isExpanded) {
        isExpanded = true;
        expandedIndex = index;
      } else if (expandedIndex == index) {
        expandedIndex = null;
        isExpanded = false;
      } else {
        expandedIndex = index;
      }
    });
  }
}

class _SidebarItem extends StatefulWidget {
  final IconData icon;
  final String label;
  final Color activeColor;
  final bool isExpanded;
  final bool isSelected;
  final VoidCallback onTap;
  final List<String> subItems;
  final int? expandedIndex;
  final String? badge;

  const _SidebarItem({
    required this.icon,
    required this.label,
    required this.activeColor,
    required this.isExpanded,
    required this.isSelected,
    required this.onTap,
    required this.subItems,
    required this.expandedIndex,
    this.badge,
  });

  @override
  State<_SidebarItem> createState() => _SidebarItemState();
}

class _SidebarItemState extends State<_SidebarItem> {
  bool isHovered = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        MouseRegion(
          onEnter: (_) => setState(() => isHovered = true),
          onExit: (_) => setState(() => isHovered = false),
          child: GestureDetector(
            onTap: widget.onTap,
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 8),
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: (isHovered || widget.isSelected)
                    ? widget.activeColor.withOpacity(0.1)
                    : Colors.transparent,
                borderRadius: BorderRadius.circular(
                    0), // Cambiar de 8 a 0 para hacer cuadrado
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min, // Agregar esta línea
                children: [
                  Stack(
                    children: [
                      Icon(
                        widget.icon,
                        color: (isHovered || widget.isSelected)
                            ? widget.activeColor
                            : Colors.grey[600],
                        size: 24,
                      ),
                      if (widget.badge != null)
                        Positioned(
                          right: -2,
                          top: -2,
                          child: Container(
                            padding: const EdgeInsets.all(4),
                            decoration: BoxDecoration(
                              color: Colors.red,
                              borderRadius: BorderRadius.circular(10),
                            ),
                            constraints: const BoxConstraints(
                              minWidth: 16,
                              minHeight: 16,
                            ),
                            child: Text(
                              widget.badge!,
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),
                        ),
                    ],
                  ),
                  if (widget.isExpanded) ...[
                    const SizedBox(width: 12),
                    Expanded(
                      // Envolver el Text en un Expanded
                      child: Text(
                        widget.label,
                        style: TextStyle(
                          color: (isHovered || widget.isSelected)
                              ? widget.activeColor
                              : Colors.grey[600],
                        ),
                        overflow: TextOverflow.ellipsis, // Agregar esta línea
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ),
        if (widget.isExpanded && widget.isSelected)
          Column(
            children: widget.subItems
                .map((subItem) => _buildSubItem(subItem))
                .toList(),
          ),
      ],
    );
  }

  Widget _buildSubItem(String label) {
    return Container(
      padding: const EdgeInsets.only(left: 48, top: 8, bottom: 8),
      width: double.infinity,
      child: Text(
        label,
        style: TextStyle(
          color: Colors.grey[600],
          fontSize: 14,
        ),
        overflow: TextOverflow.ellipsis, // Agregar esta línea
      ),
    );
  }
}
