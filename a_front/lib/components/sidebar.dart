import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class Sidebar extends StatefulWidget {
  const Sidebar({super.key});

  @override
  State<Sidebar> createState() => _SidebarState();
}

class _SidebarState extends State<Sidebar> {
  bool _expanded = false;

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      width: 70,
      decoration: BoxDecoration(
        color: AppTheme.themeColor,
        borderRadius: const BorderRadius.only(
          topRight: Radius.circular(10),
          bottomRight: Radius.circular(10),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.25),
            blurRadius: 5,
            spreadRadius: 1,
            offset: const Offset(-2, 0),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          _buildAnimatedButton(
            Icons.add,
            'Agregar dispositivo',
            ['A', 'B'],
          ),
          _buildAnimatedButton(
            Icons.refresh,
            'Actualizar',
            null,
          ),
          _buildAnimatedButton(
            Icons.settings,
            'Configuración',
            ['help'],
          ),
        ],
      ),
    );
  }

  Widget _buildAnimatedButton(
      IconData icon, String tooltip, List<String>? submenuItems) {
    return Column(
      children: [
        IconButton(
          icon: Icon(icon, color: AppTheme.textColor),
          onPressed: () {
            if (submenuItems != null) {
              setState(() {
                _expanded = !_expanded;
              });
            }
          },
          tooltip: tooltip,
        ),
        if (submenuItems != null && _expanded)
          ...submenuItems.map((item) => TextButton(
                onPressed: () {},
                child: Text(
                  item,
                  style: TextStyle(color: AppTheme.textColor),
                ),
              )),
      ],
    );
  }
}
